import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { TaskService } from "../../services/task-service.service";

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {
    }

    @Get('')
    @Render('task-list')
    async tasks() {
        const tasks = await this.taskService.getTasks();

        return {
            tasks
        }
    }

    @Get('add')
    @Render('add-task')
    async addTask() {
        const statuses = this.taskService.getTaskStatuses();

        return {
            statuses
        };
    }

    @Post('remove')
    @Redirect('/')
    async deleteTask(@Body() id: string) {
        await this.taskService.deleteTask(id);
    }
}
