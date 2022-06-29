import type { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { UserUnion } from 'store/slice/user.slice';

import { API } from './config';

class AuthAPI {
  static signIn = ({
    email,
    password,
    utype,
  }: {
    email: string;
    password: string;
    utype: UserType;
  }) =>
    API.post<{
      user: UserUnion;
      type: UserType;
    }>(`/auth/signin?utype=${utype}`, { email, password });

  static getLoggedInUser = (headers?: AxiosRequestHeaders) =>
    API.get<{
      user: UserUnion;
      type: UserType;
    }>('/auth/current-user', { headers });

  static signUp = ({
    form,
    utype,
  }: {
    form: any;
    utype: UserType.EMPLOYER | UserType.JOBSEEKER;
  }) => API.post(`/auth/signup?utype=${utype}`, form);

  static signOut = () => API.post('/auth/signout');
}

export default AuthAPI;
