import { Module, forwardRef } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { PrismaModule } from 'src/prisma/prismaModule';
import { AuthModule } from '../auth/auth.module';
import { BookModule } from '../book/book.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    BookModule,                    
  ],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
