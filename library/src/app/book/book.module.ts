import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { PrismaModule } from 'src/prisma/prismaModule';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule)

  ],
  controllers: [BookController],
  providers: [BookService, PrismaService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class BookModule {}
