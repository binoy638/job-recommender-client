import type { UserType } from '@types';
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
  }) => API.post(`/auth/signin?utype=${utype}`, { email, password });

  static getLoggedInUser = (): Promise<{
    user: UserUnion;
    utype: UserType;
  }> => API.get('/auth/current-user');

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
