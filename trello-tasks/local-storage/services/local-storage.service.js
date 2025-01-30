import { isQuotaExceededError } from '../utils/storage.js';
import { STORAGE_TYPE } from '../utils/constants.js';

export class LocalStorageService {
  #storage;

  constructor(type = STORAGE_TYPE.LocalStorage) {
    this.#storage = window[type];
  }

  init(key, value) {
    const storageValue = this.getItem(key);
    const initialValue = { ...value, ...storageValue };

    this.setItem(key, initialValue);

    return initialValue;
  }

  getItem(key) {
    const data = this.#storage.getItem(key);

    if (data !== null) {
      return JSON.parse(data);
    }

    return null;
  }

  setItem(key, value) {
    try {
      this.#storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      const isQuotaExceeded = isQuotaExceededError(error);

      if (isQuotaExceeded) {
        this.#storage.clear();
        this.setItem(key, value);
      }
    }
  }

  removeItem(key) {
    this.#storage.removeItem(key);
  }

  clear(exclude) {
    if (exclude) {
      Object.keys(localStorage).forEach((key) => {
        if (exclude.includes(key)) {
          return;
        }

        this.removeItem(key);
      });
    } else {
      this.#storage.clear();
    }
  }
}
