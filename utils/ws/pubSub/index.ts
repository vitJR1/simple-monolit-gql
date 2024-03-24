import {createPubSub} from "@graphql-yoga/subscription";
import {Task} from "../../../src/modules/tasks/entity/Task";

export const pubSub = createPubSub<{
  TASK: [Task];
}>();