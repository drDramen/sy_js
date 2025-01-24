export class LocalStorageService {
  #storage;

  constructor(type = 'localStorage') {
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
    this.#storage.setItem(key, JSON.stringify(value));
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
