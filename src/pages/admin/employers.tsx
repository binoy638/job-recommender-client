import { DocumentSearchIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import {
  Button,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import type { Employer } from '@types';
import { UserType } from '@types';
import AdminAPI, { EmployerFilter } from 'API/adminAPI';
import type { AxiosRequestHeaders } from 'axios';
import axios from 'axios';
import Link from 'next/link';
import type { GetServerSideProps } from 'next/types';
import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import useVerifyEmployer from '@/hooks/useVerifyEmployer';
import AdminLayout from '@/layouts/AdminLayout';
import { requireAuthentication, Utils } from '@/utils';

interface Props {
  employers: Employer[];
  count: number;
}

export type SearchFilter = {
  type: 'email' | 'name' | 'phone' | 'company' | 'id';
  q: string;
};

const fetchEmployers = async (
  page: number,
  limit: number,
  filter: EmployerFilter,
  searchFilter: SearchFilter['type'],
  searchQuery: SearchFilter['q']
) => {
  const { data } = await AdminAPI.getEmployers({
    page,
    limit,
    filter,
    searchFilter,
    searchQuery,
  });
  return data;
};

const useGetEmployers = (
  page: number,
  filter: EmployerFilter,
  initialData: Props,
  searchFilter: SearchFilter['type'],
  searchQuery: SearchFilter['q']
) => {
  return useQuery(
    ['employers', page, filter, searchFilter, searchQuery],
    () => fetchEmployers(page, 20, filter, searchFilter, searchQuery),
    {
      initialData,
    }
  );
};

const AdminEmployer = ({ employers, count }: Props) => {
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState<EmployerFilter>(EmployerFilter.ALL);
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    type: 'name',
    q: '',
  });

  const [debounced] = useDebouncedValue(searchFilter.q, 300);

  const { data, isLoading } = useGetEmployers(
    page,
    filter,
    { employers, count },
    searchFilter.type,
    debounced
  );

  const { mutate } = useVerifyEmployer('employers');

  const verifyHandler = async (id: string) => {
    mutate(id);
  };

  const rows = useMemo(() => {
    return data
      ? data.employers.map((employer) => (
          <tr key={employer.id}>
            <td>
              <Link href={`/admin/employer/${employer.id}`} passHref>
                <a>{employer.id}</a>
              </Link>
            </td>
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
                <Button
                  variant="outline"
                  onClick={() => verifyHandler(employer.id)}
                  rightIcon={<DocumentSearchIcon className="h-5 w-5" />}
                >
                  verify
                </Button>
              )}
            </td>
          </tr>
        ))
      : [];
  }, [data]);

  const handleSearchFilterQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchFilter({
      ...searchFilter,
      q: e.target.value,
    });
  };

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
            { value: EmployerFilter.VERIFIED, label: 'Verified' },
            { value: EmployerFilter.UNVERIFIED, label: 'Not Verified' },
          ]}
          onChange={(val) => {
            setFilter(val as EmployerFilter);
          }}
          value={filter}
        />
        <div className="flex flex-col">
          <Text size="sm">Search</Text>
          <div className="flex ">
            <Select
              style={{ width: '10%' }}
              data={[
                { value: 'email', label: 'Email' },
                { value: 'name', label: 'Name' },
                { value: 'phone', label: 'Phone' },
                { value: 'company', label: 'Company' },
              ]}
              onChange={(val) => {
                setSearchFilter({
                  type: val as SearchFilter['type'],
                  q: '',
                });
              }}
              value={searchFilter.type}
            />
            <TextInput
              placeholder="Enter search query"
              onChange={handleSearchFilterQueryChange}
              value={searchFilter.q}
            />
          </div>
        </div>
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
          {isLoading ? <div>Loading..</div> : <tbody>{rows}</tbody>}
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
