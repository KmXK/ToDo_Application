import { Injectable } from '@nestjs/common';
import Task from '../domain/entities/task.entity';
import { TaskViewModel } from '../models/taskViewModel';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
