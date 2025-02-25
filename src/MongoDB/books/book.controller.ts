import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { Book } from './interface/book.interface';
import { CreateSearchDto } from './dto/create-search.dto';

@Controller('book')
export class BooksController {
  constructor(private readonly BooksService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.BooksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.BooksService.findAll();
  }
  @Post('/search')
  async findSearch(@Body() createSearchDto: CreateSearchDto): Promise<Book[]> {
    return this.BooksService.findSearch(createSearchDto);
  }
  @Get('/test')
  async findBasic(@Body() createSearchDto: CreateSearchDto): Promise<Book[]> {
    return this.BooksService.findBasic(createSearchDto);
  }
}
