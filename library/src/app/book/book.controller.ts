import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Role } from '../enums/role.enum';
import { Roles } from 'src/decorators/roles.decorators';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Roles(Role.Admin, Role.Coordinator, Role.Student, Role.Teacher)
  @Get()
  findAll() {
    return this.bookService.findAll();
  }
  @Roles(Role.Admin, Role.Coordinator, Role.Student, Role.Teacher)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(+id);
  }
  @Roles(Role.Admin, Role.Coordinator, Role.Student, Role.Teacher)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Roles(Role.Admin, Role.Coordinator, Role.Student, Role.Teacher)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ){
    return this.bookService.update(id, updateBookDto)
  }
  @Roles(Role.Admin, Role.Coordinator, Role.Teacher)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
