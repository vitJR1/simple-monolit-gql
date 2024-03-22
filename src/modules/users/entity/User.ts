import bcrypt from 'bcrypt'
import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ArgsType, Field, InputType, Int, ObjectType} from "type-graphql";

@ObjectType()
@InputType('UserInput')
@ArgsType()
@Entity('users')
export class User extends BaseEntity {

	@Field(_ => Int, { nullable: true })
	@PrimaryGeneratedColumn()
	id?: number

	@Field({ nullable: true })
	@Column({ type: 'varchar', length: 255 })
	name?: string

	@Field({ nullable: true })
	@Column({ type: 'varchar', length: 255, update: false })
	email?: string

	@Field({ nullable: true })
	@Column({ type: 'varchar', length: 255, select: false, update: false })
	password?: string

	@Field({ nullable: true })
	@Column({ type: 'bigint', default: () => 'round(EXTRACT(epoch FROM now()))', update: false })
	created?: string

	@Field({ nullable: true })
	@Column({ default: false })
	deleted?: boolean

	@BeforeInsert()
	@BeforeUpdate()
	encryptPassword(): void {
		if(this.password !== undefined) {
			this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
		}
	}

	validatePassword(password: string): boolean {
		if(this.password === undefined){
			throw Error('Password is undefined')
		}
		return bcrypt.compareSync(password , this.password)
	}
}
