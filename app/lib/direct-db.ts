// RADİKAL ÇÖZÜM: Prisma'sız doğrudan PostgreSQL connection
import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    // Serverless-friendly configuration
    // Production: Lower pool size to prevent connection exhaustion
    // Development: Smaller pool for local testing
    const isProduction = process.env.NODE_ENV === 'production';

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Reduced max connections for serverless environments
      max: isProduction ? 10 : 5,
      // Shorter idle timeout to release connections faster in serverless
      idleTimeoutMillis: 30000,
      // Faster connection timeout for quick failure detection
      connectionTimeoutMillis: 5000,
      // Allow graceful shutdown in serverless environments
      allowExitOnIdle: true,
      ssl: false // SSL disabled (sslmode=disable in DATABASE_URL)
    });

    // Connection error handling
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }
  return pool;
}

export async function getAllFirmalar(search?: string, page = 1, limit = 1000) {
  try {
    const client = await getPool().connect();

    try {
      const offset = (page - 1) * limit;

      let countQuery = 'SELECT COUNT(*) FROM firmalar';

    // OPTIMIZED: Single query with LEFT JOINs and json_agg to get all data in one go
    let dataQuery = `
      SELECT
        f.id, f.firma_adi, f.slug, f.profil_foto, f.firma_logo,
        f.yetkili_adi, f.yetkili_pozisyon, f.created_at, f.updated_at,
        f.goruntulenme, f.template_id, f.onay,
        -- Get first telefon for backward compatibility
        (SELECT ib.deger FROM "IletisimBilgisi" ib
         WHERE ib.firma_id = f.id AND ib.tip = 'telefon' AND ib.aktif = true
         ORDER BY ib.sira LIMIT 1) as telefon,
        -- Get first eposta for backward compatibility
        (SELECT ib.deger FROM "IletisimBilgisi" ib
         WHERE ib.firma_id = f.id AND ib.tip = 'eposta' AND ib.aktif = true
         ORDER BY ib.sira LIMIT 1) as eposta,
        -- Aggregate all communication data using json_agg
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'tip', ib.tip,
              'deger', ib.deger,
              'etiket', ib.etiket,
              'sira', ib.sira
            )
          ) FILTER (WHERE ib.id IS NOT NULL),
          '[]'::json
        ) as iletisim_data
      FROM firmalar f
      LEFT JOIN "IletisimBilgisi" ib ON ib.firma_id = f.id AND ib.aktif = true
    `;

    const params: any[] = [];

    if (search) {
      const searchCondition = ` WHERE f.firma_adi ILIKE $1 OR f.slug ILIKE $1 OR f.yetkili_adi ILIKE $1`;
      countQuery += searchCondition;
      dataQuery += searchCondition;
      params.push(`%${search}%`);
    }

    dataQuery += ` GROUP BY f.id ORDER BY f.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    // Execute queries in parallel
    const [countResult, dataResult] = await Promise.all([
      client.query(countQuery, search ? [`%${search}%`] : []),
      client.query(dataQuery, params)
    ]);

    const totalCount = parseInt(countResult.rows[0].count);

    // Process the aggregated data without additional queries
    const firmalar = dataResult.rows.map((row) => {
      const telefonlar: any[] = [];
      const epostalar: any[] = [];

      // Parse the aggregated communication data
      const iletisimData = Array.isArray(row.iletisim_data) ? row.iletisim_data : [];

      iletisimData.forEach((comm: any) => {
        if (comm && comm.tip === 'telefon') {
          telefonlar.push({
            value: comm.deger,
            label: comm.etiket || 'Telefon',
            type: 'telefon'
          });
        } else if (comm && comm.tip === 'eposta') {
          epostalar.push({
            value: comm.deger,
            label: comm.etiket || 'E-posta',
            type: 'eposta'
          });
        }
      });

      // Sort by sira field
      telefonlar.sort((a, b) => (a.sira || 0) - (b.sira || 0));
      epostalar.sort((a, b) => (a.sira || 0) - (b.sira || 0));

      return {
        id: row.id,
        firma_adi: row.firma_adi,
        slug: row.slug,
        profil_foto: row.profil_foto,
        firma_logo: row.firma_logo,
        yetkili_adi: row.yetkili_adi,
        yetkili_pozisyon: row.yetkili_pozisyon,
        created_at: row.created_at,
        updated_at: row.updated_at,
        goruntulenme: row.goruntulenme || 0,
        template_id: row.template_id,
        onay: row.onay,
        telefon: row.telefon,
        eposta: row.eposta,
        communication_data: JSON.stringify({
          telefonlar,
          epostalar
        })
      };
    });

      return {
        data: firmalar,
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      };

    } finally {
      client.release();
    }
  } catch (error) {
    // Graceful error handling for build-time database unavailability
    console.error('Database query error (possibly during build):', error instanceof Error ? error.message : 'Unknown error');
    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0
    };
  }
}

export async function createFirma(data: any) {
  const client = await getPool().connect();
  
  try {
    const query = `
      INSERT INTO firmalar (
        firma_adi, slug, yetkili_adi, yetkili_pozisyon, 
        profil_foto, firma_logo, katalog, template_id, firma_hakkinda,
        firma_hakkinda_baslik, firma_unvan, firma_vergi_no,
        vergi_dairesi, gradient_color, onay, goruntulenme
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;
    
    const values = [
      data.firma_adi,
      data.slug,
      data.yetkili_adi || null,
      data.yetkili_pozisyon || null,
      data.profil_foto || null,
      data.firma_logo || null,
      data.katalog || null,
      data.template_id || 1,
      data.firma_hakkinda || null,
      data.firma_hakkinda_baslik || 'Hakkımızda',
      data.firma_unvan || null,
      data.firma_vergi_no || null,
      data.vergi_dairesi || null,
      data.gradient_color || '#D4AF37,#F7E98E,#B8860B', // default gold gradient
      false, // onay
      0 // goruntulenme
    ];
    
    const result = await client.query(query, values);
    return result.rows[0];
    
  } finally {
    client.release();
  }
}

export async function deleteFirma(id: number) {
  const client = await getPool().connect();
  
  try {
    // First check if exists
    const checkQuery = 'SELECT id, firma_adi FROM firmalar WHERE id = $1';
    const checkResult = await client.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      throw new Error('Firma bulunamadı');
    }
    
    // Delete firma
    const deleteQuery = 'DELETE FROM firmalar WHERE id = $1';
    await client.query(deleteQuery, [id]);
    
    return checkResult.rows[0];
    
  } finally {
    client.release();
  }
}

export async function getFirmaById(id: number) {
  const client = await getPool().connect();
  
  try {
    const query = 'SELECT * FROM firmalar WHERE id = $1';
    const result = await client.query(query, [id]);
    
    if (result.rows.length === 0) {
      throw new Error('Firma bulunamadı');
    }
    
    return result.rows[0];
    
  } finally {
    client.release();
  }
}

export async function getFirmaBySlug(slug: string) {
  const client = await getPool().connect();
  
  try {
    const query = 'SELECT * FROM firmalar WHERE slug = $1';
    const result = await client.query(query, [slug]);
    
    if (result.rows.length === 0) {
      return null;  // 404 sayfası göstermek için null döndür
    }
    
    return result.rows[0];
    
  } finally {
    client.release();
  }
}

// Karma sayfası için firma bilgilerini iletişim ve sosyal medya ile birlikte getir
export async function getFirmaWithCommunication(slug: string) {
  const client = await getPool().connect();
  
  try {
    // Firma bilgilerini al
    const firmaQuery = 'SELECT * FROM firmalar WHERE slug = $1';
    const firmaResult = await client.query(firmaQuery, [slug]);

    if (firmaResult.rows.length === 0) {
      return null;  // 404 sayfası göstermek için null döndür
    }

    const firma = firmaResult.rows[0];

    // İletişim bilgilerini al
    const iletisimQuery = `
      SELECT * FROM "IletisimBilgisi"
      WHERE firma_id = $1 AND aktif = true
      ORDER BY sira ASC
    `;
    const iletisimResult = await client.query(iletisimQuery, [firma.id]);

    // Sosyal medya hesaplarını al
    const sosyalQuery = `
      SELECT * FROM "SosyalMedyaHesabi"
      WHERE firma_id = $1 AND aktif = true
      ORDER BY sira ASC
    `;
    const sosyalResult = await client.query(sosyalQuery, [firma.id]);
    
    // Banka hesaplarını al (yoksa boş array)
    const bankaQuery = `
      SELECT bh.*, bhd.iban, bhd.para_birimi, bhd.hesap_turu
      FROM "BankaHesabi" bh
      LEFT JOIN "BankaHesapDetay" bhd ON bh.id = bhd.banka_hesabi_id AND bhd.aktif = true
      WHERE bh.firma_id = $1 AND bh.aktif = true
      ORDER BY bh.sira ASC
    `;
    const bankaResult = await client.query(bankaQuery, [firma.id]);
    
    // Banka hesaplarını grupla
    const bankaHesaplari: any[] = [];
    const bankaMap = new Map();
    
    bankaResult.rows.forEach(row => {
      if (!bankaMap.has(row.id)) {
        bankaMap.set(row.id, {
          id: row.id,
          banka_adi: row.banka_adi,
          banka_logo: row.banka_logo,
          hesap_sahibi: row.hesap_sahibi,
          hesaplar: []
        });
      }
      
      if (row.iban) {
        bankaMap.get(row.id).hesaplar.push({
          iban: row.iban,
          para_birimi: row.para_birimi,
          hesap_turu: row.hesap_turu
        });
      }
    });
    
    bankaHesaplari.push(...bankaMap.values());
    
    // Sonucu birleştir
    return {
      ...firma,
      iletisim_bilgileri: iletisimResult.rows,
      sosyal_medya_hesaplari: sosyalResult.rows,
      banka_hesaplari: bankaHesaplari
    };
    
  } finally {
    client.release();
  }
}

// İletişim bilgisi ekleme fonksiyonu
export async function addIletisimBilgisi(firmaId: number, tip: string, deger: string, etiket?: string) {
  const client = await getPool().connect();
  
  try {
    const query = `
      INSERT INTO "IletisimBilgisi" (firma_id, tip, deger, etiket, aktif, sira) 
      VALUES ($1, $2, $3, $4, true, 0) 
      RETURNING *
    `;
    const result = await client.query(query, [firmaId, tip, deger, etiket || '']);
    
    return result.rows[0];
    
  } finally {
    client.release();
  }
}

// Sosyal medya hesabı ekleme fonksiyonu  
export async function addSosyalMedyaHesabi(firmaId: number, platform: string, url: string, etiket?: string) {
  const client = await getPool().connect();
  
  try {
    const query = `
      INSERT INTO "SosyalMedyaHesabi" (firma_id, platform, url, etiket, aktif, sira) 
      VALUES ($1, $2, $3, $4, true, 0) 
      RETURNING *
    `;
    const result = await client.query(query, [firmaId, platform, url, etiket || '']);
    
    return result.rows[0];
    
  } finally {
    client.release();
  }
}

// Graceful shutdown
process.on('exit', () => {
  if (pool) {
    pool.end();
  }
});