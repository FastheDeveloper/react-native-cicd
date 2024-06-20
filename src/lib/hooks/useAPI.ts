import axios from 'axios';

export const baseURL = 'https://newsdata.io/api/1';

export const createApiInstance = (headers?: Record<string, string>) => {
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

export const fallbackImageUrl = 'https://via.placeholder.com/150';
