import { IsInt, IsNotEmpty } from 'class-validator';

export class ReturnLoanDto {
  @IsInt()
  @IsNotEmpty()
  loanId: number;
}