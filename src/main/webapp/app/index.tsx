import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import DevTools from './config/devtools';
import initStore from './config/store';
import { registerLocale } from './config/translation';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './shared/reducers/authentication';
import ErrorBoundary from './shared/error/error-boundary';
import AppComponent from './app';
import { loadIcons } from './config/icon-loader';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-quill/dist/quill.snow.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'app/index.css';
import 'app/assets/scss/react.scss';
import 'bootstrap-social/bootstrap-social.css';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();
registerLocale(store);

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

const rootEl = document.getElementById('root');

const render = Component =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <div>
          {/* If this slows down the app in dev disable it and enable when required  */}
          {devTools}
          <Component />
        </div>
      </Provider>
    </ErrorBoundary>,
    rootEl
  );

render(AppComponent);
