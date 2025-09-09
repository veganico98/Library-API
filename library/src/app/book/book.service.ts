import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService){}
  
  async findAll() {
    return this.prismaService.book.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.book.findUnique({
      where: {id}
    });
  }
  
  create(createBookDto: CreateBookDto) {
    return this.prismaService.book.create({ data: createBookDto });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.bookExists(id);

    return this.prismaService.book.update({
      data: updateBookDto,
      where: {id}
    })
  }

  async remove(id: number) {
    await this.bookExists(id);

    return this.prismaService.book.delete({
      where: {id}
    })
  }

  async bookExists(id: number){
    if (!(await this.findOne(id))){
      throw new NotFoundException(`O Livro de ID ${id} não existe`)
    }
  }
}
