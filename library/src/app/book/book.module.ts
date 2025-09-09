import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [BookController],
  providers: [BookService, PrismaService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class BookModule {}
