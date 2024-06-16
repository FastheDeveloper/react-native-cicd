import {store} from '@store/reduxStore';
import {
  addAllNews,
  addSavedNews,
  deleteSavedNews,
  deleteAllSavedNews,
} from './newsSlice';
import {NewsArticle} from '@lib/types/apiTypes';

export const saveNews = (val: NewsArticle) => {
  store.dispatch(addSavedNews(val));
};
export const setNews = (val: NewsArticle[]) => {
  store.dispatch(addAllNews(val));
};

export const deleteSavedNewArticle = (newsTitle: string) => {
  store.dispatch(deleteSavedNews(newsTitle));
};

export const clearSavedNews = () => {
  store.dispatch(deleteAllSavedNews());
};
