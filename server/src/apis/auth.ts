import AuthHelper from '../helpers/authHelper';
import ResponseCodes from '.';
import { ServerError } from '../helpers';
import express from 'express';

const authRouter = express.Router();

authRouter
  .route('/')
  .get((req, res) => {
    res.type('application/json');
    ServerError.sendNotFound(res, 'unknown');
  })
  .post((req, res) => {
    res.type('application/json');
    AuthHelper(req, res);
  })
  .options((req, res) => {
    res.sendStatus(ResponseCodes.Success.NO_CONTENT);
  });

export default authRouter;
