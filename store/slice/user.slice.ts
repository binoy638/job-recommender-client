/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from '@types';

interface UserSlice {
  userType: UserType | null;
  id: string;
}

// Define the initial state using that type
const initialState: UserSlice = {
  userType: null,
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ userType: UserType; id: string }>
    ) => {
      state.userType = action.payload.userType;
      state.id = action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
