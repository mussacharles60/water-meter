import { Device } from './device.model';
import { User } from './user.model';

export type TokenPayload = {
  user_id: string;
  auth_session_id?: string;
  iat?: number;
  exp?: number;
};

export type AuthResponse = {
  access_token?: string;
  token_type?: string;
  user?: User;
  password_recover_status?:
    | 'mail_sent'
    | 'mail_not_sent'
    | 'password_changed'
    | 'password_not_changed';
  password_change_status?: 'password_changed' | 'password_not_changed';
};

export type AuthResponseType = {
  mys?: {
    code: number;
    msg?: string;
    data?: AuthResponse;
  };
  err?: {
    code: number;
    msg: string;
    why?: AuthErrorTypes;
  };
};

export type AuthErrorTypes =
  | 'invalid_credentials'
  | 'session_expired'
  | 'token_expired';

export type UserResponse = {
  user: User;
  devices?: Device[];
};

export type UserResponseType = {
  mys?: {
    code: number;
    msg?: string;
    data?: UserResponse;
  };
  err?: {
    code: number;
    msg: string;
    why?: AuthErrorTypes;
  };
};
