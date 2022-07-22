import { CheckIcon } from '@heroicons/react/solid';
import { Button, Pagination, Select, Table, Title } from '@mantine/core';
import type { Employer } from '@types';
import { UserType } from '@types';
import AdminAPI, { EmployerFilter } from 'API/adminAPI';
import type { AxiosRequestHeaders } from 'axios';
import axios from 'axios';
import type { GetServerSideProps } from 'next/types';
import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import AdminLayout from '@/layouts/AdminLayout';
import { requireAuthentication, Utils } from '@/utils';

const fetchEmployers = async (
  page: number,
  limit: number,
  filter: EmployerFilter
) => {
  const { data } = await AdminAPI.getEmployers({ page, limit, filter });
  return data;
};

const AdminEmployer = ({
  employers,
  count,
}: {
  employers: Employer[];
  count: number;
}) => {
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState<EmployerFilter>(EmployerFilter.ALL);

  const { data } = useQuery(
    ['employers', page, filter],
    () => fetchEmployers(page, 20, filter),
    {
      initialData: { employers, count },
    }
  );
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
      ? data.employers.map((employer) => (
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

  if (!data) return null;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        <Title order={3}>Employers List</Title>
        <Select
          style={{ width: '30%' }}
          label="Filter"
          data={[
            { value: EmployerFilter.ALL, label: 'All' },
            { value: EmployerFilter.VERIFIED, label: 'Verfied' },
            { value: EmployerFilter.UNVERIFIED, label: 'Not Verified' },
          ]}
          onChange={(val) => {
            setFilter(val as EmployerFilter);
          }}
          value={filter}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
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
        <Pagination
          color="teal"
          page={page}
          onChange={setPage}
          total={Math.ceil(data.count / 20)}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.ADMIN,
  async ({ req }) => {
    try {
      const {
        data: { employers, count },
      } = await AdminAPI.getEmployers(
        { page: 1, limit: 20, filter: EmployerFilter.VERIFIED },
        req.headers as AxiosRequestHeaders
      );
      return {
        props: {
          employers,
          count,
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
