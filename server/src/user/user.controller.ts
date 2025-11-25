import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { type jwt_req_user } from 'src/common/types/general.type';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('me')
  getMe(@CurrentUser() auth: jwt_req_user) {
    return this.service.getMe(auth.id);
  }
}
