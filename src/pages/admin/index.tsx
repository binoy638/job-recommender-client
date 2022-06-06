import { UserType } from '@types';
import { useRouter } from 'next/router';

import useUser from '@/hooks/useUser';

const AdminDashboard = () => {
  const { isError, isLoading, user } = useUser();

  const router = useRouter();

  if (isLoading) return <div>Loading</div>;

  if (!user || user.utype !== UserType.ADMIN || isError)
    router.push('/admin/login');

  return <div>{user?.id}</div>;
};

export default AdminDashboard;
