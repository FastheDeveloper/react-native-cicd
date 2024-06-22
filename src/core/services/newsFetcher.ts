import {apiKey} from '@core/constants/titleData';
import {createApiInstance} from '@hooks/useAPI';
import {NewNewsArticle, NewsArticle} from '@lib/types/apiTypes';
import {
  setLoadingState,
  setGeneralNews,
  setAfrica,
  setWarNews,
  setTechNews,
} from '@store/reducers/newSlice/newsDispatchAction';

function convertToNewsArticle(newData: NewNewsArticle): NewsArticle {
  return {
    source: {
      id: newData.source_id,
      name: newData.source_id, // Assuming the name can be the same as the id
    },
    author: newData.creator !== null ? newData.creator[0] : 'Unknown', // Fallback if the creator array is empty
    title: newData.title,
    description: newData.description,
    url: newData.source_url,
    urlToImage: newData.image_url,
    publishedAt: newData.pubDate.split(' ')[0], // Taking the date part
    content: `${newData.description} \n${newData.content}`,
  };
}
export const getTopNews = async () => {
  setLoadingState(true);
  try {
    const api = createApiInstance({});
    const response = await api.get(`/latest?apikey=${apiKey}&country=ng`);
    const articles = response.data.results;

    // Check if articles is defined and is an array
    if (Array.isArray(articles)) {
      const convertedPromises = articles.map((article: NewNewsArticle) =>
        convertToNewsArticle(article),
      );
      const converted = await Promise.all(convertedPromises);
      console.log(converted, 'CONVERTED TECH ARTICLES');
      setGeneralNews(converted);
    } else {
      console.log('No articles found');
    }
  } catch (e) {
    console.log(e, 'error');
  } finally {
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  }
};

export const getAfricaNews = async () => {
  setLoadingState(true);
  try {
    const api = createApiInstance({});
    const response = await api.get(
      `/latest?apikey=${apiKey}&category=Politics`,
    );
    const articles = response.data.results;

    // Check if articles is defined and is an array
    if (Array.isArray(articles)) {
      const convertedPromises = articles.map((article: NewNewsArticle) =>
        convertToNewsArticle(article),
      );
      const converted = await Promise.all(convertedPromises);
      console.log(converted, 'CONVERTED TECH ARTICLES');
      setAfrica(converted);
    } else {
      console.log('No articles found');
    }
  } catch (e) {
    console.log(e, 'error');
  } finally {
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  }
};

export const getWarNews = async () => {
  setLoadingState(true);
  try {
    const api = createApiInstance({});
    const response = await api.get(`/latest?apikey=${apiKey}&category=Sports`);
    const articles = response.data.results;

    // Check if articles is defined and is an array
    if (Array.isArray(articles)) {
      const convertedPromises = articles.map((article: NewNewsArticle) =>
        convertToNewsArticle(article),
      );
      const converted = await Promise.all(convertedPromises);
      console.log(converted, 'CONVERTED TECH ARTICLES');
      setWarNews(converted);
    } else {
      console.log('No articles found');
    }
  } catch (e) {
    console.log(e, 'error');
  } finally {
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  }
};

export const getTechNews = async () => {
  setLoadingState(true);
  try {
    const api = createApiInstance({});
    const response = await api.get(
      `/latest?apikey=${apiKey}&category=technology`,
    );
    const articles = response.data.results;

    // Check if articles is defined and is an array
    if (Array.isArray(articles)) {
      const convertedPromises = articles.map((article: NewNewsArticle) =>
        convertToNewsArticle(article),
      );
      const converted = await Promise.all(convertedPromises);
      console.log(converted, 'CONVERTED TECH ARTICLES');
      setTechNews(converted);
    } else {
      console.log('No articles found');
    }
  } catch (e) {
    console.log(e, 'error');
  } finally {
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  }
};

export const aggregator = async () => {
  getTechNews();
  getWarNews();
  getAfricaNews();
  getTopNews();
};
