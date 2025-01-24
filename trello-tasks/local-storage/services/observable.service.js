function isCallable(fn) {
  return typeof fn === 'function';
}

export class Observable {
  #listeners = new Map();
  #value;
  constructor(initialValue) {
    this.#value = initialValue;
  }

  addListener(key, listener) {
    const keyListeners = this.#listeners.get(key) || new Map();

    if (keyListeners.has(listener)) {
      return;
    }

    this.#listeners.set(key, keyListeners.set(listener, listener));
  }

  removeListener(key, listener) {
    const keyListeners = this.#listeners.get(key);

    if (!keyListeners || !keyListeners.has(listener)) {
      return;
    }

    keyListeners.delete(listener);
  }

  emit(key, value) {
    if (this.#value[key] === value) {
      return;
    }

    if (isCallable(value)) {
      this.#value[key] = value(this.#value[key]);
    } else {
      this.#value[key] = value;
    }

    const keyListeners = this.#listeners.get(key);

    if (!keyListeners) {
      return;
    }

    keyListeners.forEach((listener) => listener(this.#value[key]));
  }

  emitSeveral(newValues) {
    for (const key in newValues) {
      this.emit(key, newValues[key]);
    }
  }

  getValue(key) {
    if (key && this.#value.hasOwnProperty(key)) {
      return this.#value[key];
    }

    return this.#value;
  }
}
