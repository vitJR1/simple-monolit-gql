import {TaskFilter} from "../filter/TaskFilter";
import {Task} from "../entity/Task";
import {getPaginatedTable, PaginatedTable} from "../../common/PaginatedTable";
import {ILike} from "typeorm";

export class TaskHandler {
    async tasks (
		filter: TaskFilter
	): Promise<PaginatedTable<Task>> {
        return await Task.findAndCount({
            where: {
				name: ILike(`%${filter?.search ?? ''}%`)
			},
			order: {
				[filter?.order?.field ?? 'id']: filter?.order?.by ?? 'DESC'
			},
			...filter?.pagination
        }).then(getPaginatedTable)
	}

	async task (
		task: Task
	): Promise<Task> {
        return await task.save()
	}
}