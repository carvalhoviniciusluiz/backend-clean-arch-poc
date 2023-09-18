import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import ormOptions from './orm-options.config';
import { UserSchema } from '~/infra/database/typeorm/schema';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...ormOptions,
      entities: [
        UserSchema
      ],
      keepConnectionAlive: true,
      synchronize: true,
      logging: false
    };
  }
}
