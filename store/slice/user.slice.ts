/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Admin, Employer, JobSeeker, UserType } from '@types';

export type UserUnion = Admin | Employer | JobSeeker;

interface UserSlice {
  type: UserType | null;
  user: UserUnion | null;
}

// Define the initial state using that type
const initialState: UserSlice = {
  type: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ type: UserType; user: UserUnion }>
    ) => {
      console.log(action.payload);
      state.type = action.payload.type;
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
