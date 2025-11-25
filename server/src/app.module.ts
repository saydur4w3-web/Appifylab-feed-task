import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UplaodModule } from './uplaod/uplaod.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { ReactionModule } from './reaction/reaction.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    JwtModule.register({
      secret: 'defined-on-auth-service',
      signOptions: { expiresIn: '60s' },
      global: true, // makes this global
    }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '..', 'uploads'),
    //   serveRoot: '/uploads',
    //   // serveRoot: '/v1/uploads',
    // }),

ServeStaticModule.forRoot({
  rootPath: join(process.cwd(), 'uploads'),
  serveRoot: '/uploads',
}),




    PrismaModule,
    UserModule,
    AuthModule,
    UplaodModule,
    PostModule,
    ReactionModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
