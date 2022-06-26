import { Button, Text, useMantineColorScheme } from '@mantine/core';
import { UserType } from '@types';
import Link from 'next/link';
import type { FC, ReactElement } from 'react';
import React from 'react';

import AuthContainer from '@/components/Auth/AuthContainer';
import EmployerSvg from '@/components/Svg/EmployerSvg';
import JobSeekerSvg from '@/components/Svg/JobSeekerSvg';
import Layout from '@/layouts/Layout';

interface UserOptionProps {
  onSelect: () => void;
  selected: boolean;
  text: string;
  svg: JSX.Element;
}

const UserOption: FC<UserOptionProps> = ({ selected, onSelect, text, svg }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <div
      className={`rounded w-1/2 flex flex-col justify-center items-center ${
        selected ? ' border-green-600 ' : dark && 'border-gray-700'
      } ${!dark && 'hover:bg-gray-100'}  cursor-pointer border-2  p-6 `}
      onClick={onSelect}
    >
      {svg}
      <Text>{text}</Text>
    </div>
  );
};

const SignUp = () => {
  const [userType, setUserType] = React.useState<UserType>();

  const selectHandler = (utype: UserType) => {
    setUserType(utype);
  };

  return (
    <AuthContainer className="lg:mx-60">
      <div className="flex flex-col  items-center justify-center gap-8 px-16 py-10">
        <span className=" flex items-center justify-center text-2xl ">
          Join as an Employer or JobSeeker
        </span>
        <div className="flex gap-4 ">
          <UserOption
            selected={userType === UserType.EMPLOYER}
            onSelect={() => selectHandler(UserType.EMPLOYER)}
            text={"I'm a employer, hiring for my company"}
            svg={<EmployerSvg />}
          />
          <UserOption
            selected={userType === UserType.JOBSEEKER}
            onSelect={() => selectHandler(UserType.JOBSEEKER)}
            text={"I'm a job seeker, looking for a job"}
            svg={<JobSeekerSvg />}
          />
        </div>
        {userType ? (
          <Button style={{ width: '60%' }} radius={'xl'} color={'green'}>
            Apply as a <span className="capitalize">&nbsp;{userType}</span>
          </Button>
        ) : (
          <Button style={{ width: '60%' }} radius={'xl'} disabled>
            Create Account
          </Button>
        )}
        <Text>
          Already have an account?
          <Link href="/signin">
            <a className="text-green-600">&nbsp;Log In</a>
          </Link>
        </Text>
      </div>
      {/* <Link href="/signup/employer" passHref>
        <Button>Employer</Button>
      </Link>
      <Link href="/signup/jobseeker" passHref>
        <Button>JobSeeker</Button>
      </Link> */}
    </AuthContainer>
  );
};

SignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default SignUp;
