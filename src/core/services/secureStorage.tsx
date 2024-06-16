import EncryptedStorage from 'react-native-encrypted-storage';

export default class SecureStorage {
  set = async (key: string, value: string | boolean | number) => {
    try {
      if (value) {
        if (typeof value === 'string') {
          await EncryptedStorage.setItem(key, value);
        } else {
          const val = JSON.stringify(value);
          await EncryptedStorage.setItem(key, val);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  getBoolean = async (key: string) => {
    try {
      if (key) {
        const value = await EncryptedStorage.getItem(key);

        return value === 'true' ? true : value === 'false' ? false : undefined;
      }
    } catch (error) {
      console.log(error);
    }

    return undefined;
  };

  getNumber = async (key: string) => {
    try {
      if (key) {
        const value = await EncryptedStorage.getItem(key);

        return value ? Number(value) : undefined;
      }
    } catch (error) {
      console.log(error);
    }

    return undefined;
  };

  getString = async (key: string) => {
    try {
      const response = await EncryptedStorage.getItem(key);

      return response !== undefined ? response : undefined;
    } catch (error) {
      console.log(error);

      return undefined;
    }
  };
  remove = async (key: string) => {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  clearAll = async () => {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  setItem = async (key: string, value: Record<string, any>) => {
    try {
      await EncryptedStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  getItem = async (key: string) => {
    try {
      const response = await EncryptedStorage.getItem(key);
      return response ? JSON.parse(response) : undefined;
    } catch (error) {
      console.log(error);

      return undefined;
    }
  };
  removeAllItem = () => {
    EncryptedStorage.clear();
  };
}
