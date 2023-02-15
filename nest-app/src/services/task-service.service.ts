import { Injectable } from '@nestjs/common';
import Task from '../domain/entities/task.entity';
import { TaskViewModel } from '../models/taskViewModel';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../domain/entities/status.entity';

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
            statusColor: this.getStatusColor(task.status),
            creationDate: new Date(task.creationDate).toLocaleDateString('en-us'),
            status: Status[task.status]
        })));
    }

    public deleteTask(id: string): Promise<boolean> {
        return this.taskRepository.delete(id)
            .then(_ => true)
            .catch(_ => false);
    }

    private getStatusColor(status: Status): string {
        switch(status) {
            case Status.ToDo:
                return 'secondary';
            case Status.InProgress:
                return 'primary';
            case Status.Done:
                return 'success';
        }

        return '';
    }
}
