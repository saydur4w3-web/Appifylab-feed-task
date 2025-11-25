import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { jwt_payload } from '../types/general.type';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user
  }
);