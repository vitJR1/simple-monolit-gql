import {ObjectType} from "type-graphql";
import PaginatedResponse, {Totals} from "../../common/PaginatedResponse";
import {Task} from "../entity/Task";

@ObjectType()
export class PaginatedTaskResponse extends PaginatedResponse(Task) {
  info?: Totals | undefined
}