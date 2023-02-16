import { Status } from "../../domain/entities/status.entity";

export const helpers = {
    'status-color': function (status: Status) {
        switch(status) {
            case Status.ToDo:
                return 'bg-secondary';
            case Status.InProgress:
                return 'bg-primary';
            case Status.Done:
                return 'bg-success';
        }

        return '';
    },
    'status-name': function (status: Status) {
        switch(status) {
            case Status.ToDo:
                return 'To Do';
            case Status.InProgress:
                return 'In Progress';
            case Status.Done:
                return 'Done';
        }

        return '';
    }
}
