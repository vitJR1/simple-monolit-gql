import * as jwt from "jsonwebtoken"
import {AuthChecker} from "type-graphql";
import {TokenPayload} from "../utils/TokenPayload";
import {SECRET_KEY} from "../../config";
import {Context} from "../utils/Context";

export const Authorization = (token: string): TokenPayload | string => {
  try{
    const verifiedToken = jwt.verify(token, SECRET_KEY)

    if(typeof verifiedToken === 'string'){
      return verifiedToken
    }

    return verifiedToken as TokenPayload
  }catch (e: any){
    return e.message
  }
}

export const gqlAuthChecker: AuthChecker<Context> = ( { context }, _roles: string[] ) => {
  const verifiedToken = Authorization(context.token)

  if(typeof verifiedToken === 'string'){
    return false
  }

  context.user = verifiedToken as TokenPayload

  return true
}
