import { PasswordInput, TextInput } from '@mantine/core';
import React from 'react';

const CreateAccountForm = () => {
  return (
    <form className="flex w-full flex-col gap-4 px-10 lg:max-w-sm lg:px-0">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <TextInput label="First Name" />
        <TextInput label="Last Name" />
      </div>

      <TextInput label="Email" />
      <TextInput label="Phone Number" />
      <PasswordInput label="Password" />
      <PasswordInput label="Confirm Password" />
    </form>
  );
};

export default CreateAccountForm;
