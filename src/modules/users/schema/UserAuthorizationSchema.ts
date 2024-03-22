import {ArgsType, Field, InputType, ObjectType} from "type-graphql";

@ObjectType()
@InputType('UserTokenSchemaInput')
@ArgsType()
export class UserAuthorizationSchema {

    @Field()
    email!: string

    @Field()
    password!: string

}