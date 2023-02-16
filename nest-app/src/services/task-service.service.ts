import { Injectable } from '@nestjs/common';
import Task from '../domain/entities/task.entity';
import { TaskViewmodel } from '../models/task.viewmodel';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatusViewModel } from "../models/taskStatus.viewmodel";
import { Status } from "../domain/entities/status.entity";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {
    }

    public getTasks(): Promise<TaskViewmodel[]> {
        return this.taskRepository.find()
            .then(tasks => tasks.map(task => ({
            ...task,
            creationDate: new Date(task.creationDate).toLocaleDateString('en-us')
        })));
    }

    public async deleteTask(id: string): Promise<boolean> {
        const result = await this.taskRepository.delete(id);
        return !!result.affected;
    }

    public getTaskStatuses(): Status[] {
        return [
            Status.ToDo,
            Status.InProgress,
            Status.Done
        ];
    }
}
