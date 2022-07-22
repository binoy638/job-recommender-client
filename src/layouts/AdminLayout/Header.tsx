import { LogoutIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';
import {
  ActionIcon,
  Burger,
  Header as HeaderComp,
  MediaQuery,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import router from 'next/router';
import type { FC } from 'react';
import { useTypedDispatch } from 'store';
import { clearUser } from 'store/slice/user.slice';

import AuthAPI from '@/API/authAPI';

interface HeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ opened, setOpened }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const dispatch = useTypedDispatch();
  const handleLogout = () => {
    AuthAPI.signOut().then(() => {
      router.push('/');
      dispatch(clearUser());
    });
  };
  return (
    <HeaderComp height={60} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            // color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <div className="flex  h-full w-full  justify-between ">
          <Link href={'/'}>
            <span className="cursor-pointer text-2xl  font-bold text-green-600   hover:opacity-90">
              JobFinder
            </span>
          </Link>
          <span className="flex cursor-pointer items-center justify-center">
            <ActionIcon
              variant="outline"
              mr={30}
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? (
                <SunIcon style={{ height: '20px', width: '20x' }} />
              ) : (
                <MoonIcon
                  color="black"
                  style={{ height: '20px', width: '20x' }}
                />
              )}
            </ActionIcon>
            <div
              className="flex cursor-pointer items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <Text>Log out</Text>
              <LogoutIcon className="h-5 w-5" />
            </div>
          </span>
        </div>
        {/* <Text className="font-balsamiqSans">Application header</Text> */}
      </div>
    </HeaderComp>
  );
};

export default Header;
