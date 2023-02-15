import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Redirect, Render, Res } from '@nestjs/common';
import { TaskService } from './services/task-service.service';
import { RedirectResponse } from '@nestjs/core/router/router-response-controller';

@Controller()
export class AppController {
    constructor(
        private readonly taskService: TaskService
    ) {
    }

    @Get()
    @Render('index')
    async tasks() {
        const tasks = await this.taskService.getTasks();

        return {
            tasks: await this.taskService.getTasks()
        }
    }

    @Post('remove')
    @Redirect('/')
    async deleteTask(@Body() id: string) {
        await this.taskService.deleteTask(id);
    }
}
