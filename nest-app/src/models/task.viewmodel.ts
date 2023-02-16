import { Status } from "../domain/entities/status.entity";

export class TaskViewModel {
    id: string;
    title: string;
    creationDate: string;
    status: Status;
}
