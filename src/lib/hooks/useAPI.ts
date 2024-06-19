// useApi.ts

import axios from 'axios';

// Define a base URL for the API
export const baseURL = 'https://newsdata.io/api/1';

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

export async function checkImageURL(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    console.error(`Error checking image URL: ${url}`, error);
    return false;
  }
}

export const fallbackImageUrl = 'https://via.placeholder.com/150'; // Example fallback image URL
