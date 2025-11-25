import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';


const TOTAL_USERS = 20;
const TOTAL_POSTS = 15;
const MIN_COMMENTS_PER_POST = 5;
const MAX_COMMENTS_PER_POST = 100;

const reactionTypeIds = [1, 2, 3, 4, 5, 6]; // LIKE, LOVE, HAHA, WOW, SAD, ANGRY

export async function main(prisma: PrismaClient) {

  // ──────────────────────────────────────────────────────────────
  // 1. Seed Users (with Argon2 hashed password)
  // ──────────────────────────────────────────────────────────────
  const users: { id: string; email: string }[] = [];

  for (let i = 0; i < TOTAL_USERS; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet
      .email({ firstName, lastName })
      .toLowerCase();

    const hashedPassword = await argon2.hash('password123'); // ← Argon2

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id: faker.string.uuid(),
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        profile_img: Math.random() > 0.7 ? faker.image.avatar() : null,
      },
    });

    users.push({ id: user.id, email: user.email });
  }
  console.log(`Created/ensured ${users.length} users`);

  // ──────────────────────────────────────────────────────────────
  // 2. Seed Posts
  // ──────────────────────────────────────────────────────────────
  const posts: { id: string; userId: string }[] = [];

  for (let i = 0; i < TOTAL_POSTS; i++) {
    const author = faker.helpers.arrayElement(users);

    const post = await prisma.post.create({
      data: {
        user_id: author.id,
        content: faker.lorem.paragraphs({ min: 1, max: 5 }),
        image_url:
          Math.random() > 0.55
            ? faker.image.urlLoremFlickr({
                width: 1200,
                height: 800,
                category: 'nature,people,food,travel,animals',
              })
            : null,
        is_public: Math.random() > 0.1,
      },
    });

    posts.push({ id: post.id, userId: author.id });
  }
  console.log(`Created ${posts.length} posts`);

  // ──────────────────────────────────────────────────────────────
  // 3. Comments + Replies + Reactions (per post)
  // ──────────────────────────────────────────────────────────────
  for (const post of posts) {
    const totalComments = faker.number.int({
      min: MIN_COMMENTS_PER_POST,
      max: MAX_COMMENTS_PER_POST,
    });

    const topLevelCount = Math.floor(totalComments * faker.number.float({ min: 0.5, max: 0.8 }));
    const commentsCreated: { id: string; userId: string; parentId?: string }[] = [];

    // Top-level comments
    for (let i = 0; i < topLevelCount; i++) {
      const author = faker.helpers.arrayElement(users);
      const comment = await prisma.comment.create({
        data: {
          user_id: author.id,
          post_id: post.id,
          content: faker.lorem.sentences({ min: 1, max: 4 }),
          image_url: Math.random() > 0.9 ? faker.image.urlPicsumPhotos({ width: 800, height: 600 }) : null,
        },
      });
      commentsCreated.push({ id: comment.id, userId: author.id });
    }

    // Replies (1 level deep only – keeps it sane)
    const repliesToCreate = totalComments - topLevelCount;
    for (let i = 0; i < repliesToCreate; i++) {
      const parent = faker.helpers.arrayElement(
        commentsCreated.filter((c) => !c.parentId) // only reply to top-level
      );
      const author = faker.helpers.arrayElement(users);

      const reply = await prisma.comment.create({
        data: {
          user_id: author.id,
          post_id: post.id,
          comment_id: parent.id,
          content: faker.lorem.sentences({ min: 1, max: 2 }),
        },
      });

      commentsCreated.push({ id: reply.id, userId: author.id, parentId: parent.id });

      // Increment parent's reply count
      await prisma.comment.update({
        where: { id: parent.id },
        data: { total_reply: { increment: 1 } },
      });
    }

    // Update post comment count
    await prisma.post.update({
      where: { id: post.id },
      data: { comment_count: commentsCreated.length },
    });

    // ───── Post Reactions ─────
    const postReactors = faker.helpers.arrayElements(users, faker.number.int({ min: 4, max: users.length - 2 }));
    for (const user of postReactors) {
      if (Math.random() > 0.35) {
        const reactionId = faker.helpers.arrayElement(reactionTypeIds);
        await prisma.postReaction.upsert({
          where: { user_id_post_id: { user_id: user.id, post_id: post.id } },
          update: { reaction_id: reactionId },
          create: { user_id: user.id, post_id: post.id, reaction_id: reactionId },
        });
      }
    }

    // Update post.react_count
    const postReactionCount = await prisma.postReaction.count({ where: { post_id: post.id } });
    await prisma.post.update({
      where: { id: post.id },
      data: { react_count: postReactionCount },
    });

    // ───── Comment Reactions ─────
    for (const comment of commentsCreated) {
      const reactors = faker.helpers.arrayElements(users, faker.number.int({ min: 0, max: 15 }));
      for (const user of reactors) {
        if (Math.random() > 0.55) {
          const reactionId = faker.helpers.arrayElement(reactionTypeIds);
          await prisma.commentReaction.upsert({
            where: { user_id_comment_id: { user_id: user.id, comment_id: comment.id } },
            update: { reaction_id: reactionId },
            create: { user_id: user.id, comment_id: comment.id, reaction_id: reactionId },
          });
        }
      }

      // Update comment reaction counters (like_count, love_count, etc.)
      const reactionCounts = await prisma.commentReaction.groupBy({
        by: ['reaction_id'],
        where: { comment_id: comment.id },
        _count: { reaction_id: true },
      });

      const updateData: any = {
        like_count: 0,
        love_count: 0,
        haha_count: 0,
        wow_count: 0,
        sad_count: 0,
        angry_count: 0,
      };

      for (const item of reactionCounts) {
        switch (item.reaction_id) {
          case 1:
            updateData.like_count = item._count.reaction_id;
            break;
          case 2:
            updateData.love_count = item._count.reaction_id;
            break;
          case 3:
            updateData.haha_count = item._count.reaction_id;
            break;
          case 4:
            updateData.wow_count = item._count.reaction_id;
            break;
          case 5:
            updateData.sad_count = item._count.reaction_id;
            break;
          case 6:
            updateData.angry_count = item._count.reaction_id;
            break;
        }
      }

      await prisma.comment.update({
        where: { id: comment.id },
        data: updateData,
      });
    }

    console.log(
      `Post ${post.id.slice(0, 8)}... → ${commentsCreated.length} comments/replies + reactions`
    );
  }

  console.log('FULL SEEDING WITH ARGON2 COMPLETED SUCCESSFULLY!');
}

// main()
//   .catch((e) => {
//     console.error('Seeding failed:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });