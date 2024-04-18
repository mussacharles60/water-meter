require('dotenv').config();

import Console from '../utils/logcat';
import mysql from 'mysql';

export type MySQLResultType = {
  fieldCount?: number;
  affectedRows: number;
  insertId?: number;
  serverStatus?: number;
  warningCount?: number;
  message?: string;
  protocol41?: boolean;
  changedRows?: number;
};

export default class DB {
  private static instance: DB;

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  private conn: mysql.Pool;

  private constructor() {
    Console.debug(
      '[DB]: creating new connection... ------------------------------'
    );
    this.conn = mysql.createPool({
      connectionLimit: 50,
      host: process.env.AUTH_DB_HOST,
      user: process.env.AUTH_DB_USER,
      password: process.env.AUTH_DB_KEY,
      database: process.env.AUTH_DB_NAME,
      charset: 'utf8mb4',
    });
  }

  public getConnection = (): Promise<mysql.PoolConnection> => {
    return new Promise((resolve, reject) => {
      this.conn.getConnection((err, connection) => {
        if (err) {
          Console.error('[DB]: getConnection: err', err);
          reject(err);
          return;
        }
        try {
          Console.debug(
            '[DB]: getting connection: ' +
              connection.threadId +
              ' ------------------------------'
          );
          resolve(connection);
        } catch (error) {
          Console.error('[DB]: getConnection: catch', error);
        }
      });
    });
  };

  public query = <T>(
    conn: mysql.PoolConnection,
    options: string | mysql.QueryOptions,
    values: Array<string | number | boolean | any[] | null>
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      try {
        const q = conn.query(options, values, (error, result: T, fields) => {
          if (error) {
            Console.error('[DB]: query: error', error);
            reject(error);
            return;
          }
          resolve(result);
        });
        Console.debug('[DB]: executing query:', q.sql);
      } catch (error) {
        reject(error);
      }
    });
  };

  public releaseConnection = (pool: mysql.PoolConnection) => {
    if (pool) {
      Console.debug(
        '[DB]: releasing connection: ' +
          pool.threadId +
          ' ------------------------------'
      );
      pool.release();
    }
  };
}
