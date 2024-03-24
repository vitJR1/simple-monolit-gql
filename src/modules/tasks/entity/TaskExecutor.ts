import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entity/User";
import {Task} from "./Task";
import {Field, InputType, ObjectType} from "type-graphql";


@ObjectType()
@InputType('TaskExecutorInput')
@Entity('task_executor')
export class TaskExecutor {
    @Field({ nullable: true })
    @PrimaryGeneratedColumn()
    id?: number

    @Field(_ => Task, { nullable: true })
    @ManyToOne(_ => Task, t => t.executors)
    task?: Task

    @Field(_ => User, { nullable: true })
    @ManyToOne(_ => User, u => u.id, { eager: true, cascade: true })
    user?: User

    @Field({ nullable: true })
    @Column({ default: false })
    complete?: boolean
}