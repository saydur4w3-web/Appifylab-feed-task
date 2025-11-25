import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import { SignInDto } from './dtos/signin.dto';
import { type Response, type Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokens } = await this.service.signup(dto);

    this.setTokenCookies(res, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    return {
      message: 'successfully signed up',
    };
  }

  @Post('signin')
  async signin(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.service.signin(dto);

    this.setTokenCookies(res, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    return {
      message: 'successfully signed in',
    };
  }

  @Post('refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = (req as any).cookies?.refresh_token;

    if (!refreshToken) throw new BadRequestException('Invalid token');

    const tokens = await this.service.refreshTokens(refreshToken);

    this.setTokenCookies(res, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    return {
      message: 'refresh token verified',
    };
  }

  @Post('signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return {
      message: 'successfully signed out',
    };
  }

  private setTokenCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    const isProd = process.env.NODE_ENV === 'production';

    // Refresh token cookie - httpOnly, only accessible by server
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      // maxAge: 2 * 60 * 60 * 1000, // 2 hours (adjust to your access token lifetime)
      maxAge: 10 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
