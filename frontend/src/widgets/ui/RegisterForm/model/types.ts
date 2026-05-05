import type { IUser } from '@/app/constants/types';

export interface IRegisterUser {
  email: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  group?: null | number;
  password: string;
  password2: string;
  avatar?: File;
}

export interface IUpdateUser {
  email: string;
  first_name: string;
  last_name: string;
  avatar?: File;
}

export interface IUserResponse {
  user: IUser;
  token: string;
}

export interface IRegisterErrors {
  email?: string[] | string;
  first_name?: string[] | string;
  last_name?: string[] | string;
  patronymic?: string[] | string;
  password?: string[] | string;
  password2?: string[] | string;
  avatar?: File;
}
