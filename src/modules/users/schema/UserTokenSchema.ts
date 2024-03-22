import {ArgsType, Field, InputType, ObjectType} from "type-graphql";

@ObjectType()
@InputType('UserTokenSchemaInput')
@ArgsType()
export class UserTokenSchema {

    @Field()
    token!: string

}