import type { Store } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import userSlice from './slice/user.slice';

const store: Store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useTypedAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
