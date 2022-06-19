/* eslint-disable no-underscore-dangle */
import { Button, Input, Loader, Table } from '@mantine/core';
import type { JobCategories } from '@types';
import type { AxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import AdminPanelLayout from '@/layouts/AdminPanelLayout';

import * as AdminAPI from '../../../API/adminAPI';
import * as API from '../../../API/generalAPI';

const AdminJobCategories = ({
  categories,
}: {
  categories: JobCategories[];
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');

  const [error, setError] = useState('');

  const { data, refetch } = useQuery('categories', API.getJobCategories, {
    initialData: categories,
  });

  const { mutate, isLoading } = useMutation(AdminAPI.addCategory, {
    onSuccess: () => {
      refetch();
    },
    onError: (err: AxiosError) => {
      if (err && err?.response?.status === 422) {
        setError('Category already exists');
      } else {
        setError('Something went wrong');
      }
    },
  });

  const rows = useMemo(() => {
    return data
      ? data.map((category, index) => (
          <tr key={category._id}>
            <td>{index + 1}</td>
            <td>{category.name}</td>
          </tr>
        ))
      : [];
  }, [data]);

  const addCategoryHandler = () => {
    setError('');
    if (!newCategoryName) return;
    mutate(newCategoryName);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <div className="mt-4 flex w-1/4 gap-4">
        <Input placeholder="Category Name" onChange={inputChangeHandler} />
        <Button
          onClick={addCategoryHandler}
          rightIcon={isLoading && <Loader />}
        >
          Add
        </Button>
        {error && <small className="text-red-500">{error}</small>}
      </div>
    </div>
  );
};

AdminJobCategories.getLayout = (page: ReactElement) => (
  <AdminPanelLayout>{page}</AdminPanelLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  try {
    const categories = await API.getJobCategories();
    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

export default AdminJobCategories;
