import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

import AuthAPI from '@/API/authAPI';

export class Utils {
  static redirect = (url: string) => {
    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  };

  static getUserLoginUrl = (utype: UserType) => {
    let redirectUrl = '/signin/jobseeker';
    if (utype === UserType.ADMIN) redirectUrl = '/admin/login';
    if (utype === UserType.EMPLOYER) redirectUrl = '/signin/employer';
    return redirectUrl;
  };
}

export const requireAuthentication = (
  userType: UserType,
  gssp: GetServerSideProps
) => {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      //* fetch the user session and check if it matches the requested page's user type
      const { data } = await AuthAPI.getSession(
        ctx.req.headers as AxiosRequestHeaders
      );
      const sessionUserType = data.session.utype;
      if (sessionUserType !== userType) {
        return Utils.redirect(Utils.getUserLoginUrl(userType));
      }
      return await gssp(ctx);
    } catch (error) {
      //* if there is no session, redirect to the login page
      return Utils.redirect(Utils.getUserLoginUrl(userType));
    }
  };
};
