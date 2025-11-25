import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { PostReactDto } from './dtos/postReact.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { type jwt_req_user } from 'src/common/types/general.type';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { CommentReactDto } from './dtos/commentReact.dto';
import { UuidParamDTO } from 'src/common/validators/uuid-param.dto';
import { PaginationDto } from 'src/common/validators/pagination.dto';
import { GetQueryDto } from './dtos/getQuery.dto';

@UseGuards(AuthGuard)
@Controller('reaction')
export class ReactionController {
  constructor(private service: ReactionService) {}

  @Patch('post')
  reactToPost(@Body() dto: PostReactDto, @CurrentUser() auth: jwt_req_user) {
    return this.service.reactToPost(dto, auth);
  }

  @Patch('comment')
  reactToComment(
    @Body() dto: CommentReactDto,
    @CurrentUser() auth: jwt_req_user,
  ) {
    return this.service.reactToComment(dto, auth);
  }

  @Get('post/:id')
  async getPostReactions(
    @Param() param: UuidParamDTO,
    @Query() query: PaginationDto,
    @Query() idQuery: GetQueryDto,
  ) {
    return this.service.getPostReactions(
      param.id,
      query,
      idQuery.reactionId,
    );
  }

  @Get('comment/:id')
  async getCommentReactions(
    @Param() param: UuidParamDTO,
    @Query() query: PaginationDto,
    @Query() idQuery: GetQueryDto,
  ) {
    return this.service.getCommentReactions(
      param.id,
      query,
      idQuery.reactionId,
    );
  }
}
