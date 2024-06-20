// reducers/appSlice.ts

import {UserType} from '@lib/types/apiTypes';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  id?: string;
  userData?: UserType;
  userOnboarded?: boolean;
}

const initialState: AppState = {
  id: '',
  userData: undefined,
  userOnboarded: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state: AppState, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUserData: (state: AppState, action: PayloadAction<UserType>) => {
      state.userData = action.payload;
    },
    setUserOnboarded: (state: AppState, action: PayloadAction<boolean>) => {
      state.userOnboarded = action.payload;
    },
    resetUserData: (state: AppState) => {
      state.userData = undefined;
      state.id = '';
    },
    // Add other actions as needed
  },
});

// Export the actions with specific types
export const {setUserId, setUserData, resetUserData, setUserOnboarded} =
  userSlice.actions;
// Export the reducer
export default userSlice.reducer;
