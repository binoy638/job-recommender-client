import type { UserType } from '@types';
import type { UserUnion } from 'store/slice/user.slice';

import { API } from './config';

export const signIn = ({
  email,
  password,
  utype,
}: {
  email: string;
  password: string;
  utype: UserType;
}) => API.post(`/auth/signin?utype=${utype}`, { email, password });

export const getLoggedInUser = async (): Promise<{
  user: UserUnion;
  utype: UserType;
}> => {
  const { data } = await API.get('/auth/current-user');
  return data;
};

export const signUp = ({
  form,
  utype,
}: {
  form: any;
  utype: UserType.EMPLOYER | UserType.JOBSEEKER;
}) => API.post(`/auth/signup?utype=${utype}`, form);
