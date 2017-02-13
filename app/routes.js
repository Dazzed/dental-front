/*
Routes
================================================================================
These are the pages you can go to.  They are all wrapped in the App component,
which should contain the navbar etc

See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
about the code splitting business.

**Organization:** The routes are listed alphabetically.
*/
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
    injectReducer, injectSagas, redirectToDashboard, redirectToLogin
  } = getHooks(store);

  return [
    {
      onEnter: redirectToDashboard,
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
      // TODO: remove this page
      onEnter: redirectToLogin,
      path: '/accounts/complete-signup',
      name: 'signupFinalPage',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/SignupFinalPage/reducer'),
          System.import('containers/SignupFinalPage/sagas'),
          System.import('containers/SignupFinalPage')
        ])
          .then(([ reducer, sagas, component ]) => {
            injectReducer('signupFinal', reducer.default);
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
          System.import('containers/DentistSignupPage/reducer'),
          System.import('containers/DentistSignupPage/sagas'),
          System.import('containers/DentistSignupPage')
        ])
          .then(([ reducer, sagas, component ]) => {
            injectReducer('dentistSignup', reducer.default);
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      path: '/accounts/logout',
      name: 'logout',
      getComponent (location, cb) {
        const importModules = Promise.all([
          System.import('containers/Logout/sagas'),
          System.import('containers/Logout'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ sagas, component ]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/accounts/signup',
      name: 'signupPage',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/SignupPage/reducer'),
          System.import('containers/SignupPage/sagas'),
          System.import('containers/SignupPage')
        ])
          .then(([ reducer, sagas, component ]) => {
            injectReducer('signupPage', reducer.default);
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      path: '/charge15',
      name: 'chargePage15',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/ChargePage15'),
        ])
          .then(([ component ]) => {
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      path: '/charge20',
      name: 'chargePage20',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/ChargePage20'),
        ])
          .then(([ component ]) => {
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
          System.import('containers/Dashboard'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ component ]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/dentist/contact-support',
      name: 'contactSupportPage',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ContactSupportPage/reducer'),
          System.import('containers/ContactSupportPage/sagas'),
          System.import('containers/ContactSupportPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ reducer, sagas, component ]) => {
          injectReducer('contactSupportPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
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
      path: '/learn-more',
      name: 'learnMore',
      getComponent (nextState, cb) {
        System.import('containers/LearnMorePage')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }, {
      path: '/faq',
      name: 'faq',
      getComponent (nextState, cb) {
        System.import('containers/FaqPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/privacy',
      name: 'privacy',
      getComponent (nextState, cb) {
        System.import('containers/PrivacyPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/subscribe',
      name: 'subscribePage',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SubscribePage/reducer'),
          System.import('containers/SubscribePage/sagas'),
          System.import('containers/SubscribePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ reducer, sagas, component ]) => {
          injectReducer('subscribe', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/terms',
      name: 'terms',
      getComponent (nextState, cb) {
        System.import('containers/TermsPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/your-dentist',
      name: 'yourDentistPage',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/YourDentistPage/reducer'),
          System.import('containers/YourDentistPage/sagas'),
          System.import('containers/YourDentistPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ reducer, sagas, component ]) => {
          injectReducer('yourDentistPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/your-family',
      name: 'familyPage',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/FamilyPage/reducer'),
          System.import('containers/FamilyPage/sagas'),
          System.import('containers/FamilyPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ reducer, sagas, component ]) => {
          injectReducer('familyPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/your-profile',
      name: 'yourProfilePage',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/YourProfilePage/reducer'),
          System.import('containers/YourProfilePage/sagas'),
          System.import('containers/YourProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ reducer, sagas, component ]) => {
          injectReducer('YourProfilePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
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
