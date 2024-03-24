import {UserResolvers} from "./users/UserResolvers";
import {NonEmptyArray} from "type-graphql";
import {TaskResolver} from "./tasks/TaskResolver";

export const resolvers: NonEmptyArray<Function> = [UserResolvers, TaskResolver]