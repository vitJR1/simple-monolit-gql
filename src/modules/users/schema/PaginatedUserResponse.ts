import {ObjectType} from "type-graphql";
import {User} from "../entity/User";
import PaginatedResponse, {Totals} from "../../common/PaginatedResponse";

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User) {
  info?: Totals | undefined
}