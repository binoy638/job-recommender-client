import { Button, Loader, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import AdminAPI from '@/API/adminAPI';

const CategoryForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(AdminAPI.addCategory, {
    onSuccess: () => {
      form.setFieldValue('name', '');
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
    mutate({ name: values.name });
  };

  return (
    <form
      className="mb-10 flex w-1/4 gap-2"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput
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

export default CategoryForm;
