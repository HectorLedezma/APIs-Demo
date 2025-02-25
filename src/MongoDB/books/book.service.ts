import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Book } from './interface/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateSearchDto } from './dto/create-search.dto';
//import { Search } from './interface/search.interface';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_MODEL')
    private bookModel: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdCat = new this.bookModel(createBookDto);
    return createdCat.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findBasic(createSearchDto: CreateSearchDto): Promise<Book[]> {
    return this.bookModel.find(createSearchDto).exec();
  }

  async findSearch(createSearchDto: CreateSearchDto): Promise<Book[]> {
    const schemaPaths = this.bookModel.schema.paths;

    const camposConTipos: Record<string, string> = {};

    let result = [];

    for (const [campo, detalles] of Object.entries(schemaPaths)) {
      // Obtener el tipo de dato del campo
      if (!['_id', '__v'].includes(campo)) {
        camposConTipos[campo] = detalles.instance || 'Indefinido';
        const param = {};
        let paramValue: any = null;
        switch (detalles.instance) {
          case 'String':
            paramValue = {
              $regex: '^' + createSearchDto.search,
              $options: 'i',
            };
            break;
          case 'Array':
            paramValue = {
              $elemMatch: {
                $regex: `^${createSearchDto.search}`,
                $options: 'i',
              },
            };
            break;
          default:
            paramValue = 0;
            break;
        }
        param[campo] = paramValue;
        const doc = await this.bookModel
          .find(param)
          .sort({ [campo]: 1 })
          .exec();
        if (doc.length !== 0) {
          for (let i = 0; i < doc.length; i++) {
            result.push(doc[i]);
          }
        }
      }
    }
    if (result.length === 0) {
      result = await this.bookModel.find().exec();
    }
    return result;
  }
}
