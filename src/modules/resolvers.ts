import {UserResolvers} from "./users/UserResolvers";
import {NonEmptyArray} from "type-graphql";

export const resolvers: NonEmptyArray<Function> = [UserResolvers]