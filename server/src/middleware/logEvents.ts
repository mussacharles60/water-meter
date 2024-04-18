import { NextFunction, Request, Response } from 'express';

import Console from '../utils/logcat';
import moment from 'moment';

const logEvents = async (message: string, fileName: string) => {
  const dateTime = moment().format('yyyy-MM-DD\tHH:mm:ss');
  Console.debug('[logEvents]: ', `${dateTime}\t${message}`);
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(
    `${
      req.headers.origin
        ? `Origin: ${req.headers.origin}`
        : req.headers.referer
        ? `Referer: ${req.headers.referer}`
        : undefined
    }\t${req.method}\t${/*req.path*/ req.url}`,
    `reqLog.txt`
  );
  Console.debug('[logger]: req.headers: ', req.headers);
  next();
};

export default logEvents;
