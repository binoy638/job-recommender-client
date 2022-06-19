import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { Table } from '@mantine/core';
import type { EmployerAttrs } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next/types';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import AdminPanelLayout from '@/layouts/AdminPanelLayout';

import * as AdminAPI from '../../../API/adminAPI';

const AdminEmployer = ({ employers }: { employers: EmployerAttrs[] }) => {
  const { data } = useQuery('employers', () => AdminAPI.getEmployers(), {
    initialData: employers,
  });

  const rows = useMemo(() => {
    return data
      ? data.map((employer) => (
          <tr key={employer.id}>
            <td>{employer.id}</td>
            <td>{employer.email}</td>
            <td>
              {employer.firstName} {employer.lastName}
            </td>
            <td>{employer.phone}</td>
            <td>{employer.company.name}</td>
            <td>
              {employer.isVerified ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <XIcon className="h-5 w-5 text-red-500" />
              )}
            </td>
          </tr>
        ))
      : [];
  }, [data]);

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

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
    const employers = await AdminAPI.getEmployers(
      req.headers as AxiosRequestHeaders
    );
    return {
      props: {
        employers,
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

AdminEmployer.getLayout = (page: ReactElement) => (
  <AdminPanelLayout>{page}</AdminPanelLayout>
);

export default AdminEmployer;
