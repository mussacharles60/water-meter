import { NextFunction, Request, Response } from 'express';

import allowedOrigins from '../config/allowedOrigins';

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host;
  if (host) {
    switch (host) {
      case process.env.SERVER_API_HOST:
        {
          const origin = req.headers.origin;
          if (origin && allowedOrigins.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Credentials', 'true');
          }
        }
        break;
      default:
        break;
    }
  }
  next();
};

export default credentials;
