// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import getHooks from 'utils/hooks';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes (store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas, redirectToLogin, redirectToDashboard } = getHooks(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/HomePage'),
        ])
          .then(([ component ]) => {
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/accounts/activate/:activationKey',
      name: 'activationPage',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/ActivationPage/reducer'),
          System.import('containers/ActivationPage/sagas'),
          System.import('containers/ActivationPage')
        ])
          .then(([ reducer, sagas, component ]) => {
            injectReducer('activationPage', reducer.default);
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/login',
      name: 'loginPage',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/LoginPage/sagas'),
          System.import('containers/LoginPage')
        ])
          .then(([ sagas, component ]) => {
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/signup',
      name: 'signupPage',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/SignupPage/sagas'),
          System.import('containers/SignupPage')
        ])
          .then(([ sagas, component ]) => {
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/accounts/dentist-signup',
      name: 'dentistSignupPage',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/DentistSignupPage/sagas'),
          System.import('containers/DentistSignupPage')
        ])
          .then(([ sagas, component ]) => {
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent (nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
