import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { type jwt_req_user } from 'src/common/types/general.type';
import { PARAM_ID, UuidParamDTO } from 'src/common/validators/uuid-param.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { PaginationCursorDto } from '../common/validators/pagination.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { DeleteCommentDto } from './dtos/delete-comment.dto';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentController {
  constructor(private service: CommentService) {}

  @Post()
  async create(
    @Body() dto: CreateCommentDto,
    @CurrentUser() auth: jwt_req_user,
  ) {
    return this.service.createComment(dto, auth);
  }

  @Patch(PARAM_ID)
  async update(
    @Param() param: UuidParamDTO,
    @Body() dto: UpdateCommentDto,
    @CurrentUser() auth: jwt_req_user,
  ) {
    return this.service.updateComment(param.id, dto, auth);
  }

  @Delete()
  async delete(
    @Body() dto: DeleteCommentDto,
    @CurrentUser() auth: jwt_req_user,
  ) {
    return this.service.deleteComment(dto, auth);
  }

  @Get('single/:id')
  async getCommentThread(
    @Param() param: UuidParamDTO,
    @CurrentUser() auth: jwt_req_user,
    @Query() query: PaginationCursorDto,
  ) {
    return this.service.getCommentThread(param.id, auth, query);
  }

  @Get('post/:id')
  async getPostComments(
    @Param() param: UuidParamDTO,
    @Query() query: PaginationCursorDto,
    @CurrentUser() auth: jwt_req_user,
  ) {
    return this.service.getPostComments(param.id, auth, query);
  }
}
