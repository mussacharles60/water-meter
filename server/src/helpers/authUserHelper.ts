require('dotenv').config();

import { Request, Response } from 'express';
import { User, UserSchema } from '../models/user.model';

import { IncomingHttpHeaders } from 'http';
import { PoolConnection } from 'mysql';
import ResponseCodes from '../apis';
import { ServerError } from '.';
import TokenHelper from './tokenHelper';
import moment from 'moment';

interface UserReq extends Request {
  headers: IncomingHttpHeaders;
  cookies: any;
  body: {
    action?: 'user_data' | 'update_user_details' | 'update_user_last_update';
    // user_id?: string;
    user_name?: string;
    user_username?: string;
    user_phone?: string;
  };
}

const AuthUserHelper = async (req: UserReq, res: Response) => {
  let user = await TokenHelper.getUser(req, res);
  if (!user) {
    return;
  }

  try {
    const action: UserReq['body']['action'] = req.body.action;
    if (!action || typeof action !== 'string' || action.trim().length === 0) {
      return ServerError.sendForbidden(res, 'unknown action');
    }
    switch (action) {
      case 'user_data':
        return AuthUserHelperInternal.getUserData(req, res, user);
      case 'update_user_details':
        return AuthUserHelperInternal.updateUserDetails(req, res, user);
      case 'update_user_last_update':
        return AuthUserHelperInternal.updateUserLastUpdate(req, res, user);
      default:
        return ServerError.sendNotFound(res, 'invalid action');
    }
  } catch (error) {
    return ServerError.sendInternalServerError(res);
  }
};

export const AuthUserHelperInternal = {
  getUserData: async (req: UserReq, res: Response, user: UserSchema) => {},
  updateUserDetails: async (
    req: UserReq,
    res: Response,
    user: UserSchema
  ) => {},
  updateUserLastUpdate: async (
    req: UserReq,
    res: Response,
    user: UserSchema
  ) => {},
  updateUserLastUpdateFromSocket: async (user_id: string) => {},
};

const notifyAllUserDevices = async (user: User, conn: PoolConnection) => {};

export default AuthUserHelper;
