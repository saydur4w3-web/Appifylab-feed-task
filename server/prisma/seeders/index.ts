import { PrismaClient } from '@prisma/client';
import { seedReactionTypes } from './reactionType.seeder';
import { main } from './seedGenerator';

// run all seeders
export async function runAllSeeders(prisma: PrismaClient) {
  await seedReactionTypes(prisma);
  // await main(prisma);
}