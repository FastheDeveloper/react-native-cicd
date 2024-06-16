import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import newsReducer from './newSlice/newsSlice';
const rootReducer = combineReducers({
  user: userReducer,
  news: newsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
