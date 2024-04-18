import { Request, Response } from 'express';

import { UserSchema } from '../../models/user.model';

const DataHelper = {
  getDeviceData: async (req: Request, res: Response, user: UserSchema) => {},
  getDevicesData: async (req: Request, res: Response, user: UserSchema) => {},
  getUsersData: async (req: Request, res: Response, user: UserSchema) => {},
  getUsersBySearchTerm: async (
    req: Request,
    res: Response,
    user: UserSchema
  ) => {},
  getDevicePaymentHistoriesData: async (
    req: Request,
    res: Response,
    user: UserSchema
  ) => {},
  getDevicePaymentHistoryData: async (
    req: Request,
    res: Response,
    user: UserSchema
  ) => {},
};

export default DataHelper;
