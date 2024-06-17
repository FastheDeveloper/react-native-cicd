// reducers/appSlice.ts

import {UserType} from '@lib/types/apiTypes';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  id?: string;
  userData?: UserType;
}

const initialState: AppState = {
  id: '',
  userData: undefined,
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
    resetUserData: (state: AppState) => {
      state.userData = undefined;
      state.id = '';
    },
    // Add other actions as needed
  },
});

// Export the actions with specific types
export const {setUserId, setUserData, resetUserData} = userSlice.actions;
// Export the reducer
export default userSlice.reducer;
