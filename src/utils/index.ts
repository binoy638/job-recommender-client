import type { Address } from '@types';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

import AuthAPI from '@/API/authAPI';

export class Utils {
  static monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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

  static formatDate = (date: Date | string) => {
    // eslint-disable-next-line no-param-reassign
    if (typeof date === 'string') date = new Date(date);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${Utils.monthNames[monthIndex]} ${year}`;
  };

  static formatTime = (date: Date | string) => {
    // eslint-disable-next-line no-param-reassign
    if (typeof date === 'string') date = new Date(date);

    // const day = date.getDate();
    // const monthIndex = date.getMonth();
    // const year = date.getFullYear();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  static formatWithTime = (date: Date | string) => {
    // eslint-disable-next-line no-param-reassign
    if (typeof date === 'string') date = new Date(date);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day} ${Utils.monthNames[monthIndex]} ${year} - ${hours}:${minutes}:${seconds}`;
  };

  static formatLocation = (location: Address) => {
    return `${location.city}, ${location.state}, ${location.country}`;
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
