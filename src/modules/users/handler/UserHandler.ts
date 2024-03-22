import { User } from '../entity/User'
import { UserFilter } from '../filter/UserFilter'
import { TokenPayload } from '../../../utils/TokenPayload'
import { TsoaResponse } from '@tsoa/runtime'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../../config'
import { plainToInstance } from 'class-transformer'
import {ILike} from "typeorm";
import {getPaginatedTable, PaginatedTable} from "../../common/PaginatedTable";
import {UserTokenSchema} from "../schema/UserTokenSchema";

export class UserHandler {
	async getUserById(id: number): Promise<User | null>  {
		return await User.findOneBy({ id })
	}

	async saveUser(user: User): Promise<User>  {
		return await user.save().then(result => {
			result.password = undefined
			return result
		})
	}

	async userList(filter?: UserFilter): Promise<PaginatedTable<User>>  {
		return await User.findAndCount({
			where: {
				name: ILike(`%${filter?.search ?? ''}%`)
			},
			order: {
				[filter?.order?.field ?? 'id']: filter?.order?.by ?? 'DESC'
			},
			...filter?.pagination,
		}).then(getPaginatedTable)
	}

	async userRegistration (user: User): Promise<User> {
		return await this.saveUser(user)
	}

	async userLogin (
		credentials: Pick<User, 'email' | 'password'>,
	): Promise<UserTokenSchema> {
		const user = await User.findOne({
			select: ['id', 'password'],
			where: { email: credentials.email }
		})
		if(user === null){
			throw Error('User not found')
		}

		if(!user.validatePassword(credentials.password!)){
			throw Error('Incorrect login or password')
		}
		const payload: TokenPayload = {
			id: user.id!,
			scopes: ['get-user', 'mutate-user']
		}

		return { token: jwt.sign(payload, SECRET_KEY) }
	}
}
