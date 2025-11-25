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
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import {
  type jwt_req_user,
  type jwt_payload,
} from 'src/common/types/general.type';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PARAM_ID, UuidParamDTO } from 'src/common/validators/uuid-param.dto';
import { PaginationCursorDto } from 'src/common/validators/pagination.dto';

@UseGuards(AuthGuard)
@Controller('posts')
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  getAll(@Query() query: PaginationCursorDto, @CurrentUser() auth: jwt_req_user) {
    return this.service.getAllPosts(auth, query);
  }

  @Post()
  create(@Body() dto: CreatePostDto, @CurrentUser() auth: jwt_payload) {
    return this.service.create(dto, auth);
  }

  @Patch(PARAM_ID)
  update(
    @Param() param: UuidParamDTO,
    @Body() dto: UpdatePostDto,
    @CurrentUser() auth: jwt_payload,
  ) {
    return this.service.update(param.id.toString(), dto, auth);
  }

  @Delete(PARAM_ID)
  delete(@Param() param: UuidParamDTO, @CurrentUser() user: jwt_payload) {
    return this.service.delete(param.id.toString(), user);
  }
}
