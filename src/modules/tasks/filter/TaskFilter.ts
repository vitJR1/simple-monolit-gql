import {DefaultFilter} from "../../../utils/DefaultFilter";
import {InputType, ObjectType} from "type-graphql";

@ObjectType()
@InputType('TaskFilterInput')
export class TaskFilter extends DefaultFilter {}
