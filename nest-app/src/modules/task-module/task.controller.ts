import { Body, Controller, Get, Post, Redirect, Render, Res } from '@nestjs/common';
import { TaskService } from "../../services/task-service.service";
import { TaskAddViewModel } from '../../models/task-add.viewmodel';
import { Response } from 'express';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {
    }

    @Get('/')
    @Render('task-list')
    async tasks() {
        const tasks = await this.taskService.getTasks();

        return {
            tasks
        }
    }

    @Get('/add')
    @Render('add-task')
    async addTask() {
        const statuses = this.taskService.getTaskStatuses();

        return {
            statuses
        };
    }

    @Post('/add')
    async addTaskPost(
        @Body() model: TaskAddViewModel,
        @Res() res: Response
    ) {
        const result = await this.taskService.addTask(model);

        if(result !== true) {
            // errors
            const statuses = this.taskService.getTaskStatuses();
            return res.render('add-task', {statuses});
        }

        res.redirect('/');
    }

    @Post('remove')
    @Redirect('/')
    async deleteTask(@Body() id: string) {
        await this.taskService.deleteTask(id);
    }
}
