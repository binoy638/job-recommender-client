import { Button, Input, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import * as AdminAPI from '@/API/adminAPI';

const CategoryCreationForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(AdminAPI.addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
    onError: (err: AxiosError) => {
      if (err && err?.response?.status === 422) {
        form.setErrors({ name: 'Category already exists' });
        return;
      }
      form.setErrors({ name: 'Something went wrong' });
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    mutate(values.name);
  };

  return (
    <form
      className="flex w-1/4 flex-col gap-2"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Input
        required
        placeholder="Category Name"
        {...form.getInputProps('name')}
      />
      {form.errors && form.errors.name && (
        <small className="text-red-500">{form.errors.name}</small>
      )}
      <div>
        <Button rightIcon={isLoading && <Loader />} type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};

export default CategoryCreationForm;
