import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    forwardRef(() => UserModule),
    
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}