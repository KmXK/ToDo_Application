import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TaskModule } from './task-module/task.module';
import TaskEntity from "../domain/entities/task.entity";
import { TaskController } from "./task-module/taskr.controller";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mssql',
          host: 'localhost',
          username: 'user',
          password: 'user',
          database: 'test',
          entities: [TaskEntity],
          synchronize: false,
          options: {
              encrypt: false
          }
      }),
      TaskModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
