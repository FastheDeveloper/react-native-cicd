import {store} from '@store/reduxStore';
import {
  addGeneralNews,
  addSavedNews,
  deleteSavedNews,
  deleteAllSavedNews,
  addAfricaNews,
  addWarNews,
  addTechNews,
  setLoading,
} from './newsSlice';
import {NewsArticle} from '@lib/types/apiTypes';

export const saveNews = (val: NewsArticle) => {
  store.dispatch(addSavedNews(val));
};
export const setGeneralNews = (val: NewsArticle[]) => {
  store.dispatch(addGeneralNews(val));
};

export const setAfrica = (val: NewsArticle[]) => {
  store.dispatch(addAfricaNews(val));
};

export const setWarNews = (val: NewsArticle[]) => {
  store.dispatch(addWarNews(val));
};

export const setTechNews = (val: NewsArticle[]) => {
  store.dispatch(addTechNews(val));
};

export const setLoadingState = (val: boolean) => {
  store.dispatch(setLoading(val));
};
export const deleteSavedNewArticle = (newsTitle: string) => {
  store.dispatch(deleteSavedNews(newsTitle));
};

export const clearSavedNews = () => {
  store.dispatch(deleteAllSavedNews());
};
