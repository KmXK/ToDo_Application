import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import Task from "./domain/entities/task";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mssql',
          host: 'localhost',
          username: 'user',
          password: 'user',
          database: 'test',
          entities: [Task],
          synchronize: false,
          options: {
              encrypt: false
          }
      }),
      TypeOrmModule.forFeature([Task])
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
