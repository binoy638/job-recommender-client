import { Button, Text, useMantineColorScheme } from '@mantine/core';
import { UserType } from '@types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC, ReactElement } from 'react';
import React from 'react';

import EmployerSvg from '@/components/Svg/EmployerSvg';
import JobSeekerSvg from '@/components/Svg/JobSeekerSvg';
import AuthContainer from '@/components/UI/AuthContainer';
import Layout from '@/layouts/BasicLayout';

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
  const router = useRouter();
  const [userType, setUserType] = React.useState<UserType>();

  const selectHandler = (utype: UserType) => {
    setUserType(utype);
  };

  const buttonHandler = () => {
    if (userType === UserType.EMPLOYER) {
      router.push('/signup/employer');
    }

    if (userType === UserType.JOBSEEKER) {
      router.push('/signup/jobseeker');
    }
  };

  return (
    <AuthContainer className="lg:mx-60">
      <div className="flex flex-col  items-center justify-center gap-8 p-2 lg:px-16 lg:py-10">
        <span className=" flex items-center justify-center text-xl lg:text-xl   ">
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
          <Button
            onClick={buttonHandler}
            style={{ width: '60%' }}
            radius={'xl'}
            color={'green'}
          >
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
    </AuthContainer>
  );
};

SignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default SignUp;
