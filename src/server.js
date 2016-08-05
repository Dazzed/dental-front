import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from './routes';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import debug from 'debug';

const logger = debug('dental-ui:server');
const env = process.env.NODE_ENV || 'development';
const dbConfig = require(path.join(__dirname, '..', 'config', 'config'))[env];
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const SequelizeStore = require('express-sequelize-session')(expressSession.Store);
const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SECRET_KEY || 'somesecrettokenhere',
  saveUninitialized: true, // don't create session until something stored
  resave: false, // don't save session if unmodified
  store: new SequelizeStore(sequelize),
}));

// Sync session
sequelize.sync();

// listen on login request
proxy.on('proxyRes', (proxyRes, req) => {
  if (req.originalUrl === '/api/v1/accounts/login' && req.method === 'POST') {
    // TODO: maybe save JWT instead of id?
    proxyRes.on('data', (msg) => {
      const id = JSON.parse(msg.toString()).id;
      req.session.user = jwt.sign({ id }, process.env.JWT_SECRET);
      logger('Saving session user ID as JWT token');
    });
  }

  if (req.originalUrl === '/api/v1/accounts/logut') {
    proxyRes.on('finish', () => {
      logger('Delete session user ID');
      delete req.session.user;
    });
  }
});

// Setup JWT header
proxy.on('proxyReq', (proxyReq, req) => {
  if (req.session.user) {
    proxyReq.setHeader('Authorization', `JWT ${req.session.user}`);
  }
});


// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: `${targetUrl}/api`});
});


// app.use('/ws', (req, res) => {
//   proxy.web(req, res, {target: targetUrl + '/ws'});
// });

// server.on('upgrade', (req, socket, head) => {
//   proxy.ws(req, socket, head);
// });

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        global.navigator = {userAgent: req.headers['user-agent']};

        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
