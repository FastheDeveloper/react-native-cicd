import {UserType} from '@lib/types/apiTypes';
import {setUserId, setUserData, resetUserData} from './userSlice';
import {store} from '@store/reduxStore';

export const updateUserId = (val: string) => {
  store.dispatch(setUserId(val));
};

export const updateUserData = (val: UserType) => {
  store.dispatch(setUserData(val));
};

export const resetUserStoreData = () => {
  store.dispatch(resetUserData());
};
