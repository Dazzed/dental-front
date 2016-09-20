// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the
// navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more
// information
// about the code splitting business
import getHooks from 'utils/hooks';


const errorLoading = (err) => {
  /* eslint-disable no-console */
  console.error('Dynamic page loading failed', err);
  /* eslint-enable no-console */
};


const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};


export default function createRoutes (store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const {
    injectReducer, injectSagas, redirectToDashboard, redirectToLogin,
  } = getHooks(store);

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
      path: '/accounts/login',
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
      onEnter: redirectToLogin,
      path: '/dashboard',
      name: 'dashboard',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Dashboard/reducer'),
          System.import('containers/Dashboard/sagas'),
          System.import('containers/Dashboard'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ reducer, sagas, component ]) => {
          injectReducer('dashboard', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/dentist/office/edit',
      name: 'editOfficeInformation',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/EditOfficeInformation/reducer'),
          System.import('containers/EditOfficeInformation/sagas'),
          System.import('containers/EditOfficeInformation'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ reducer, sagas, component ]) => {
          injectReducer('editOfficeInformation', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/my-family-members',
      name: 'myFamilyMembers',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/MyFamilyMembers/reducer'),
          System.import('containers/MyFamilyMembers/sagas'),
          System.import('containers/MyFamilyMembers'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ reducer, sagas, component ]) => {
          injectReducer('myFamilyMembers', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/subscribe',
      name: 'subscribePage',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/SubscribePage'),
        ])
          .then(([ component ]) => {
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    },  {
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
