import { isStorageApiSupported } from '../utils/storage.js';
import { STORAGE_NAME, STORAGE_TYPE } from '../utils/constants.js';
import { LocalStorageService } from './local-storage.service.js';
import { CookieStorageService } from './cookie-storage.service.js';
import { Observable } from './observable.service.js';

export class State {
  #storage;
  #state;

  constructor({ storageType = STORAGE_TYPE.LocalStorage, name = STORAGE_NAME, initialValue }) {
    if (!storageType) {
      throw new Error('Storage type is not defined');
    }

    if (!name) {
      throw new Error('State object should have a name');
    }

    this.#init(storageType, name, initialValue);
  }

  #init(storageType, name, initialValue) {
    this.name = name;

    const isCookieStorage = storageType === STORAGE_TYPE.Cookie;
    const _isStorageApi = !isCookieStorage && isStorageApiSupported(storageType);

    this.#storage = _isStorageApi
      ? new LocalStorageService(storageType)
      : new CookieStorageService();

    const state = this.#storage.init(name, initialValue);
    this.#state = new Observable(state);

    if (!_isStorageApi) return;

    window.addEventListener('storage', (event) => {
      if (this.name !== event.key) {
        return;
      }

      const storageState = JSON.parse(event.newValue);

      if (storageState) {
        this.#state.emitSeveral(storageState);
      }
    });
  }

  #updateLocalStorageState() {
    const state = this.getState();
    this.#storage.setItem(this.name, state);
  }

  set(key, value) {
    this.#state.emit(key, value);
    this.#updateLocalStorageState();
  }

  addListener(key, listener) {
    this.#state.addListener(key, listener);
  }

  removeListener(key, listener) {
    this.#state.removeListener(key, listener);
  }

  getState(key) {
    return this.#state.getValue(key);
  }
}
