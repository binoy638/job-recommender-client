import {
  Burger,
  Button,
  Header as HeaderMantine,
  MediaQuery,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

interface HeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

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
            // color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <div className="flex  h-full w-full  justify-between ">
          <Link href={'/'}>
            <span className="cursor-pointer text-2xl  font-bold text-green-600  hover:opacity-75">
              JobFinder
            </span>
          </Link>
          <div className="flex items-center justify-center gap-6">
            <Text>Log In</Text>
            <Button radius={'xl'} color="green">
              Sign Up
            </Button>
          </div>
          {/* <span className="flex cursor-pointer items-center justify-center">
            <Avatar color="cyan" radius="xl">
              <UserIcon className="h-5 w-5" />
            </Avatar>
          </span> */}
        </div>
      </div>

      {/* <Text className="font-balsamiqSans">Application header</Text> */}
    </HeaderMantine>
  );
};

export default Header;
