require('dotenv').config();

import { AuthResponseType, TokenPayload } from '../models/auth.model';
import DB, { MySQLResultType } from '../service/databaseHelper';
import { Request, Response } from 'express';

import Console from '../utils/logcat';
import { IncomingHttpHeaders } from 'http';
import { PoolConnection } from 'mysql';
import ResponseCodes from '../apis';
import { ServerError } from './index';
import ServerUtil from '../utils';
import TokenHelper from './tokenHelper';
import { UserSchema } from '../models/user.model';
import { UsersTable } from '../models/user.model';
import bcrypt from 'bcrypt';
import moment from 'moment';

const REFRESH_TOKEN_MAX_AGE = 24 * 60 * 60 * 1000;

interface AuthReq extends Request {
  headers: IncomingHttpHeaders;
  cookies: any;
  body: {
    action?:
      | 'signin'
      | 'signup'
      | 'email_verification_mail'
      | 'email_verification'
      | 'password_recover_mail'
      | 'password_recover'
      | 'password_change'
      | 'refresh_token'
      | 'signout';
    email?: string;
    password?: string;
    new_password?: string;
    name?: string;
    phone?: string;
    token?: string;
  };
}

const AuthHelper = async (req: AuthReq, res: Response) => {
  try {
    const action: AuthReq['body']['action'] = req.body.action;
    if (!action || typeof action !== 'string' || action.trim().length === 0) {
      return ServerError.sendForbidden(res, 'unknown action');
    }
    switch (action) {
      case 'signup':
        return AuthHelperInternal.signUp(req, res);
      case 'email_verification_mail':
        return AuthHelperInternal.sendEmailVerificationMail(req, res);
      case 'email_verification':
        return AuthHelperInternal.emailVerification(req, res);
      case 'signin':
        return AuthHelperInternal.signIn(req, res);
      case 'password_recover_mail':
        return AuthHelperInternal.sendPasswordRecoverMail(req, res);
      case 'password_recover':
        return AuthHelperInternal.passwordRecover(req, res);
      case 'password_change':
        return AuthHelperInternal.passwordChange(req, res);
      case 'refresh_token':
        return AuthHelperInternal.handleRefreshToken(req, res);
      case 'signout':
        return AuthHelperInternal.signOut(req, res);
      default:
        return ServerError.sendNotFound(res, 'invalid action');
    }
  } catch (error) {
    return ServerError.sendInternalServerError(res);
  }
};

export default AuthHelper;

const AuthHelperInternal = {
  signUp: async (req: AuthReq, res: Response) => {},
  sendEmailVerificationMail: async (req: AuthReq, res: Response) => {},
  // from mail token
  emailVerification: async (req: AuthReq, res: Response) => {},
  signIn: async (req: AuthReq, res: Response) => {},
  handleRefreshToken: async (req: AuthReq, res: Response) => {},
  sendPasswordRecoverMail: async (req: AuthReq, res: Response) => {},
  // from mail token
  passwordRecover: async (req: AuthReq, res: Response) => {},
  passwordChange: async (req: AuthReq, res: Response) => {},
  signOut: async (req: AuthReq, res: Response) => {},
};

// Function to check if the username already exists in the database
const checkUsername = async (
  conn: PoolConnection,
  username: string
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    let result;
    try {
      result = await DB.getInstance().query<{ count: number }[]>(
        conn,
        `SELECT COUNT(*) AS count FROM ${UsersTable} WHERE username=?`,
        [username]
      );
    } catch (error) {
      reject(error);
      return;
    }
    resolve(result[0].count > 0);
  });
};

// Function to create a new username from an email address
const createUsername = async (
  conn: PoolConnection,
  email: string
): Promise<string> => {
  let username = email.split('@')[0]; // Extract the first part of the email address
  let count = 1;
  while (await checkUsername(conn, username)) {
    // Check if the username already exists in the database
    username = email.split('@')[0] + count; // Add a number to the end of the username to make it unique
    count++;
  }
  return username;
};
