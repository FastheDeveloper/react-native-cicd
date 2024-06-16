// useApi.ts

import axios from 'axios';

// Define a base URL for the API
export const baseURL = 'https://newsapi.org/v2';

// Function to create an Axios instance with the base URL

export const createApiInstance = (headers?: Record<string, string>) => {
  // const userStore = new UserStore()
  //   const { isAuthenticated, accessToken, userSyntId } = AppService.store.userStore;
  // const {userData} = useSelector((state: RootState) => state.user)
  // const token=userData.token
  const instance = axios.create({
    baseURL,
  });

  return instance;
};
