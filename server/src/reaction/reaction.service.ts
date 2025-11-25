import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostReactDto } from './dtos/postReact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ty_REACTION_ID } from 'src/common/types/reaction.types';
import { jwt_payload, jwt_req_user } from 'src/common/types/general.type';
import { CommentReactDto } from './dtos/commentReact.dto';
import {
  PaginationCursorDto,
  PaginationDto,
} from 'src/common/validators/pagination.dto';

@Injectable()
export class ReactionService {
  constructor(private prisma: PrismaService) {}

  async reactToPost(dto: PostReactDto, auth: jwt_req_user) {
    let { postId, reactionId } = dto;

    if (!reactionId) reactionId = null;

    // Validate reaction type only if not null
    if (reactionId !== null) {
      if (!ty_REACTION_ID.has(reactionId)) {
        throw new BadRequestException('Invalid reaction type.');
      }
    }

    // check if post exist
    const post = await this.prisma.post.findUnique({
      where: { id: dto.postId },
    });

    if (!post) throw new NotFoundException('Post not found');

    const result = await this.prisma.$queryRaw<{ react_to_post: string }[]>`
      SELECT react_to_post(
        ${auth.id}::uuid,
        ${postId}::uuid,
        ${reactionId}::smallint
      )
    `;

    return { message: result[0].react_to_post };
  }

  async reactToComment(dto: CommentReactDto, auth: jwt_req_user) {
    let { commentId, reactionId } = dto;

    if (!reactionId) reactionId = null;

    // Validate reaction type only if not null
    if (reactionId !== null) {
      if (!ty_REACTION_ID.has(reactionId)) {
        throw new BadRequestException('Invalid reaction type.');
      }
    }

    // check if post exist
    const comment = await this.prisma.comment.findUnique({
      where: { id: dto.commentId },
    });

    if (!comment) throw new NotFoundException('Comment not found');

    const result = await this.prisma.$queryRaw<{ react_to_comment: string }[]>`
      SELECT react_to_comment(
        ${auth.id}::uuid,
        ${commentId}::uuid,
        ${reactionId}::smallint
      )
    `;

    return { message: result[0].react_to_comment };
  }

  async getPostReactions(
    postId: string,
    pagination: PaginationDto,
    reactionId?: number,
  ) {
    const limit = 99;
    // const limit = 30;
    const skip = ((pagination.page || 1) - 1) * limit;

    const reactions = await this.prisma.postReaction.findMany({
      where: {
        post_id: postId,
        ...(reactionId && { reaction_id: reactionId }),
      },
      skip,
      take: limit + 1,
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_img: true,
          },
        },
        // reaction: {
        //   select: {
        //     id: true,
        //     name: true,
        //   },
        // },
      },
    });

    let hasMore = false;

    if (reactions.length > limit) {
      hasMore = true;
      reactions.pop();
    }

    return {
      reactions,
      pagination: {
        hasMore,
      },
    };
  }

  async getCommentReactions(
    commentId: string,
    pagination: PaginationDto,
    reactionId?: number,
  ) {
    // const limit = 9999;
    const limit = 99;
    const skip = ((pagination.page || 1) - 1) * limit;

    const reactions = await this.prisma.commentReaction.findMany({
      where: {
        comment_id: commentId,
        ...(reactionId && { reaction_id: reactionId }),
      },
      skip,
      take: limit + 1,
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_img: true,
          },
        },
        // reaction: {
        //   select: {
        //     id: true,
        //     name: true,
        //   },
        // },
      },
    });

    let hasMore = false;

    if (reactions.length > limit) {
      hasMore = true;
      reactions.pop();
    }

    return {
      reactions,
      pagination: {
        hasMore,
      },
    };
  }
}
