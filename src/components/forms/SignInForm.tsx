import { KeyIcon, UserIcon } from '@heroicons/react/solid';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import type { UserType } from '@types';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { z } from 'zod';

import { signIn } from '@/API/authAPI';

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password should have at least 8 characters' }),
});

interface SignInFormProps {
  userType: UserType;
}

const SignInForm: FC<SignInFormProps> = ({ userType }) => {
  const [error, setError] = useState<string>();
  const form = useForm({
    schema: zodResolver(signInFormSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const { mutate } = useMutation(signIn, {
    onSuccess: () => {
      router.push('/');
    },
    onError: (err: AxiosError) => {
      if (err && err?.response?.status === 401) {
        setError('Invalid credentials');
        return;
      }
      setError('Oh no, something went wrong.');
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    mutate({ ...values, utype: userType });
  };

  return (
    <form
      className="flex w-full flex-col gap-5"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput
        required
        placeholder="Email"
        {...form.getInputProps('email')}
        icon={<UserIcon className="h-5 w-5" />}
      />
      <PasswordInput
        required
        placeholder="Password"
        {...form.getInputProps('password')}
        icon={<KeyIcon className="h-5 w-5" />}
      />
      {error && <small className="text-red-500">{error}</small>}
      <Button radius={'lg'} type="submit">
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
