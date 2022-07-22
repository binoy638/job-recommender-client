/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { UserType } from '@types';
import AuthAPI from 'API/authAPI';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const { mutate } = useMutation(AuthAPI.signIn, {
    onSuccess: () => {
      router.push('/admin/employers');
    },
    onError: (err: AxiosError) => {
      if (err) {
        err.response?.status === 401
          ? setError('Invalid username or password')
          : setError('Something went wrong');
      } else {
        setError('Something went wrong');
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email, password, utype: UserType.ADMIN });
  };

  return (
    <div className=" flex h-screen items-center justify-center ">
      <form onSubmit={handleSubmit} className="w-96">
        <TextInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          required
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          required
        />
        {error && <p className="mt-4 w-full text-sm text-red-500">{error}</p>}
        <Button type="submit" className="mt-4">
          Login
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
