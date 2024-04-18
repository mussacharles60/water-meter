import ActivityHelper from '../helpers/activityHelper';
import ResponseCodes from '.';
import { ServerError } from '../helpers';
import express from 'express';

const activityRouter = express.Router();

activityRouter
  .route('/')
  .get((req, res) => {
    res.type('application/json');
    ServerError.sendNotFound(res, 'unknown');
  })
  .post((req, res) => {
    res.type('application/json');
    ActivityHelper(req, res);
  })
  .options((req, res) => {
    res.sendStatus(ResponseCodes.Success.NO_CONTENT);
  });

export default activityRouter;
