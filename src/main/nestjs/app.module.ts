import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm';
import { UserSchema } from '~/infra/database/typeorm/schema';
import { UserTypeOrmRepository } from '~/infra/repository/typeorm';
import { UserTypeOrm } from '~/infra/database/typeorm/entity';
import { SignUpUseCase } from '~/application/usecase';
import { UserRepository } from '~/application/repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    TypeOrmModule.forFeature([UserSchema])
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'SignUp',
      useFactory: (repository: UserRepository) => {
        return new SignUpUseCase(repository);
      },
      inject: [
        'UserTypeOrmRepository'
      ]
    },
    {
      provide: 'UserTypeOrmRepository',
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(UserTypeOrm));
      },
      inject: [getDataSourceToken()]
    }
  ],
})
export class AppModule {}
