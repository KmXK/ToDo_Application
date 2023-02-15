import { Controller, Get, Render } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Task from "./domain/entities/task";

@Controller()
export class AppController {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {
    }


    @Get()
    @Render('index')
    async getHello() {
        //return {tasks: [{value: '123'}]}
        return {tasks: await this.taskRepository.findBy({id: 'ae331c13-f7e8-4f72-b629-4764d2466764'})};
    }
}
