import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { BooksController } from './book.controller';
import { BookService } from './book.service';
import { booksProviders } from './book.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BookService, ...booksProviders],
})
export class BookModule {}
