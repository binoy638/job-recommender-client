/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Admin, Employer, JobSeeker, UserType } from '@types';

export type UserUnion = Admin | Employer | JobSeeker;

type UserSlice =
  | {
      type: UserType.ADMIN;
      user: Admin;
    }
  | {
      type: UserType.EMPLOYER;
      user: Employer;
    }
  | {
      type: UserType.JOBSEEKER;
      user: JobSeeker;
    }
  | {
      type: null;
      user: null;
    };

const initialState: UserSlice = {
  type: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserSlice,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserUnion; type: UserType }>
    ) => {
      state.type = action.payload.type;
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
