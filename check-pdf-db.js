const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: 'postgresql://postgres:M15112002m.@hsg8skcck0kcossg8ccs8kk4:5432/postgres'
});

async function main() {
  const firma = await prisma.firmalar.findFirst({
    where: { slug: 'demo-teknoloji-1767615748981' },
    select: {
      id: true,
      firma_adi: true,
      slug: true,
      katalog: true,
      created_at: true
    }
  });
  
  console.log(JSON.stringify(firma, null, 2));
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
