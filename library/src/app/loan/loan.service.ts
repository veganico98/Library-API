import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { ReturnLoanDto } from './dto/return-loan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async createLoan(dto: CreateLoanDto) {
    const book = await this.prisma.book.findUnique({ where: { id: dto.bookId } });

    if (!book) throw new NotFoundException('Livro não encontrado');
    if (!book.available) throw new BadRequestException('Livro indisponível');

    return this.prisma.$transaction(async (tx) => {
      const loan = await tx.loan.create({
        data: {
          bookId: dto.bookId,
          borrowerId: dto.borrowerId,
          dueAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
      });

      await tx.book.update({
        where: { id: dto.bookId },
        data: { available: false },
      });

      return loan;
    });
  }

  async returnLoan(dto: ReturnLoanDto) {
    const loan = await this.prisma.loan.findUnique({
      where: { id: dto.loanId },
      include: { book: true },
    });

    if (!loan) throw new NotFoundException('Empréstimo não encontrado');
    if (loan.returnedAt) throw new BadRequestException('Livro já devolvido');

    return this.prisma.$transaction(async (tx) => {
      const updatedLoan = await tx.loan.update({
        where: { id: dto.loanId },
        data: { returnedAt: new Date() },
      });

      await tx.book.update({
        where: { id: loan.bookId },
        data: { available: true },
      });

      return updatedLoan;
    });
  }

  async findAll() {
    return this.prisma.loan.findMany({
      include: { book: true, borrower: true },
    });
  }
}
