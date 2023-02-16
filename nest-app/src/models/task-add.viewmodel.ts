import { IsNotEmpty } from 'class-validator';

export class TaskAddViewModel {
    @IsNotEmpty()
    title: string;

    description: string;
}