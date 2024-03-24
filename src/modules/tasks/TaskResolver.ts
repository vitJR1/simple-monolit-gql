import {Arg, Authorized, Mutation, Query, Resolver, Root, Subscription} from "type-graphql";
import {TaskHandler} from "./handler/TaskHandler";
import {Task} from "./entity/Task";
import {TaskFilter} from "./filter/TaskFilter";
import {PaginatedTaskResponse} from "./schema/PaginatedTaskResponse";
import {plainToInstance} from "class-transformer";
import {pubSub} from "../../../utils/ws/pubSub";

@Resolver()
export class TaskResolver {
	private readonly handler = new TaskHandler()

	@Authorized()
	@Query(_ => PaginatedTaskResponse)
	async tasks (
		@Arg('filter') filter: TaskFilter
	): Promise<PaginatedTaskResponse> {
		return await this.handler.tasks(filter)
	}

	@Authorized()
	@Mutation(_ => Task)
	async task (
		@Arg('task', _ => Task, { nullable: true }) task: Task
	): Promise<Task> {
		return await this.handler.task(plainToInstance(Task, task)).then(r => {
			pubSub.publish('TASK', r)
			return r
		})
	}

	@Subscription(_ => Task, {
    topics: 'TASK',
    nullable: true,
    filter: ({ context, payload }) => {
		console.log('payload',payload, context)
      const notification = payload as Task
      return notification.executors?.some(e => e.user?.id === context.user.id) ?? false
    }
  })
  taskMutation(
    @Root() task: Task
  ): Task {
    return task
  }
}