import { isQuotaExceededError } from '../utils/storage.js';
import { LocalStorageService } from './local-storage.service.js';
import { Observable } from './observable.service.js';

export class State {
  #localStorage = new LocalStorageService();
  #state;

  get #storageState() {
    this.#localStorage.getItem(this.name);
  }

  constructor(name, initialValue) {
    if (!name) {
      throw new Error('State object should have a name');
    }

    this.#init(name, initialValue);
  }

  #init(name, initialValue) {
    this.name = name;

    const state = this.#localStorage.init(name, initialValue);
    this.#state = new Observable(state);

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
    try {
      const state = this.getState();
      this.#localStorage.setItem(this.name, state);
    } catch (error) {
      const isQuotaExceeded = isQuotaExceededError(error);

      if (isQuotaExceeded) {
        this.#localStorage.clear();
        this.#updateLocalStorageState();
      }
    }
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
    // return Object.freeze(this.#state.getValue(key));
    return this.#state.getValue(key);
  }
}
