require('dotenv').config();

import { Request, Response } from 'express';

import DataHelper from './internals/data';
import DeviceHelper from './internals/device';
import { ServerError } from '.';
import TokenHelper from './tokenHelper';
import UserHelper from './internals/user';

export interface ActivityReq extends Request {
  headers: IncomingHttpHeaders;
  cookies: any;
  body: {
    action?: UserBodyAction | DeviceBodyAction | DataBodyAction;
  } & UserBody &
    DeviceBody &
    DataBody;
}

type UserBodyAction =
  | 'add_device_user'
  | 'update_device_user_role'
  | 'update_device_user_active_at'
  | 'remove_device_user';

type UserBody = {
  // 'add_device_user'
  device_id?: string;
  user_id?: string;
  user_role?: string;

  // 'update_device_user_role'
  // device_id?: string;
  // user_id?: string;
  // user_role?: string;

  // 'update_device_user_active_at'
  // device_id?: string;
  // user_id?: string;

  // 'remove_device_user'
  // device_id?: string;
  // user_id?: string;
};

type DeviceBodyAction =
  | 'add_user_device'
  | 'update_user_device'
  | 'update_user_device_budget'
  | 'add_user_device_volume_purchase'
  | 'request_user_device_volume_purchase'
  | 'remove_user_device';

type DeviceBody = {
  // 'add_user_device'
  device_id?: string;
  device_name?: string;
  device_description?: string;
  device_budget_volume?: number;
  device_budget_period?: string;

  // 'update_user_device'
  // device_id?: string;
  // device_name?: string;
  // device_description?: string;
  // device_budget_volume?: number;
  // device_budget_period?: string;

  // 'update_user_device_budget'
  // device_id?: string;
  // device_budget_volume?: number;
  // device_budget_period?: string;

  // 'add_user_device_volume_purchase'
  // 'request_user_device_volume_purchase'
  // device_id?: string;
  device_purchase_volume?: number;

  // 'remove_user_device'
  // device_id?: string;
};

type DataBodyAction =
  | 'device_data'
  | 'devices_data'
  | 'device_users_data'
  | 'device_payment_history_data'
  | 'device_payment_histories_data'
  | 'users_data_by_search_term';

type DataBody = {
  // 'device_data'
  device_id?: string;

  // 'devices_data'

  // 'device_users_data'
  // device_id?: string;

  // 'device_payment_history_data'
  // device_id?: string;

  // 'device_payment_histories_data'
  // device_id?: string;

  // 'users_data_by_search_term';
  search_term?: string;

  start_at?: number;
  end_at?: number;
};

const ActivityHelper = async (req: Request, res: Response): Promise<any> => {
  let user = await TokenHelper.getUser(req, res);
  if (!user) {
    return;
  }

  try {
    const action: ActivityReq['body']['action'] = req.body.action;
    if (!action || typeof action !== 'string' || action.trim().length === 0) {
      return ServerError.sendForbidden(res, 'unknown action');
    }
    switch (action) {
      // device user
      case 'add_device_user':
        return UserHelper.addUser(req, res, user);
      case 'update_device_user_role':
        return UserHelper.updateUserRole(req, res, user);
      case 'update_device_user_active_at':
        return UserHelper.updateUserActiveAt(req, res, user);
      case 'remove_device_user':
        return UserHelper.removeUser(req, res, user);

      // device
      case 'add_user_device':
        return DeviceHelper.addDevice(req, res, user);
      case 'update_user_device':
        return DeviceHelper.updateDevice(req, res, user);
      case 'update_user_device_budget':
        return DeviceHelper.updateDeviceBudget(req, res, user);
      case 'add_user_device_volume_purchase':
      case 'request_user_device_volume_purchase':
        return DeviceHelper.requestDeviceVolumePurchase(req, res, user);
      case 'remove_user_device':
        return DeviceHelper.removeDevice(req, res, user);

      // data
      case 'device_data':
        return DataHelper.getDeviceData(req, res, user);
      case 'devices_data':
        return DataHelper.getDeviceData(req, res, user);
      case 'device_users_data':
        return DataHelper.getUsersData(req, res, user);
      case 'device_payment_history_data':
        return DataHelper.getDevicePaymentHistoryData(req, res, user);
      case 'device_payment_histories_data':
        return DataHelper.getDevicePaymentHistoriesData(req, res, user);
      case 'users_data_by_search_term':
        return DataHelper.getUsersBySearchTerm(req, res, user);

      default:
        return ServerError.sendNotFound(res, 'invalid action');
    }
  } catch (error) {
    return ServerError.sendInternalServerError(res);
  }
};

export default ActivityHelper;
