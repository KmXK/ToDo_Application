import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { TaskService } from './services/task-service.service';

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
            tasks
        }
    }

    @Post('remove')
    @Redirect('/')
    async deleteTask(@Body() id: string) {
        await this.taskService.deleteTask(id);
    }
}
