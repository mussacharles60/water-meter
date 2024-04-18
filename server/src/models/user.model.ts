// TABLE users
export const UsersTable = 'users';
export type UserSchema = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  password_hash: string;
  refresh_token: string | null;
  password_recover_token: string | null;
  auth_session_id: string | null;
  created_at: number;
  updated_at: number;
  profile_photos: string | null;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  created_at: number;
  updated_at: number;
};

export type Author = {
  id: string;
  name?: string | null;
  username?: string | null;
};

export type UserSearch = {
  id: string;
  name: string;
  username: string;
  created_at: number;
  updated_at: number;
};
