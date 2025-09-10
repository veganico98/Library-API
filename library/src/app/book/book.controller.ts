import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Role } from '../enums/role.enum';
import { Roles } from 'src/decorators/roles.decorators';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Roles(Role.Admin, Role.Coordinator, Role.Student, Role.Teacher)
@UseGuards(AuthGuard, RoleGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(+id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ){
    return this.bookService.update(id, updateBookDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
