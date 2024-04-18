require('dotenv').config();

import DB from '../service/databaseHelper';
import { DevicePaymentHistoriesTable } from './../models/device.model';
import { PoolConnection } from 'mysql';
import { UsersTable } from '../models/user.model';
import crypto from 'crypto';

// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

type IdType =
  | 'user'
  // | 'device'
  | 'payment_history'
  | 'auth_session';

const ServerUtil = {
  __generateId: (length: number) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  },
  // Function to generate a random string
  _generateId: (length: number): string => {
    // return crypto.randomBytes(Math.ceil(length / 2))
    //   .toString('hex')
    //   .slice(0, length);
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const index = crypto.randomInt(0, chars.length);
      result += chars.charAt(index);
    }
    return result;
  },
  // Function to generate a random string
  _generateTransactionId: (length: number): string => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const index = crypto.randomInt(0, chars.length);
      result += chars.charAt(index);
    }
    return result;
  },
  generate: {
    id: async (conn: PoolConnection, type: IdType): Promise<string> => {
      let id = '';
      switch (type) {
        case 'user':
          id = ServerUtil.__generateId(32);
          break;
        case 'auth_session':
          id = ServerUtil.__generateId(24);
          break;
        case 'payment_history':
          id = ServerUtil.__generateId(20);
          break;
      }
      if (type !== 'auth_session') {
        let count = 1;
        while (await checkId(conn, id, type)) {
          // Check if the id already exists in the database
          id = id + count; // Add a number to the end of the id to make it unique
          count++;
        }
      }
      return id;
    },
  },
  waitFor: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export default ServerUtil;

// Function to check if the id already exists in the database
const checkId = async (
  conn: PoolConnection,
  id: string,
  type: IdType
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    let result;
    try {
      switch (type) {
        case 'user':
          result = await DB.getInstance().query<{ count: number }[]>(
            conn,
            `SELECT COUNT(*) AS count FROM ${UsersTable} WHERE id=?`,
            [id]
          );
          break;
        case 'payment_history':
          result = await DB.getInstance().query<{ count: number }[]>(
            conn,
            `SELECT COUNT(*) AS count FROM ${DevicePaymentHistoriesTable} WHERE id=?`,
            [id]
          );
          break;
      }
    } catch (error) {
      reject(error);
      return;
    }
    resolve(result[0].count > 0);
  });
};
