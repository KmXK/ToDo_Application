import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TaskModule } from './task-module/task.module';
import TaskEntity from "../domain/entities/task.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mssql',
          host: '192.168.0.107',
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
