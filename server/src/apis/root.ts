import ResponseCodes from './index';
import express from 'express';

const rootRouter = express.Router();

rootRouter
  .route('/')
  .get((req, res) => {
    res.status(ResponseCodes.Success.OK);
    res.type('application/json');
    res.send(
      JSON.stringify({
        mys: {
          code: 200,
          msg: 'Myssa - IoT Cloud server is running.',
        },
      })
    );
  })
  .post((req, res) => {
    res.status(ResponseCodes.Success.OK);
    res.type('application/json');
    res.send(
      JSON.stringify({
        mys: {
          code: 200,
          msg: 'Myssa - IoT Cloud server is running.',
        },
      })
    );
  });

export default rootRouter;
