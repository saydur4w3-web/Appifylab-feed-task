import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { jwt_payload } from 'src/common/types/general.type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  private async signTokens(userId: string) {
    const jwtAccessKey = this.config.get('JWT_ACCESS_SECRET');
    const jwtSecretKey = this.config.get('JWT_REFRESH_SECRET');

    if (!jwtAccessKey || !jwtSecretKey) {
      throw new ServiceUnavailableException();
    }

    const tokenData: jwt_payload = { id: userId };

    const accessToken = await this.jwt.signAsync(tokenData, {
      secret: jwtAccessKey,
      // expiresIn: this.config.get('JWT_ACCESS_EXPIRATION') || '7d', // '120m',
      expiresIn: '10d', // '120m',
    });

    const refreshToken = await this.jwt.signAsync(tokenData, {
      secret: jwtSecretKey,
      expiresIn: this.config.get('JWT_REFRESH_EXPIRATION') || '10d',
    });

    return { accessToken, refreshToken };
  }

  public verifyToken(token: string) {
    return this.jwt.verifyAsync(token, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
    });
  }

  async signup(dto: SignUpDto) {
    // 1. Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true }, // very cheap query
    });

    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        // username: dto.username,
        email: dto.email,
        first_name: dto.first_name,
        last_name: dto.last_name,
        profile_img: dto.profile_img,
        password: hash,
      },
    });

    const tokens = await this.signTokens(user.id);

    const rHash = await argon2.hash(tokens.refreshToken);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: rHash },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_img: user.profile_img,
      },
      tokens,
    };
  }

  async signin(dto: SignInDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await argon2.verify(user.password, dto.password);

    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.signTokens(user.id);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: await argon2.hash(tokens.refreshToken) },
    });

    return tokens;
  }

  async refreshTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    let payload: jwt_payload;

    try {
      payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      });
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const userId = payload.id;

    // 2. Load user from DB
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException('Access denied');
    }

    // 3. Compare provided refreshToken with stored hashed token
    const isValid = await argon2.verify(user.refresh_token, refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.signTokens(user.id);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refresh_token: await argon2.hash(tokens.refreshToken),
      },
    });

    return tokens;
  }
}
