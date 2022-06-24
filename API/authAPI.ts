import type { UserType } from '@types';

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
  id: string;
  utype: UserType;
}> => {
  const { data } = await API.get('/auth/current-user');
  if (data && data.currentUser) return data.currentUser;
  throw new Error('Something went wrong');
};

export const signUp = ({
  form,
  utype,
}: {
  form: any;
  utype: UserType.EMPLOYER | UserType.JOBSEEKER;
}) => API.post(`/auth/signup?utype=${utype}`, form);
