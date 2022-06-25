import { KeyIcon, UserIcon } from '@heroicons/react/solid';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import React from 'react';

const SignInForm = () => {
  return (
    <form className="flex w-full flex-col gap-5">
      <TextInput
        required
        placeholder="Email"
        icon={<UserIcon className="h-5 w-5" />}
      />
      <PasswordInput
        required
        placeholder="Password"
        icon={<KeyIcon className="h-5 w-5" />}
      />
      <Button radius={'lg'} type="submit">
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
