/* eslint-disable no-underscore-dangle */
import { Table } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';

import AdminPanelLayout from '@/layouts/AdminPanelLayout';

import * as API from '../../../API/generalAPI';

interface JobCategories {
  _id: string;
  name: string;
}

const AdminJobCategories = ({
  categories,
}: {
  categories: JobCategories[];
}) => {
  const rows = categories.map((category, index) => (
    <tr key={category._id}>
      <td>{index + 1}</td>
      <td>{category.name}</td>
    </tr>
  ));
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
    const { data } = await API.getJobCategories();
    return {
      props: {
        categories: data,
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
