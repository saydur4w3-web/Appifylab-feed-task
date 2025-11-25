import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { jwt_req_user, type jwt_payload } from 'src/common/types/general.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostDto } from './dtos/update-post.dto';
import { sanitizedContent } from 'src/common/utils/sanitizedContent';
import { PaginationCursorDto } from '../common/validators/pagination.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePostDto, auth: jwt_payload) {
    const contentSanitized = sanitizedContent(dto.content);

    const post = await this.prisma.post.create({
      data: {
        content: contentSanitized || '',
        image_url: dto.image_url,
        user_id: auth.id,
        is_public: dto.is_public,
      },
      select: {
        id: true,
        content: true,
        image_url: true,
        created_at: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_img: true,
          },
        },
      },
    });

    return post;
  }

  async update(id: string, dto: UpdatePostDto, auth: jwt_payload) {
    // Check if post exists AND belongs to current user
    const existingPost = await this.prisma.post.findFirst({
      where: { id, user_id: auth.id },
    });

    if (!existingPost) {
      throw new ForbiddenException('You are not allowed to update this post');
    }

    const contentSanitized = sanitizedContent(dto.content);

    // Update post
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: {
        content: contentSanitized ?? existingPost.content,
        image_url: dto.image_url ?? existingPost.image_url,
        is_public: dto.is_public ?? existingPost.is_public,
      },
      select: {
        id: true,
        content: true,
        image_url: true,
        updated_at: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_img: true,
          },
        },
      },
    });

    return updatedPost;
  }

  async delete(id: string, auth: jwt_payload) {
    const post = await this.prisma.post.findFirst({
      where: { id, user_id: auth.id },
    });

    if (!post) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }

    await this.prisma.post.delete({
      where: { id },
    });

    return { message: 'Post deleted successfully' };
  }

  // async getAllPosts(auth: jwt_req_user, options?: PaginationCursorDto) {
  //   const cursor = options?.cursor;
  //   // const limit = 30;
  //   const limit = 3;

  //   const posts = await this.prisma.post.findMany({
  //     take: limit + 1,
  //     // skip: cursor ? 1 : 0,   // skip cursor itself
  //     cursor: cursor ? { id: cursor } : undefined,

  //     where: {
  //       OR: [{ is_public: true }, { user_id: auth.id }],
  //     },

  //     orderBy: { created_at: 'desc' },

  //     include: {
  //       user: {
  //         select: {
  //           id: true,
  //           first_name: true,
  //           last_name: true,
  //           profile_img: true,
  //         },
  //       },

  //       comments: {
  //         take: 1,
  //         orderBy: { created_at: 'desc' },
  //         include: {
  //           user: {
  //             select: {
  //               id: true,
  //               first_name: true,
  //               last_name: true,
  //               profile_img: true,
  //             },
  //           },
  //         },
  //       },

  //       reactions: {
  //         take: 5,
  //         orderBy: { created_at: 'desc' },
  //         select: {
  //           reaction_id: true,
  //           user: {
  //             select: {
  //               id: true,
  //               profile_img: true,
  //             },
  //           },
  //         },
  //       },

  //     },
  //   });

  //   let nextCursor: string | null = null;

  //   if (posts.length > limit) {
  //     const next = posts.pop();
  //     nextCursor = next!.id;
  //   }

  //   return {
  //     posts,
  //     pagination: {
  //       nextCursor,
  //       hasMore: !!nextCursor,
  //     },
  //   };
  // }

  // Inside your service class...

  async getAllPosts(auth: jwt_req_user, options?: PaginationCursorDto) {
    const cursor = options?.cursor;
    const limit = 30;

    // 1️⃣ Fetch posts with first comment & reactions
    const posts = await this.prisma.post.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        OR: [{ is_public: true }, { user_id: auth.id }],
      },
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_img: true,
          }
        },
        comments: {
          take: 1,
          where: { parent: null },
          orderBy: { created_at: 'desc' },
          include: {         user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_img: true,
          }
        }, },
        },
        reactions: {
          take: 5,
          orderBy: { created_at: 'desc' },
          include: {         user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_img: true,
          }
        }, },
        },
      },
    });

    let nextCursor: string | null = null;
    if (posts.length > limit) {
      const next = posts.pop();
      nextCursor = next!.id;
    }

    if (posts.length === 0) {
      return {
        posts: [],
        pagination: { nextCursor, hasMore: !!nextCursor },
      };
    }

    // 2️⃣ Collect post IDs and first comment IDs
    const postIds = posts.map((post) => post.id);
    const firstCommentIds = posts
      .map((post) => post.comments[0]?.id)
      .filter(Boolean) as string[];

    // 3️⃣ Query user reactions for posts
    const userPostReactions = await this.prisma.postReaction.findMany({
      where: {
        post_id: { in: postIds },
        user_id: auth.id,
      },
      select: { post_id: true, reaction_id: true },
    });

    const postReactionMap = new Map(
      userPostReactions.map((r) => [r.post_id, r.reaction_id]),
    );

    // 4️⃣ Query user reactions for first comments
    let commentReactionMap = new Map<string, number>();
    if (firstCommentIds.length > 0) {
      const userCommentReactions = await this.prisma.commentReaction.findMany({
        where: {
          comment_id: { in: firstCommentIds },
          user_id: auth.id,
        },
        select: { comment_id: true, reaction_id: true },
      });

      commentReactionMap = new Map(
        userCommentReactions.map((r) => [r.comment_id, r.reaction_id]),
      );
    }

    // 5️⃣ Merge reactions into posts & comments
    const formattedPosts = posts.map((post) => ({
      ...post,
      isReacted: postReactionMap.has(post.id),
      reactedReactionId: postReactionMap.get(post.id) || null,
      comments: post.comments.map((comment) => ({
        ...comment,
        isReacted: commentReactionMap.has(comment.id),
        reactedReactionId: commentReactionMap.get(comment.id) || null,
      })),
    }));

    return {
      posts: formattedPosts,
      pagination: { nextCursor, hasMore: !!nextCursor },
    };
  }
}
