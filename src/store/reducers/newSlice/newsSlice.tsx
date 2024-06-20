import {NewsArticle} from '@lib/types/apiTypes';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  generalNews: NewsArticle[];
  africaNews: NewsArticle[];
  warNews: NewsArticle[];
  techNologyNews: NewsArticle[];
  loading: boolean;
  savedNews: NewsArticle[];
}

const initialState: AppState = {
  generalNews: [],
  africaNews: [],
  warNews: [],
  techNologyNews: [],
  loading: false,
  savedNews: [],
};

const taskSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addSavedNews: (state: AppState, action: PayloadAction<NewsArticle>) => {
      state.savedNews.push(action.payload);
    },
    addGeneralNews: (state: AppState, action: PayloadAction<NewsArticle[]>) => {
      state.generalNews = action.payload;
    },
    addAfricaNews: (state: AppState, action: PayloadAction<NewsArticle[]>) => {
      state.africaNews = action.payload;
    },
    addWarNews: (state: AppState, action: PayloadAction<NewsArticle[]>) => {
      state.warNews = action.payload;
    },
    addTechNews: (state: AppState, action: PayloadAction<NewsArticle[]>) => {
      state.techNologyNews = action.payload;
    },
    deleteSavedNews: (state: AppState, action: PayloadAction<string>) => {
      state.savedNews = state.savedNews.filter(
        task => task.title !== action.payload,
      );
    },
    setLoading: (state: AppState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    deleteAllSavedNews: (state: AppState) => {
      state.savedNews = [];
    },
  },
});

export const {
  addSavedNews,
  addGeneralNews,
  deleteSavedNews,
  deleteAllSavedNews,
  addAfricaNews,
  addWarNews,
  addTechNews,
  setLoading,
} = taskSlice.actions;

export default taskSlice.reducer;
