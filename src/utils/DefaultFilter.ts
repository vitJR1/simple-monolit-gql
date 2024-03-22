import {ArgsType, Field, InputType, ObjectType} from "type-graphql";

@ObjectType()
@InputType('OrderByInput')
@ArgsType()
export class OrderBy  {
	@Field()
	field!: string

	@Field()
	by!: 'ASC' | 'DESC'
}

@ObjectType()
@InputType('PaginationInput')
@ArgsType()
export class Pagination {
	@Field()
	skip!: number

	@Field()
	take!: number
}

@ObjectType()
@InputType('DefaultFilterInput')
@ArgsType()
export class DefaultFilter {
	@Field(_ => OrderBy, { nullable: true })
	order?: OrderBy

	@Field(_ => Pagination, { nullable: true })
	pagination?: Pagination

	@Field({ nullable: true })
	search?: string
}
