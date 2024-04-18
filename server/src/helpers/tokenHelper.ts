require('dotenv').config();

import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import Console from '../utils/logcat';
import DB from '../service/databaseHelper';
import { PoolConnection } from 'mysql';
import { ServerError } from '.';
import { TokenPayload } from '../models/auth.model';
import { UserSchema } from '../models/user.model';

const TokenHelper = {
  getUser: async (req: Request, res: Response): Promise<UserSchema | null> => {
    let payload: TokenPayload;
    try {
      payload = await TokenHelper.verifyAccessToken(req);
    } catch (error) {
      ServerError.sendUnauthorized(res, 'unauthorized', 'invalid_credentials');
      return null;
    }
    // Console.debug('[TokenHelper]: getUser: accessToken: payload', payload);

    if (!payload || !payload.user_id) {
      ServerError.sendUnauthorized(res, 'unauthorized', 'invalid_credentials');
      return null;
    }

    let conn: PoolConnection;
    try {
      conn = await DB.getInstance().getConnection();
    } catch (error) {
      Console.error('[TokenHelper]: getUser: getConnection: error', error);
      ServerError.sendInternalServerError(res);
      return null;
    }

    let result;
    try {
      result = await DB.getInstance().query<UserSchema[]>(
        conn,
        `SELECT * FROM users WHERE id=?`,
        [payload.user_id]
      );
    } catch (error) {
      DB.getInstance().releaseConnection(conn);
      ServerError.sendInternalServerError(res);
      return null;
    }
    if (!result || result.length === 0) {
      DB.getInstance().releaseConnection(conn);
      ServerError.sendUnauthorized(res, 'unauthorized', 'invalid_credentials');
      return null;
    }

    DB.getInstance().releaseConnection(conn);

    const user: UserSchema = result[0];

    if (!payload || !payload.user_id || payload.user_id !== user.id) {
      ServerError.sendUnauthorized(res, 'unauthorized', 'invalid_credentials');
      return null;
    }
    if (!payload.auth_session_id || !user.auth_session_id) {
      ServerError.sendUnauthorized(res, 'unauthorized', 'session_expired');
      return null;
    }
    if (
      typeof payload.auth_session_id === 'string' &&
      typeof user.auth_session_id === 'string' &&
      payload.auth_session_id !== user.auth_session_id
    ) {
      ServerError.sendUnauthorized(res, 'unauthorized', 'session_expired');
      return null;
    }

    return user;
  },
  getAccessToken: (payload: TokenPayload) => {
    return sign(payload, process.env.AUTH_ACCESS_TOKEN_SECRET as string, {
      header: {
        alg: 'HS256',
      },
      expiresIn: '1d', // short period token
    });
  },
  getRefreshToken: (payload: TokenPayload) => {
    return sign(payload, process.env.AUTH_REFRESH_TOKEN_SECRET as string, {
      header: {
        alg: 'HS256',
      },
      expiresIn: '30d', // long period token
    });
  },
  verifyAccessToken: (req: Request): Promise<TokenPayload> => {
    return new Promise((resolve, reject) => {
      const bearerHeader = req.headers.authorization as string;
      if (
        typeof bearerHeader !== undefined &&
        bearerHeader.startsWith('Bearer ')
      ) {
        const bearer: string[] = bearerHeader.split(' ');
        const bearerToken: string = bearer[1];
        // req.token = bearerToken;

        verify(
          bearerToken,
          process.env.AUTH_ACCESS_TOKEN_SECRET as string,
          (err, decoded: any /*: TokenPayload*/) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          }
        );
      } else {
        // res.sendSTatus(403);
        // res.send(JSON.stringify({
        //   error: {
        //     code: 403,
        //     message: 'unauthorized',
        //   }
        // }));
        reject();
      }
    });
  },
  verifyRefreshToken: (token: string): Promise<TokenPayload> => {
    return new Promise((resolve, reject) => {
      if (token) {
        verify(
          token,
          process.env.AUTH_REFRESH_TOKEN_SECRET as string,
          (err, decoded: any /*: TokenPayload*/) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          }
        );
      } else {
        reject(new Error('invalid_credentials'));
      }
    });
  },
  getPasswordRecoverToken: (payload: TokenPayload) => {
    return sign(payload, process.env.AUTH_PASSWORD_RECOVER_TOKEN as string, {
      header: {
        alg: 'HS256',
      },
      expiresIn: 5 * 60, // 5 minutes in seconds
    });
  },
  verifyPasswordRecoverToken: (token: string): Promise<TokenPayload> => {
    return new Promise((resolve, reject) => {
      if (token) {
        verify(
          token,
          process.env.AUTH_PASSWORD_RECOVER_TOKEN as string,
          (err, decoded: any /*: TokenPayload*/) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          }
        );
      } else {
        reject(new Error('invalid_credentials'));
      }
    });
  },
};

export default TokenHelper;
