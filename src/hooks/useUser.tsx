import type { UserType } from '@types';
import { getLoggedInUser } from 'API/authAPI';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    utype: UserType;
  } | null>(null);

  useEffect(() => {
    getLoggedInUser()
      .then((usr) => {
        setUser(usr);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);
  return { isLoading, isError, user };
};

export default useUser;
