import { AppShell } from '@mantine/core';
import type { FC } from 'react';
import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'store';
import { setUser } from 'store/slice/user.slice';

import AuthAPI from '@/API/authAPI';

import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useTypedSelector((state) => state.user);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!user) {
      AuthAPI.getLoggedInUser()
        .then((res) => {
          const { data } = res;
          dispatch(setUser(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <AppShell fixed header={<Header />}>
      <div className="flex w-full  items-center justify-center">
        <div className=" grow  items-center   py-4 lg:max-w-[65rem]">
          {children}
        </div>
      </div>
    </AppShell>
  );
};

export default Layout;
