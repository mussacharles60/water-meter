import { NextFunction, Request, Response } from 'express';

import Console from '../utils/logcat';
import { ServerError } from '../helpers';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Console.error('[errorHandler]: ', err.message);
  // logEvents(`${req.headers.origin}\t${req.method}\t${req.url}`, `errorLog.txt`);
  res.status(500);
  if (err.message && err.message.length > 0 && err.message.startsWith('{')) {
    res.type('application/json');
    let code = 500;
    try {
      const obj = JSON.parse(err.message); // { err: }
      if (obj && obj.err && typeof obj.err.code === 'number') {
        code = obj.err.code;
      }
      res.status(code);
    } catch (error) {
      Console.error('[errorHandler]: parse: catch:', error);
    }
    res.send(err.message);
  } else {
    ServerError.sendInternalServerError(res);
  }
  next();
};

export default errorHandler;
