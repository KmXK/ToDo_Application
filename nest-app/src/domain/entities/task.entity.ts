import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from './status.entity';

@Entity({
    name: 'Tasks'
})
export default class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    creationDate: Date;

    @Column({ name: 'status_id' })
    status: Status;
}
