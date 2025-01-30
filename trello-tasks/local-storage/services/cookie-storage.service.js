import { ONE_DAY } from '../utils/constants.js';

export class CookieStorageService {
  init(name, value) {
    const storageValue = this.getItem(name);
    const initialValue = { ...value, ...storageValue };

    this.setItem(name, initialValue);

    return initialValue;
  }

  getItem(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)')
    );

    const data = matches ? decodeURIComponent(matches[1]) : null;

    return data && JSON.parse(data);
  }

  setItem(name, value, attributes = {}) {
    attributes = {
      path: '/',
      expires: new Date(Date.now() + ONE_DAY),
      ...attributes,
    };

    if (attributes.expires instanceof Date) {
      attributes.expires = attributes.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(value));

    for (let attributeKey in attributes) {
      updatedCookie += '; ' + attributeKey;
      let attributeValue = attributes[attributeKey];
      if (attributeValue !== true) {
        updatedCookie += '=' + attributeValue;
      }
    }

    document.cookie = updatedCookie;
  }

  removeItem(name) {
    this.setItem(name, '', {
      'max-age': -1,
    });
  }

  clear(exclude) {
    document.cookie.split(';').map((cookie) => {
      const equalPosition = cookie.indexOf('=');
      const name = equalPosition > -1 ? cookie.substring(0, equalPosition) : cookie;

      if (exclude.includes(name)) {
        return;
      }

      this.removeItem(name);
    });
  }
}
