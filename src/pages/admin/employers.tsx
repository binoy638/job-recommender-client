import { CheckIcon } from '@heroicons/react/solid';
import { Button, Table } from '@mantine/core';
import type { Employer } from '@types';
import { UserType } from '@types';
import AdminAPI from 'API/adminAPI';
import type { AxiosRequestHeaders } from 'axios';
import axios from 'axios';
import type { GetServerSideProps } from 'next/types';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import AdminLayout from '@/layouts/AdminLayout';
import { requireAuthentication, Utils } from '@/utils';

const fetchEmployers = async () => {
  const { data } = await AdminAPI.getEmployers();
  return data;
};

const AdminEmployer = ({ employers }: { employers: Employer[] }) => {
  const { data } = useQuery('employers', fetchEmployers, {
    initialData: employers,
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation(AdminAPI.verifyEmployer, {
    onSuccess: () => {
      queryClient.invalidateQueries('employers');
    },
  });

  const verifyHandler = async (id: string) => {
    mutate(id);
  };

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
                <Button onClick={() => verifyHandler(employer.id)}>
                  Verify
                </Button>
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

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.ADMIN,
  async ({ req }) => {
    try {
      const { data } = await AdminAPI.getEmployers(
        req.headers as AxiosRequestHeaders
      );
      return {
        props: {
          employers: data,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return Utils.redirect('/admin/login');
        }
      }
      return Utils.redirect('/500');
    }
  }
);
AdminEmployer.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminEmployer;
