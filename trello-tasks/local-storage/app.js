import { State } from './services/state.service.js';
import { createElement } from './utils/create-element.js';
import { getLoggedInButtonText, getThemeButtonText, updateTheme } from './utils/helpers.js';

const STORAGE_NAME = 'app-config';
const systemSettingDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const appConfig = new State(STORAGE_NAME, {
  theme: systemSettingDark ? 'dark' : 'light',
  loggedIn: false,
});

updateTheme(appConfig.getState('theme'));

const app = document.getElementById('app');
const controls = createElement({ tag: 'div', className: 'controls', parentNode: app });
const toggleTheme = createElement({
  tag: 'button',
  className: 'controls__button',
  textContent: getThemeButtonText(appConfig.getState('theme')),
  parentNode: controls,
});
const toggleLoggedIn = createElement({
  tag: 'button',
  className: 'controls__button',
  textContent: getLoggedInButtonText(appConfig.getState('loggedIn')),
  parentNode: controls,
});

toggleTheme.addEventListener('click', () => {
  const oldTheme = appConfig.getState('theme');
  const newTheme = oldTheme === 'dark' ? 'light' : 'dark';
  appConfig.set('theme', newTheme);
});

toggleLoggedIn.addEventListener('click', () => {
  const loggedIn = appConfig.getState('loggedIn');
  appConfig.set('loggedIn', !loggedIn);
});

const checkTheme = (value) => {
  toggleTheme.textContent = getThemeButtonText(value);
  updateTheme(value);
};

const checkLoggedIn = (value) => {
  toggleLoggedIn.textContent = getLoggedInButtonText(value);
};

appConfig.addListener('theme', checkTheme);
appConfig.addListener('loggedIn', checkLoggedIn);
