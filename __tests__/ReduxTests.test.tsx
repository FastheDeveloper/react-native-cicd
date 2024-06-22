import rootReducer from '@store/reducers';
import {resetUserStoreData, updateUserData} from '@store/reducers/userSlice';
import {configureStore} from '@reduxjs/toolkit';

describe('Redux State Management', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({reducer: rootReducer}); // Initialize Redux store
  });

  it('should set user correctly', () => {
    const user = {
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      photoURL: 'http://example.com/photo.jpg',
      uid: '1234567890',
    };
    store.dispatch(updateUserData(user));

    const state = store.getState();
    expect(state.user.displayName).toEqual(user.displayName);
    expect(state.user.email).toEqual(user.email);
    expect(state.user.photoURL).toEqual(user.photoURL);
    expect(state.user.uid).toEqual(user.uid);
    expect(state.user.loggedIn).toEqual(true);
  });

  it('should reset user correctly', () => {
    store.dispatch(resetUserStoreData());

    const state = store.getState();
    expect(state.user.displayName).toEqual('');
    expect(state.user.email).toEqual('');
    expect(state.user.photoURL).toEqual('');
    expect(state.user.uid).toEqual('');
    expect(state.user.loggedIn).toEqual(false);
  });
});
