import { Module } from '@nestjs/common';
import { TaskService } from "../../services/task-service.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Task from "../../domain/entities/task.entity";
import { TaskController } from "./taskr.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Task])
    ],
    providers: [TaskService],
    controllers: [TaskController]
})
export class TaskModule {}
