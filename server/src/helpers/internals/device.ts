import { Request, Response } from 'express';

import { UserSchema } from '../../models/user.model';

const DeviceHelper = {
  addDevice: async (req: Request, res: Response, user: UserSchema) => {},
  updateDevice: async (req: Request, res: Response, user: UserSchema) => {},
  updateDeviceBudget: async (
    req: Request,
    res: Response,
    user: UserSchema
  ) => {},
  requestDeviceVolumePurchase: async (
    req: Request,
    res: Response,
    user: UserSchema
  ) => {},
  removeDevice: async (req: Request, res: Response, user: UserSchema) => {},
};

export default DeviceHelper;
