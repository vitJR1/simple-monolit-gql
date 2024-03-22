import { DefaultFilter } from '../../../utils/DefaultFilter'
import { User } from '../entity/User'
import {ArgsType, Field, InputType, Int, ObjectType} from "type-graphql";

@ObjectType()
@InputType('UserFilterInput')
@ArgsType()
export class UserFilter extends DefaultFilter {
	@Field(_ => Int, { nullable: true })
	id?: number
}
