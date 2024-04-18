import ResponseCodes from '../apis';
import allowedOrigins from './allowedOrigins';
import cors from 'cors';

const corsOptions: cors.CorsOptionsDelegate = (req, cb) => {
  const host = req.headers.host;
  if (host) {
    switch (host) {
      case process.env.SERVER_API_HOST:
        {
          const origin = req.headers.origin;
          if (origin && allowedOrigins.indexOf(origin) !== -1) {
            cb(null, getCorsOptions(true));
          } else {
            cb(
              new Error(
                JSON.stringify({
                  err: {
                    code: ResponseCodes.ClientError.UNAUTHORIZED,
                    msg: 'unauthorized',
                  },
                })
              )
            );
          }
        }
        break;
      default:
        cb(
          new Error(
            JSON.stringify({
              err: {
                code: ResponseCodes.ClientError.UNAUTHORIZED,
                msg: 'unauthorized',
              },
            })
          )
        );
        break;
    }
  } else {
    cb(
      new Error(
        JSON.stringify({
          err: {
            code: ResponseCodes.ClientError.UNAUTHORIZED,
            msg: 'unauthorized',
          },
        })
      )
    );
  }
};

const getCorsOptions = (origin: boolean): cors.CorsOptions => ({
  // origin: (origin: string, callback) => {
  //   if (allowedOrigins.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(
  //       new Error(
  //         JSON.stringify({
  //           err: {
  //             code: ResponseCodes.ClientError.UNAUTHORIZED,
  //             msg: 'unauthorized',
  //           },
  //         })
  //       )
  //     );
  //   }
  // },
  origin,
  optionsSuccessStatus: 200,
  exposedHeaders: [
    'x-app-auth-token',
  ],
});

export default corsOptions;
