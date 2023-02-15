import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TaskService } from './services/task-service.service';
import TaskEntity from "./domain/entities/task.entity";

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
      TypeOrmModule.forFeature([TaskEntity])
  ],
  controllers: [AppController],
  providers: [TaskService],
})
export class AppModule {}
