import SecureStorage from './secureStorage';

export const persistStorage = new SecureStorage();

export enum STORAGE_KEYS {
  ONBOARDED_USER = 'ONBOARDED_USER',
  SAVED_NEWS = 'SAVED_NEWS',
}
