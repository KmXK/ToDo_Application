import { Injectable } from '@nestjs/common';
import Task from '../domain/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from "../domain/entities/status.entity";
import { TaskViewModel } from '../models/task.viewmodel';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {
    }

    public getTasks(): Promise<TaskViewModel[]> {
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
