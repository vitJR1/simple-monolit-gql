import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, InputType, ObjectType} from "type-graphql";
import {TaskExecutor} from "./TaskExecutor";

@ObjectType()
@InputType('TaskInput')
@Entity('tasks')
export class Task extends BaseEntity {
    @Field({ nullable: true })
    @PrimaryGeneratedColumn()
    id?: number

    @Field({ nullable: true })
    @Column({ type: 'varchar', length: 255 })
    name?: string

    @Field({ nullable: true })
    @Column({ type: 'text' })
    description?: string

    @Field(_ => [TaskExecutor], { nullable: true })
    @OneToMany(_ => TaskExecutor, te => te.task, { eager: true, cascade: true })
    executors?: TaskExecutor[]

    @Field({ nullable: true })
	@Column({ type: 'bigint', default: () => 'round(EXTRACT(epoch FROM now()))', update: false })
	created?: string

	@Field({ nullable: true })
	@Column({ default: false })
	deleted?: boolean
}