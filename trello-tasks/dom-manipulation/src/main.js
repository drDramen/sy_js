import { App } from './app/app.js';

import './style.css';

const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('no root element');
}

new App(rootElement).init();
