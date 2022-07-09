import { Pagination, Table } from '@mantine/core';
import type { Skill } from '@types';
import { UserType } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import GeneralAPI from '@/API/generalAPI';
import SkillForm from '@/components/forms/SkillForm';
import AdminLayout from '@/layouts/AdminLayout';
import { requireAuthentication } from '@/utils';

const fetchSkills = async (page: number, limit: number) => {
  const { data } = await GeneralAPI.getSkills(page, limit);
  return data;
};

const AdminSkills = ({ skills }: { skills: Skill[] }) => {
  const [page, setPage] = useState(1);

  const { data } = useQuery(['skills', page], () => fetchSkills(page, 20), {
    initialData: skills,
  });

  const rows = useMemo(() => {
    return data
      ? data.map((skill, index) => (
          <tr key={skill._id}>
            <td>{index + 1}</td>
            <td>{skill.name}</td>
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
            <th>Skill</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination page={page} onChange={setPage} total={10} />
      <SkillForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.ADMIN,
  async () => {
    try {
      const skills = await fetchSkills(1, 20);
      return {
        props: {
          skills,
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

AdminSkills.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminSkills;
