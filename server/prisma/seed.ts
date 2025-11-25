// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { runAllSeeders } from './seeders'; // Import the orchestrator

const prisma = new PrismaClient();

async function main() {
  await runAllSeeders(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });