import { User } from '../../user/model/user.model';

declare module 'express' {
  export interface Request<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
    > extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals, User> {
    user: User;
}
}
