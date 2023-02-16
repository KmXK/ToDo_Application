import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { TaskService } from '../services/task-service.service';

@Controller()
export class AppController {
    @Get('')
    @Redirect('task')
    private homePage() {
    }
}
