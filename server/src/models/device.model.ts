import { Author } from './user.model';

// TABLE devices
export const DevicesTable = 'devices';
export type DeviceSchema = {
  id: string;
  name: string;
  created_at: number;
};

// TABLE user_devices
export const UserDevicesTable = 'user_devices';
export type UserDeviceSchema = {
  id: string;
  name: string;
  description: string | null;
  current_volume: number; // litres
  budget_volume: number;
  budget_billing_period: string | null;
  budget_updated_at: number;
  created_at: number;
  updated_at: number;
  owner_id: string;
  update_author_id: string | null;
};

// TABLE device_users
export const DeviceUsersTable = 'device_users';
export type DeviceUserSchema = {
  device_id: string;
  user_id: string;
  role: 'owner' | 'user';
  created_at: number;
  updated_at: number;
  author_id: string;
};

// TABLE device_payment_histories
export const DevicePaymentHistoriesTable = 'device_payment_histories';
export type DevicePaymentHistorySchema = {
  id: string;
  device_id: string;
  user_id: string;
  purchased_volume: number; // litres
  purchased_price: number;
  purchased_currency: string;
  created_at: number;
};

export type Device = {
  id: string;
  name: string;
  status: DeviceStatus;
  created_at: number;
  updated_at: number;
  owner: Author;
  update_author: Author | null;
};

export type DeviceStatus = {
  current_volume: number; // litres
  budget: {
    volume: number;
    billing_period: 'monthly' | 'yearly' | 'none';
    updated_at: number;
  };
};

export type DevicePaymentHistory = {
  id: string;
  device: {
    id: string;
    name: string;
  };
  purchased: {
    volume: number; // litres
    price: number;
    currency: string;
  };
  transaction_id: string | null;
  created_at: number;
  author: Author;
};
