import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { PrismaModule } from 'src/prisma/prismaModule';

@Module({
  imports: [PrismaModule],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
