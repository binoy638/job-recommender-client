import { PasswordInput, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { EmployerSignupFormValues } from '@types';
import type { FC } from 'react';
import React from 'react';

interface CreateAccountFormProps {
  form: UseFormReturnType<EmployerSignupFormValues>;
}

const CreateAccountForm: FC<CreateAccountFormProps> = ({ form }) => {
  return (
    <form className="flex w-full flex-col gap-4 px-10 lg:max-w-sm lg:px-0">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <TextInput
          label="First Name"
          {...form.getInputProps('firstName')}
          required
        />
        <TextInput
          label="Last Name"
          {...form.getInputProps('lastName')}
          required
        />
      </div>

      <TextInput label="Email" {...form.getInputProps('email')} required />
      <TextInput
        label="Phone Number"
        {...form.getInputProps('phone')}
        required
      />
      <PasswordInput
        label="Password"
        {...form.getInputProps('password')}
        required
      />
      <PasswordInput
        label="Confirm Password"
        {...form.getInputProps('confirmPassword')}
        required
      />
    </form>
  );
};

export default CreateAccountForm;
