import { ClassType, Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Totals {
  @Field(_ => Int)
  count?: number
}

export default function PaginatedResponse
  <
    TItem extends object,
    TInfo extends Totals
  > (
    TItemClass: ClassType<TItem>,
    TInfoClass: ClassType<TInfo> | undefined = undefined
) {
  @ObjectType()
  abstract class ResponseTableModelGQL {
    @Field(_=> [TItemClass])
    items?: TItem[] | undefined
    @Field(_ => TInfoClass ?? Totals)
    info?: TInfo | Totals | undefined
  }

  return ResponseTableModelGQL
}