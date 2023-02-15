import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    value: string;
}
