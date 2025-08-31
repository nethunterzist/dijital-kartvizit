// RADİKAL ÇÖZÜM: Prisma'sız doğrudan PostgreSQL connection
import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    // SSL tamamen devre dışı - sslmode=disable DATABASE_URL'de zaten var
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: false // SSL tamamen kapat
    });
    
    // Connection error handling
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }
  return pool;
}

export async function getAllFirmalar(search?: string, page = 1, limit = 1000) {
  const client = await getPool().connect();
  
  try {
    const offset = (page - 1) * limit;
    
    let countQuery = 'SELECT COUNT(*) FROM firmalar';
    let dataQuery = `
      SELECT 
        f.id, f.firma_adi, f.slug, f.profil_foto, f.firma_logo,
        f.yetkili_adi, f.yetkili_pozisyon, f.created_at, f.updated_at,
        f.goruntulenme, f.template_id, f.onay,
        -- Get the first phone number from IletisimBilgisi table
        (SELECT ib.deger FROM "IletisimBilgisi" ib WHERE ib.firma_id = f.id AND ib.tip = 'telefon' ORDER BY ib.sira LIMIT 1) as telefon,
        -- Get the first email from IletisimBilgisi table
        (SELECT ib.deger FROM "IletisimBilgisi" ib WHERE ib.firma_id = f.id AND ib.tip = 'eposta' ORDER BY ib.sira LIMIT 1) as eposta
      FROM firmalar f
    `;
    
    const params: any[] = [];
    
    if (search) {
      const searchCondition = ` WHERE f.firma_adi ILIKE $1 OR f.slug ILIKE $1 OR f.yetkili_adi ILIKE $1`;
      countQuery += searchCondition;
      dataQuery += searchCondition;
      params.push(`%${search}%`);
    }
    
    dataQuery += ` ORDER BY f.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    // Execute queries
    const [countResult, dataResult] = await Promise.all([
      client.query(countQuery, search ? [`%${search}%`] : []),
      client.query(dataQuery, params)
    ]);
    
    const totalCount = parseInt(countResult.rows[0].count);
    
    // Now fetch communication data for each company and build the structure
    const firmalar = await Promise.all(dataResult.rows.map(async (row) => {
      try {
        // Get all communication data for this company
        const commQuery = `
          SELECT tip, deger, etiket, sira 
          FROM "IletisimBilgisi" 
          WHERE firma_id = $1 
          ORDER BY sira
        `;
        const commResult = await client.query(commQuery, [row.id]);
        
        // Build communication_data structure
        const telefonlar: any[] = [];
        const epostalar: any[] = [];
        
        commResult.rows.forEach(comm => {
          if (comm.tip === 'telefon') {
            telefonlar.push({
              value: comm.deger,
              label: comm.etiket || 'Telefon',
              type: 'telefon'
            });
          } else if (comm.tip === 'eposta') {
            epostalar.push({
              value: comm.deger,
              label: comm.etiket || 'E-posta',
              type: 'eposta'
            });
          }
        });
        
        return {
          ...row,
          goruntulenme: row.goruntulenme || 0,
          communication_data: JSON.stringify({
            telefonlar,
            epostalar
          })
        };
      } catch (error) {
        console.error('Error fetching communication data for firma', row.id, error);
        return {
          ...row,
          goruntulenme: row.goruntulenme || 0,
          telefon: null,
          eposta: null,
          communication_data: JSON.stringify({
            telefonlar: [],
            epostalar: []
          })
        };
      }
    }));
    
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
    console.log('🔍 getFirmaWithCommunication çağrıldı, slug:', slug);
    
    // Firma bilgilerini al
    const firmaQuery = 'SELECT * FROM firmalar WHERE slug = $1';
    const firmaResult = await client.query(firmaQuery, [slug]);
    
    console.log('👤 Firma sorgusu sonucu:', firmaResult.rows.length, 'kayıt');
    
    if (firmaResult.rows.length === 0) {
      console.log('❌ Firma bulunamadı');
      return null;  // 404 sayfası göstermek için null döndür
    }
    
    const firma = firmaResult.rows[0];
    console.log('✅ Firma bulundu:', firma.firma_adi);
    
    // İletişim bilgilerini al
    const iletisimQuery = `
      SELECT * FROM "IletisimBilgisi" 
      WHERE firma_id = $1 AND aktif = true 
      ORDER BY sira ASC
    `;
    const iletisimResult = await client.query(iletisimQuery, [firma.id]);
    console.log('📞 İletişim sorgusu sonucu:', iletisimResult.rows.length, 'kayıt');
    
    // Sosyal medya hesaplarını al
    const sosyalQuery = `
      SELECT * FROM "SosyalMedyaHesabi" 
      WHERE firma_id = $1 AND aktif = true 
      ORDER BY sira ASC
    `;
    const sosyalResult = await client.query(sosyalQuery, [firma.id]);
    console.log('📱 Sosyal medya sorgusu sonucu:', sosyalResult.rows.length, 'kayıt');
    
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