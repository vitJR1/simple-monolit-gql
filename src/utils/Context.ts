import {TokenPayload} from "./TokenPayload";

export class Context {
    requestId!: string
    token!: string
    user!: TokenPayload
}