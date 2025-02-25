import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(configService.get<string>('mongo_uri'), {
        dbName: configService.get<string>('mongo_db_name'),
      }),
  },
];

//
