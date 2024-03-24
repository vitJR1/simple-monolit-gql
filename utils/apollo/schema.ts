import {buildSchema} from "type-graphql";
import {resolvers} from "../../src/modules/resolvers";
import {gqlAuthChecker} from "../../src/secure";
import {pubSub} from "../ws/pubSub";

export const buildSchemaPromise = buildSchema({
  resolvers,
  authChecker: gqlAuthChecker,
  pubSub
})