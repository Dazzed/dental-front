/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill';

/* eslint-disable import/no-unresolved */
// Load the manifest.json file and the .htaccess file
import '!file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';
import 'file?name=[name].[ext]!./assets/robots.txt';
import 'file?name=[name].[ext]!./assets/favicon.ico';
/* eslint-enable import/no-unresolved */

// Import all the third party stuff
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
import getHooks from 'utils/hooks';

import App from 'containers/App';

// Load base styles
import 'sanitize.css/sanitize.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'assets/styles/app.css';

import configureStore from './store';
import createRoutes from './routes';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  childRoutes: createRoutes(store),
  getComponent (nextState, cb) {
    // We need to inject sagas after loaded.
    Promise.all([
      System.import('containers/App/sagas'),
      System.import('containers/Dashboard/sagas'),
      System.import('containers/Authorize.net/sagas'),
    ])
      .then(([ sagas, dashboard, payment ]) => {
        cb(null, App);
        const { injectSagas } = getHooks(store);
        // Each of these sagas needs to be cancelled upon location change
        // Otherwise there will be many duplicates!
        injectSagas(sagas.default);
        injectSagas(dashboard.default);
        injectSagas(payment.default);
      });
  }
};

// Scroll to top when going to a new page, imitating default browser behavior
// function scrollMiddleware () {
//   return useScroll((prevProps, props) => {
//     if (!prevProps || !props) {
//       return true;
//     }

//     if (prevProps.location.pathname !== props.location.pathname) {
//       return [ 0, 0 ];
//     }

//     return true;
//   });
// }

render(
  <Provider store={store}>
    <div>
      <Router
        history={history}
        routes={rootRoute}
        render={applyRouterMiddleware(useScroll())}
      />
      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        position="top-right"
      />
    </div>
  </Provider>,
  document.getElementById('app')
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed

const install = require('offline-plugin/runtime').install;

install();
