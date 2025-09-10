import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { ReturnLoanDto } from './dto/return-loan.dto';
import { Role } from 'src/app/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorators';

@Roles(Role.Admin,Role.User)
@Controller('loans')
// @UseGuards(AuthGuard, RoleGuard)
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('borrow')
  borrowBook(@Body() dto: CreateLoanDto) {
    return this.loanService.createLoan(dto);
  }

  @Post('return')
  returnBook(@Body() dto: ReturnLoanDto) {
    return this.loanService.returnLoan(dto);
  }

  @Get()
  findAll() {
    return this.loanService.findAll();
  }
}
