import AuthUserHelper from '../helpers/authUserHelper';
import ResponseCodes from '.';
import { ServerError } from '../helpers';
import express from 'express';

const userRouter = express.Router();

userRouter
  .route('/')
  .get((req, res) => {
    res.type('application/json');
    ServerError.sendNotFound(res, 'unknown');
  })
  .post((req, res) => {
    res.type('application/json');
    AuthUserHelper(req, res);
  })
  .options((req, res) => {
    res.sendStatus(ResponseCodes.Success.NO_CONTENT);
  });

export default userRouter;
