import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { jwt_payload } from '../types/general.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    // private authService: AuthService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  // async canActivate(context: ExecutionContext): Promise<boolean> {

  //   const request = context.switchToHttp().getRequest<Request>();

  //   // const authHeader = request.headers.get('Authorization');

  //   // @ts-ignore
  //   let authHeader = request.headers['authorization'];

  //   if (!authHeader) throw new UnauthorizedException('Missing token');

  //   const [, token] = authHeader.split(' ');
  //   if (!token) throw new UnauthorizedException('Invalid token format');

  //   try {
  //     const payload = await this.jwt.verifyAsync(token, {
  //       secret: this.config.get('JWT_ACCESS_SECRET'),
  //     }) as jwt_payload;

  //     // const payload = await this.authService.verifyToken(token);

  //     // const payload = {sub: '1'}

  //     const user = await this.prisma.user.findUnique({
  //       where: { id: payload.id },
  //       select: { id: true, email: true },
  //     });

  //     if (!user) throw new UnauthorizedException('User not found');

  //     // @ts-ignore
  //     request.user = user;

  //     return true;

  //   } catch {
  //     throw new UnauthorizedException('Invalid or expired token');
  //   }
  // }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = (request as any).cookies?.access_token;

    if (!accessToken) {
      throw new UnauthorizedException('Access token missing');
    }

    try {
      // 1. Verify JWT
      const payload = await this.jwt.verifyAsync(accessToken, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      });

      // 2. Ensure user still exists
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('User no longer exists');
      }

      // 3. Attach user to request
      (request as any).user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
