/* eslint-disable no-underscore-dangle */
import { Table } from '@mantine/core';
import type { JobCategories } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';

import * as API from '@/API/generalAPI';
import AddCategoryForm from '@/components/forms/AddCategoryForm';
import AdminPanelLayout from '@/layouts/AdminPanelLayout';

const AdminJobCategories = ({
  categories,
}: {
  categories: JobCategories[];
}) => {
  const { data } = useQuery('categories', API.getJobCategories, {
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
      <AddCategoryForm />
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
