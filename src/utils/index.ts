import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

export class Utils {
  static redirect = (url: string) => {
    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  };
}

export const requireAuthentication = (gssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = ctx.req.headers.cookie;
    if (!cookies) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }
    return gssp(ctx);
  };
};

export const requireAdminAuthentication = (gssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = ctx.req.headers.cookie;
    if (!cookies) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }
    return gssp(ctx);
  };
};
