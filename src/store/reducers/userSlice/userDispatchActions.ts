import {UserType} from '@lib/types/apiTypes';
import {
  setUserId,
  setUserData,
  resetUserData,
  setUserOnboarded,
} from './userSlice';
import {store} from '@store/reduxStore';

export const updateUserId = (val: string) => {
  store.dispatch(setUserId(val));
};
export const updateUserOnboarded = (val: boolean) => {
  store.dispatch(setUserOnboarded(val));
};

export const updateUserData = (val: UserType) => {
  store.dispatch(setUserData(val));
};

export const resetUserStoreData = () => {
  store.dispatch(resetUserData());
};
