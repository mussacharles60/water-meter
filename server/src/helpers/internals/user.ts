import { Request, Response } from 'express';

import { UserSchema } from '../../models/user.model';

const UserHelper = {
  addUser: async (req: Request, res: Response, user: UserSchema) => {},
  updateUserRole: async (req: Request, res: Response, user: UserSchema) => {},
  updateUserActiveAt: async (
    req: Request,
    res: Response,
    user: UserSchema
  ) => {},
  removeUser: async (req: Request, res: Response, user: UserSchema) => {},
};

export default UserHelper;
