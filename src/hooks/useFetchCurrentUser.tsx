import { getLoggedInUser } from 'API/authAPI';
import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'store';
import { setUser } from 'store/slice/user.slice';

const useFetchCurrentUser = () => {
  const dispatch = useTypedDispatch();

  const { user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      getLoggedInUser()
        .then((data) => {
          dispatch(setUser({ user: data.user, type: data.utype }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
};

export default useFetchCurrentUser;
