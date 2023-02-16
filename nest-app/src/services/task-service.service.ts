import { Injectable } from '@nestjs/common';
import Task from '../domain/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../domain/entities/status.entity';
import { TaskViewModel } from '../models/task.viewmodel';
import { TaskAddViewModel } from '../models/task-add.viewmodel';

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

    public async addTask(model: TaskAddViewModel): Promise<{ errors: { title?: string, description?: string } } | true> {
        const task = this.taskRepository.create({
            title: model.title.trim(),
            status: Status.ToDo,
            creationDate: new Date(Date.now()),
            text: ''
        });

        if(task.title.length === 0) {
            return {
                errors: {
                    title: 'Title cannot be empty.'
                }
            };
        }

        if(model.description?.length === 0) {
            return {
                errors: {
                    description: 'Title cannot be empty.'
                }
            };
        }

        await this.taskRepository.save(task);

        return true;
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
