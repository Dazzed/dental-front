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
    injectReducer, injectSagas, redirectToDashboard, redirectToLogin, redirectTo404
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
      onEnter: redirectToDashboard,
      path: '/accounts/dentist-signup',
      name: 'dentistSignupPage',
      getComponent (nextState, cb) {
        Promise.all([
          System.import('containers/App/sagas'),

          System.import('containers/DentistSignupPage/reducer'),
          System.import('containers/DentistSignupPage/sagas'),
          System.import('containers/DentistSignupPage')
        ])
          .then(([ appSagas, reducer, sagas, component ]) => {
            injectSagas(appSagas.default);

            injectReducer('dentistSignupPage', reducer.default);
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
      // TODO: DELETE this page
      // NOTE: must create the dentist dashboard first
      //       search for `/dentist-dashboard` to see where to link to it
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
      path: '/dentist/contact-admin',
      name: 'contactAdminPage',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ContactAdminPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ component ]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/dentist/members',
      name: 'dentistMembersPage',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/DentistMembersPage/reducer'),
          System.import('containers/DentistMembersPage/sagas'),
          System.import('containers/DentistMembersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([ reducer, sagas, component ]) => {
          injectReducer('dentistMembersPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/dentist/new-members',
      name: 'dentistNewMembersPage',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/DentistMembersPage/reducer'),
          System.import('containers/DentistMembersPage/sagas'),

          System.import('containers/DentistNewMembersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          dentistMembersReducer,
          dentistMembersSagas,
          
          component
        ]) => {
          injectReducer('dentistMembersPage', dentistMembersReducer.default);
          injectSagas(dentistMembersSagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/dentist/new-reviews',
      name: 'dentistNewReviewsPage',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/DentistMembersPage/reducer'),
          System.import('containers/DentistMembersPage/sagas'),

          System.import('containers/DentistNewReviewsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          dentistMembersReducer,
          dentistMembersSagas,

          component
        ]) => {
          injectReducer('dentistMembersPage', dentistMembersReducer.default);
          injectSagas(dentistMembersSagas.default);

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
      path: '/error/404-not-found',
      name: 'notFoundPage',
      getComponent (nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
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
          injectReducer('yourProfilePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectTo404,
      path: '*',
      name: '404',
      getComponent (nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
