import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Header as HeaderMantine,
  MediaQuery,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { UserType } from '@types';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { useTypedSelector } from 'store';

interface HeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthSection = () => {
  const { user, type } = useTypedSelector((state) => state.user);
  if (!user || type === UserType.ADMIN || !type) {
    return (
      <>
        <Link href={'/signin'} passHref>
          <Text style={{ cursor: 'pointer' }}>Log In</Text>
        </Link>
        <Link href={'/signup'}>
          <Button radius={'xl'} color="green">
            Sign Up
          </Button>
        </Link>
      </>
    );
  }

  return (
    <span className="flex cursor-pointer items-center justify-center">
      <Avatar color="cyan" radius="xl">
        {user.firstName[0]}
        {user.lastName[0]}
      </Avatar>
    </span>
  );
};

const RightSection: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <div className="flex  h-full w-full  justify-between ">
      <Link href={'/'}>
        <span className="cursor-pointer text-2xl  font-bold text-green-600   hover:opacity-90">
          JobFinder
        </span>
      </Link>
      <div className="flex items-center justify-center gap-6">
        <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? (
            <SunIcon style={{ height: '20px', width: '20x' }} />
          ) : (
            <MoonIcon color="black" style={{ height: '20px', width: '20x' }} />
          )}
        </ActionIcon>
        <AuthSection />
      </div>
    </div>
  );
};

const Header: FC<HeaderProps> = ({ opened, setOpened }) => {
  return (
    <HeaderMantine
      height={60}
      color="red"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div className="flex w-full max-w-[65rem] items-center justify-center px-4 lg:px-0">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        <RightSection />
      </div>
    </HeaderMantine>
  );
};

export default Header;
