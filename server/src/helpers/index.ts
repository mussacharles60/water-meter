import { AuthErrorTypes, AuthResponseType } from '../models/auth.model';

import { Response } from 'express';
import ResponseCodes from '../apis';

export const ServerError = {
  sendInternalServerError: (res: Response, reason?: AuthErrorTypes) => {
    let resp: AuthResponseType;
    if (reason) {
      resp = {
        err: {
          code: ResponseCodes.ServerError.INTERNAL_SERVER_ERROR,
          msg: 'internal server error',
          why: reason,
        },
      };
    } else {
      resp = {
        err: {
          code: ResponseCodes.ServerError.INTERNAL_SERVER_ERROR,
          msg: 'internal server error',
        },
      };
    }
    return res
      .status(ResponseCodes.ServerError.INTERNAL_SERVER_ERROR)
      .send(JSON.stringify(resp));
  },
  sendUnauthorized: (
    res: Response,
    message: string,
    reason?: AuthErrorTypes
  ) => {
    let resp: AuthResponseType;
    if (reason) {
      resp = {
        err: {
          code: ResponseCodes.ClientError.UNAUTHORIZED,
          msg: message,
          why: reason,
        },
      };
    } else {
      resp = {
        err: {
          code: ResponseCodes.ClientError.UNAUTHORIZED,
          msg: message,
        },
      };
    }
    return res
      .status(ResponseCodes.ClientError.UNAUTHORIZED)
      .send(JSON.stringify(resp)); // unauthorized
  },
  sendConflict: (res: Response, message: string, reason?: AuthErrorTypes) => {
    let resp: AuthResponseType;
    if (reason) {
      resp = {
        err: {
          code: ResponseCodes.ClientError.CONFLICT,
          msg: message,
          why: reason,
        },
      };
    } else {
      resp = {
        err: {
          code: ResponseCodes.ClientError.CONFLICT,
          msg: message,
        },
      };
    }
    return res
      .status(ResponseCodes.ClientError.CONFLICT)
      .send(JSON.stringify(resp)); // conflict
  },
  sendForbidden: (res: Response, message: string, reason?: AuthErrorTypes) => {
    let resp: AuthResponseType;
    if (reason) {
      resp = {
        err: {
          code: ResponseCodes.ClientError.FORBIDDEN,
          msg: message,
          why: reason,
        },
      };
    } else {
      resp = {
        err: {
          code: ResponseCodes.ClientError.FORBIDDEN,
          msg: message,
        },
      };
    }
    return res
      .status(ResponseCodes.ClientError.FORBIDDEN)
      .send(JSON.stringify(resp)); // forbidden
  },
  sendNotFound: (res: Response, message: string, reason?: AuthErrorTypes) => {
    let resp: AuthResponseType;
    if (reason) {
      resp = {
        err: {
          code: ResponseCodes.ClientError.NOT_FOUND,
          msg: message,
          why: reason,
        },
      };
    } else {
      resp = {
        err: {
          code: ResponseCodes.ClientError.NOT_FOUND,
          msg: message,
        },
      };
    }
    return res
      .status(ResponseCodes.ClientError.NOT_FOUND)
      .send(JSON.stringify(resp)); // not found
  },
};
