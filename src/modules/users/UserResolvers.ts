import { UserHandler } from './handler/UserHandler'
import { User } from './entity/User'
import { UserFilter } from './filter/UserFilter'
import {plainToInstance} from "class-transformer";
import {Query, Resolver, Ctx, Authorized, Mutation, Args, Arg} from "type-graphql";
import {Context} from "../../utils/Context";
import {UserTokenSchema} from "./schema/UserTokenSchema";
import {UserAuthorizationSchema} from "./schema/UserAuthorizationSchema";
import {UserRegistrationSchema} from "./schema/UserRegistrationSchema";
import {PaginatedUserResponse} from "./schema/PaginatedUserResponse";

@Resolver()
export class UserResolvers {

	private readonly handler = new UserHandler()

	@Authorized()
	@Query(_ => User)
	async me(
		@Ctx() context: Context
	): Promise<User | null> {
		return await this.handler.getUserById(context.user.id)
	}

	@Authorized()
	@Mutation(_ => User)
	async saveUser(
		@Args() user: User
	): Promise<User> {
		return await this.handler.saveUser(plainToInstance(User, user))
	}

	@Authorized()
	@Query(_ => PaginatedUserResponse)
	async userList(
		@Arg('filter', _ => UserFilter, { nullable: true }) filter?: UserFilter
	): Promise<PaginatedUserResponse> {
		const data = await this.handler.userList(filter)
		console.log(data)
		return data
	}

	@Mutation(_ => User)
	async userRegistration(
		@Args() user: UserRegistrationSchema
	): Promise<User> {
		return await this.handler.userRegistration(plainToInstance(User, user))
	}

	@Query(_ => UserTokenSchema)
	async login(
		@Args() user: UserAuthorizationSchema,
	): Promise<UserTokenSchema> {
		return await this.handler.userLogin(user)
	}
}
