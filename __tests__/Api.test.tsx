import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import {apiKey} from '@core/constants/titleData';

import {
  setLoadingState,
  setGeneralNews,
  setAfrica,
  setWarNews,
  setTechNews,
} from '@store/reducers/newSlice/newsDispatchAction';
import {
  getTopNews,
  getAfricaNews,
  getWarNews,
  getTechNews,
  aggregator,
} from '@core/services/newsFetcher';
// import { getTopNews, getAfricaNews, getWarNews, getTechNews, aggregator} // Adjust the import path accordingly

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('News API', () => {
  let store: any;
  let mock: MockAdapter;

  beforeEach(() => {
    store = mockStore({});
    mock = new MockAdapter(axios);
    jest.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    mock.restore();
    store.dispatch.mockClear();
  });

  const sampleArticle = {
    source_id: 'sample-source',
    creator: ['Author Name'],
    title: 'Sample Title',
    description: 'Sample Description',
    source_url: 'http://example.com',
    image_url: 'http://example.com/image.jpg',
    pubDate: '2024-06-22 12:00:00',
    content: 'Sample content',
  };

  it('should fetch and set top news correctly', async () => {
    mock.onGet(`/latest?apikey=${apiKey}&country=ng`).reply(200, {
      results: [sampleArticle],
    });

    await getTopNews();

    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(true));
    expect(store.dispatch).toHaveBeenCalledWith(
      setGeneralNews([
        {
          source: {id: 'sample-source', name: 'sample-source'},
          author: 'Author Name',
          title: 'Sample Title',
          description: 'Sample Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: '2024-06-22',
          content: 'Sample Description \nSample content',
        },
      ]),
    );
    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(false));
  });

  it('should fetch and set Africa news correctly', async () => {
    mock.onGet(`/latest?apikey=${apiKey}&category=Politics`).reply(200, {
      results: [sampleArticle],
    });

    await getAfricaNews();

    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(true));
    expect(store.dispatch).toHaveBeenCalledWith(
      setAfrica([
        {
          source: {id: 'sample-source', name: 'sample-source'},
          author: 'Author Name',
          title: 'Sample Title',
          description: 'Sample Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: '2024-06-22',
          content: 'Sample Description \nSample content',
        },
      ]),
    );
    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(false));
  });

  it('should fetch and set war news correctly', async () => {
    mock.onGet(`/latest?apikey=${apiKey}&category=Sports`).reply(200, {
      results: [sampleArticle],
    });

    await getWarNews();

    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(true));
    expect(store.dispatch).toHaveBeenCalledWith(
      setWarNews([
        {
          source: {id: 'sample-source', name: 'sample-source'},
          author: 'Author Name',
          title: 'Sample Title',
          description: 'Sample Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: '2024-06-22',
          content: 'Sample Description \nSample content',
        },
      ]),
    );
    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(false));
  });

  it('should fetch and set tech news correctly', async () => {
    mock.onGet(`/latest?apikey=${apiKey}&category=technology`).reply(200, {
      results: [sampleArticle],
    });

    await getTechNews();

    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(true));
    expect(store.dispatch).toHaveBeenCalledWith(
      setTechNews([
        {
          source: {id: 'sample-source', name: 'sample-source'},
          author: 'Author Name',
          title: 'Sample Title',
          description: 'Sample Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: '2024-06-22',
          content: 'Sample Description \nSample content',
        },
      ]),
    );
    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(false));
  });

  it('should fetch all news categories correctly with aggregator', async () => {
    mock.onGet(`/latest?apikey=${apiKey}&country=ng`).reply(200, {
      results: [sampleArticle],
    });
    mock.onGet(`/latest?apikey=${apiKey}&category=Politics`).reply(200, {
      results: [sampleArticle],
    });
    mock.onGet(`/latest?apikey=${apiKey}&category=Sports`).reply(200, {
      results: [sampleArticle],
    });
    mock.onGet(`/latest?apikey=${apiKey}&category=technology`).reply(200, {
      results: [sampleArticle],
    });

    await aggregator();

    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(true));
    expect(store.dispatch).toHaveBeenCalledWith(
      setGeneralNews([
        {
          source: {id: 'sample-source', name: 'sample-source'},
          author: 'Author Name',
          title: 'Sample Title',
          description: 'Sample Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: '2024-06-22',
          content: 'Sample Description \nSample content',
        },
      ]),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setAfrica([
        {
          source: {id: 'sample-source', name: 'sample-source'},
          author: 'Author Name',
          title: 'Sample Title',
          description: 'Sample Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: '2024-06-22',
          content: 'Sample Description \nSample content',
        },
      ]),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setWarNews([
        {
          source: {id: 'sample-source', name: 'sample-source'},
          author: 'Author Name',
          title: 'Sample Title',
          description: 'Sample Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: '2024-06-22',
          content: 'Sample Description \nSample content',
        },
      ]),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setTechNews([
        {
          source: {id: 'sample-source', name: 'sample-source'},
          author: 'Author Name',
          title: 'Sample Title',
          description: 'Sample Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: '2024-06-22',
          content: 'Sample Description \nSample content',
        },
      ]),
    );
    expect(store.dispatch).toHaveBeenCalledWith(setLoadingState(false));
  });
});
