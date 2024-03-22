import {ArgsType, Field, InputType, ObjectType} from "type-graphql";

@ObjectType()
@InputType('UserTokenSchemaInput')
@ArgsType()
export class UserRegistrationSchema {

    @Field()
    name!: string

    @Field()
    email!: string

    @Field()
    password!: string

}