import {NewsArticle} from '@lib/types/apiTypes';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  allNews: NewsArticle[];
  savedNews: NewsArticle[];
}

const initialState: AppState = {
  allNews: [],
  savedNews: [],
};

const taskSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addSavedNews: (state: AppState, action: PayloadAction<NewsArticle>) => {
      state.savedNews.push(action.payload);
    },
    addAllNews: (state: AppState, action: PayloadAction<NewsArticle[]>) => {
      state.allNews = action.payload;
    },
    deleteSavedNews: (state: AppState, action: PayloadAction<string>) => {
      state.savedNews = state.savedNews.filter(
        task => task.title !== action.payload,
      );
    },
    deleteAllSavedNews: (state: AppState) => {
      state.savedNews = [];
    },

    // completeTask
    //deleteTask
  },
});

export const {addSavedNews, addAllNews, deleteSavedNews, deleteAllSavedNews} =
  taskSlice.actions;

export default taskSlice.reducer;
