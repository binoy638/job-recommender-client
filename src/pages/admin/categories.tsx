/* eslint-disable no-underscore-dangle */
import { Table, Title } from '@mantine/core';
import type { JobCategory } from '@types';
import { UserType } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';

import GeneralAPI from '@/API/generalAPI';
import CategoryForm from '@/components/forms/CategoryForm';
import AdminLayout from '@/layouts/AdminLayout';
import { requireAuthentication } from '@/utils';

const fetchJobCategories = async () => {
  const { data } = await GeneralAPI.getJobCategories();
  return data;
};

const AdminJobCategories = ({ categories }: { categories: JobCategory[] }) => {
  const { data } = useQuery('categories', fetchJobCategories, {
    initialData: categories,
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

  return (
    <div className="flex flex-col gap-4">
      <Title order={3}>Category List</Title>

      <CategoryForm />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

AdminJobCategories.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.ADMIN,
  async () => {
    try {
      const categories = await fetchJobCategories();
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
  }
);

export default AdminJobCategories;
