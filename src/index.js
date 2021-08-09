import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import * as serviceWorker from './serviceWorker';
import store from './states/store';
import App from './App';

import 'antd/dist/antd.css';
import 'assets/css/global.scss';
import 'assets/css/core/helper.css';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  debug: true,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('p2p-link')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
