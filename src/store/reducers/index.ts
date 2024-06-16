import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  //   app: appReducer,
  //   theme: themeReducer,
  //   user: userReducer,
  //   passcode: passcodeReducer
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
