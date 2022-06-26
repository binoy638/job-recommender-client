import { Button, PasswordInput, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { FC } from 'react';
import React from 'react';

interface AccountCreationFormProps {
  form: UseFormReturnType<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const AccountCreationForm: FC<AccountCreationFormProps> = ({
  form,
  setActiveStep,
}) => {
  const handleSubmit = () => {
    setActiveStep(1);
  };

  return (
    <form
      className="flex w-full flex-col gap-4 "
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <div className="flex w-full flex-col justify-between gap-4  lg:flex-row">
        <TextInput
          style={{ width: '100%' }}
          label="First Name"
          {...form.getInputProps('firstName')}
          required
        />
        <TextInput
          style={{ width: '100%' }}
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
      <Button radius={'xl'} type="submit">
        Next
      </Button>
    </form>
  );
};

export default AccountCreationForm;
