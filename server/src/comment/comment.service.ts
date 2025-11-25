import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { jwt_req_user } from 'src/common/types/general.type';
import { sanitizedContent } from 'src/common/utils/sanitizedContent';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { PaginationCursorDto } from '../common/validators/pagination.dto';
import { DeleteCommentDto } from './dtos/delete-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(dto: CreateCommentDto, auth: jwt_req_user) {
    // Validate parent comment (if replying)
    if (dto.parent_id) {
      const parent = await this.prisma.comment.findUnique({
        where: { id: dto.parent_id },
        select: { id: true, post_id: true },
      });

      if (!parent) throw new NotFoundException('Parent comment not found');
      if (parent.post_id !== dto.post_id)
        throw new ForbiddenException('Reply must belong to the same post');
    }

    const contentSanitized = sanitizedContent(dto.content);

    if (dto.parent_id) {
      await this.prisma.comment.update({
        where: { id: dto.parent_id },
        data: { total_reply: { increment: 1 } },
      });
    } else {
      await this.prisma.post.update({
        where: { id: dto.post_id },
        data: { comment_count: { increment: 1 } },
      });
    }

    return this.prisma.comment.create({
      data: {
        user_id: auth.id,
        post_id: dto.post_id,
        content: contentSanitized ?? null,
        image_url: dto.image_url || null,
        comment_id: dto.parent_id || null,
      },
    });
  }

  async updateComment(id: string, dto: UpdateCommentDto, auth: jwt_req_user) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== auth.id)
      throw new ForbiddenException('You cannot edit this comment');

    return this.prisma.comment.update({
      where: { id },
      data: {
        content: dto.content ?? comment.content,
        image_url: dto.image_url ?? comment.image_url,
        updated_at: new Date(),
      },
    });
  }

  async deleteComment(dto: DeleteCommentDto, auth: jwt_req_user) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: dto.comment_id },
    });

    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== auth.id)
      throw new ForbiddenException('You cannot delete this comment');

    await this.prisma.comment.delete({ where: { id: dto.comment_id } });

    if (dto.parent_id) {
      await this.prisma.comment.update({
        where: { id: dto.parent_id },
        data: { total_reply: { decrement: 1 } },
      });
    } else {
      await this.prisma.post.update({
        where: { id: comment.post_id },
        data: { comment_count: { decrement: 1 } },
      });
    }

    return { message: 'Comment deleted' };
  }

  // async getPostComments(postId: string, auth: jwt_req_user, options?: PaginationCursorDto) {
  //   const cursor = options?.cursor;
  //   const limit = 30;
  //   // const limit = 30;

  //   // Fetch paginated top-level comments
  //   const comments = await this.prisma.comment.findMany({
  //     where: { post_id: postId, comment_id: null },
  //     orderBy: { created_at: 'desc' },

  //     take: limit + 1, // Fetch an extra one to check "hasMore"
  //     // skip: cursor ? 1 : 0,
  //     cursor: cursor ? { id: cursor } : undefined,

  //     select: {
  //       id: true,
  //       content: true,
  //       image_url: true,
  //       created_at: true,
  //       updated_at: true,
  //       user_id: true,
  //       total_reply: true,

  //       like_count: true,
  //       love_count: true,
  //       haha_count: true,
  //       wow_count: true,
  //       sad_count: true,
  //       angry_count: true,

  //       user: {
  //         select: {
  //           id: true,
  //           first_name: true,
  //           last_name: true,
  //           profile_img: true,
  //         },
  //       },

  //       // // OPTIONAL: Only load the first 3 replies like Facebook
  //       // replies: {
  //       //   orderBy: { created_at: 'asc' },
  //       //   take: 3,

  //       //   select: {
  //       //     id: true,
  //       //     content: true,
  //       //     image_url: true,
  //       //     created_at: true,
  //       //     updated_at: true,
  //       //     user_id: true,

  //       //     like_count: true,
  //       //     love_count: true,
  //       //     haha_count: true,
  //       //     wow_count: true,
  //       //     sad_count: true,
  //       //     angry_count: true,

  //       //     user: {
  //       //       select: {
  //       //         id: true,
  //       //         first_name: true,
  //       //         last_name: true,
  //       //         profile_img: true,
  //       //       },
  //       //     },
  //       //   },
  //       // },
  //     },
  //   });

  //   let nextCursor: string | null = null;

  //   if (comments.length > limit) {
  //     const next = comments.pop();
  //     nextCursor = next!.id;
  //   }

  //   return {
  //     comments,
  //     pagination: {
  //       nextCursor,
  //       hasMore: !!nextCursor,
  //     },
  //   };
  // }

  // async getCommentThread(commentId: string, auth: jwt_req_user, options?: PaginationCursorDto) {
  //   // const limit = 30;
  //   const limit = 30;
  //   const cursor = options?.cursor;

  //   const comment = await this.prisma.comment.findUnique({
  //     where: { id: commentId },
  //     select: {
  //       id: true,
  //       content: true,
  //       image_url: true,
  //       user_id: true,
  //       created_at: true,
  //       updated_at: true,
  //       total_reply: true,

  //       like_count: true,
  //       love_count: true,
  //       haha_count: true,
  //       wow_count: true,
  //       sad_count: true,
  //       angry_count: true,

  //       user: {
  //         select: {
  //           id: true,
  //           first_name: true,
  //           last_name: true,
  //           profile_img: true,
  //         },
  //       },
  //     },
  //   });

  //   if (!comment) throw new NotFoundException('Comment not found');

  //   // Paginated Replies
  //   const replies = await this.prisma.comment.findMany({
  //     where: { comment_id: commentId },
  //     orderBy: { created_at: 'asc' },

  //     take: limit + 1,
  //     // skip: cursor ? 1 : 0,
  //     cursor: cursor ? { id: cursor } : undefined,

  //     select: {
  //       id: true,
  //       content: true,
  //       image_url: true,
  //       created_at: true,
  //       updated_at: true,
  //       user_id: true,

  //       like_count: true,
  //       love_count: true,
  //       haha_count: true,
  //       wow_count: true,
  //       sad_count: true,
  //       angry_count: true,

  //       user: {
  //         select: {
  //           id: true,
  //           first_name: true,
  //           last_name: true,
  //           profile_img: true,
  //         },
  //       },
  //     },
  //   });

  //   let nextCursor: string | null = null;

  //   if (replies.length > limit) {
  //     const next = replies.pop();
  //     nextCursor = next!.id;
  //   }

  //   return {
  //     comment,
  //     replies,
  //     pagination: {
  //       nextCursor,
  //       hasMore: !!nextCursor,
  //     },
  //   };
  // }

  async getPostComments(
    postId: string,
    auth: jwt_req_user,
    options?: PaginationCursorDto,
  ) {
    const cursor = options?.cursor;
    const limit = 30; // or 30

    // 1️⃣ Fetch paginated top-level comments
    const comments = await this.prisma.comment.findMany({
      where: { post_id: postId, comment_id: null }, // top-level comments
      orderBy: { created_at: 'desc' },

      take: limit + 1, // fetch extra to check "hasMore"
      cursor: cursor ? { id: cursor } : undefined,

      select: {
        id: true,
        content: true,
        image_url: true,
        created_at: true,
        updated_at: true,
        user_id: true,
        total_reply: true,

        like_count: true,
        love_count: true,
        haha_count: true,
        wow_count: true,
        sad_count: true,
        angry_count: true,

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

    let nextCursor: string | null = null;
    if (comments.length > limit) {
      const next = comments.pop();
      nextCursor = next!.id;
    }

    if (comments.length === 0) {
      return {
        comments: [],
        pagination: {
          nextCursor,
          hasMore: !!nextCursor,
        },
      };
    }

    const commentIds = comments.map((c) => c.id);

    const userReactions = await this.prisma.commentReaction.findMany({
      where: {
        comment_id: { in: commentIds },
        user_id: auth.id,
      },
      select: {
        comment_id: true,
        reaction_id: true,
      },
    });

    const reactionMap = new Map(
      userReactions.map((r) => [r.comment_id, r.reaction_id]),
    );

    const formattedComments = comments.map((comment) => ({
      ...comment,
      isReacted: reactionMap.has(comment.id),
      reactedReactionId: reactionMap.get(comment.id) || null,
    }));

    return {
      comments: formattedComments,
      pagination: {
        nextCursor,
        hasMore: !!nextCursor,
      },
    };
  }

  async getCommentThread(
    commentId: string,
    auth: jwt_req_user,
    options?: PaginationCursorDto,
  ) {
    const limit = 30;
    const cursor = options?.cursor;

    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        id: true,
        content: true,
        image_url: true,
        user_id: true,
        created_at: true,
        updated_at: true,
        total_reply: true,

        like_count: true,
        love_count: true,
        haha_count: true,
        wow_count: true,
        sad_count: true,
        angry_count: true,

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

    if (!comment) throw new NotFoundException('Comment not found');

    const replies = await this.prisma.comment.findMany({
      where: { comment_id: commentId },
      orderBy: { created_at: 'asc' },

      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,

      select: {
        id: true,
        content: true,
        image_url: true,
        created_at: true,
        updated_at: true,
        user_id: true,
        total_reply: true,

        like_count: true,
        love_count: true,
        haha_count: true,
        wow_count: true,
        sad_count: true,
        angry_count: true,

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

    let nextCursor: string | null = null;
    if (replies.length > limit) {
      const next = replies.pop();
      nextCursor = next!.id;
    }

    const allCommentIds = [comment.id, ...replies.map((r) => r.id)];

    const userReactions = await this.prisma.commentReaction.findMany({
      where: {
        comment_id: { in: allCommentIds },
        user_id: auth.id,
      },
      select: {
        comment_id: true,
        reaction_id: true,
      },
    });

    const reactionMap = new Map(
      userReactions.map((r) => [r.comment_id, r.reaction_id]),
    );

    const formattedComment = {
      ...comment,
      isReacted: reactionMap.has(comment.id),
      reactedReactionId: reactionMap.get(comment.id) || null,
    };

    const formattedReplies = replies.map((reply) => ({
      ...reply,
      isReacted: reactionMap.has(reply.id),
      reactedReactionId: reactionMap.get(reply.id) || null,
    }));

    return {
      comment: formattedComment,
      replies: formattedReplies,
      pagination: {
        nextCursor,
        hasMore: !!nextCursor,
      },
    };
  }
}
