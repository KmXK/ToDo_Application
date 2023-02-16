import { Status } from "../domain/entities/status.entity";

export class TaskViewmodel {
    id: string;
    title: string;
    creationDate: string;
    status: Status;
}
