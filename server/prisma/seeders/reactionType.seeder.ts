import { PrismaClient } from '@prisma/client';

export const reactionTypeData = [
  { id: 1, name: 'LIKE' },
  { id: 2, name: 'LOVE' },
  { id: 3, name: 'HAHA' },
  { id: 4, name: 'WOW' },
  { id: 5, name: 'SAD' },
  { id: 6, name: 'ANGRY' },
];

export async function seedReactionTypes(prisma: PrismaClient) {
  console.log('Start seeding ReactionType...');
  
  for (const reaction of reactionTypeData) {
    await prisma.reactionType.upsert({
      where: { id: reaction.id },
      update: { name: reaction.name },
      create: reaction,
    });
  }

  console.log('ReactionType seeding finished.');
}