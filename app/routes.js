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


export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const {
    injectReducer, injectSagas, redirectToDashboard, redirectToLogin, redirectTo404
  } = getHooks(store);

  return [
    {
      onEnter: redirectToDashboard,
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/HomePage'),
        ])
          .then(([component]) => {
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/accounts/activate/:activationKey',
      name: 'activationPage',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/ActivationPage/reducer'),
          System.import('containers/ActivationPage/sagas'),
          System.import('containers/ActivationPage')
        ])
          .then(([reducer, sagas, component]) => {
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
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/LoginPage/sagas'),
          System.import('containers/LoginPage')
        ])
          .then(([sagas, component]) => {
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/accounts/forgot-password',
      name: 'forgotPasswordPage',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/ForgotPasswordPage/sagas'),
          System.import('containers/ForgotPasswordPage')
        ])
          .then(([sagas, component]) => {
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/accounts/reset-password/:token',
      name: 'passwordResetPage',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/PasswordResetPage/sagas'),
          System.import('containers/PasswordResetPage')
        ])
          .then(([sagas, component]) => {
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/accounts/dentist-signup',
      name: 'dentistSignupPage',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/App/sagas'),

          System.import('containers/DentistSignupPage/reducer'),
          System.import('containers/DentistSignupPage/sagas'),
          System.import('containers/DentistSignupPage')
        ])
          .then(([appSagas, reducer, sagas, component]) => {
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
      getComponent(location, cb) {
        const importModules = Promise.all([
          System.import('containers/Logout/sagas'),
          System.import('containers/Logout'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/accounts/signup',
      name: 'signupPage',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/SignupPage/reducer'),
          System.import('containers/SignupPage/sagas'),
          System.import('containers/SignupPage')
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('signupPage', reducer.default);
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      path: '/accounts/signup/my-dentist/:dentistId',
      name: 'signupPatientOffsitePage',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/SignupPatientOffsitePage/reducer'),
          System.import('containers/SignupPatientOffsitePage/sagas'),
          System.import('containers/SignupPatientOffsitePage')
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('signupPatientOffsitePage', reducer.default);
            injectSagas(sagas.default);
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/admin/dentists',
      name: 'adminDentistsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/AdminDentistsPage/reducer'),
          System.import('containers/AdminDentistsPage/sagas'),
          System.import('containers/AdminDentistsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('adminDentistsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/admin/members',
      name: 'adminMembersPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/AdminDentistsPage/reducer'),
          System.import('containers/AdminDentistsPage/sagas'),

          System.import('containers/AdminMembersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          adminDentistsReducer,
          adminDentistsSagas,

          component
        ]) => {
          injectReducer('adminDentistsPage', adminDentistsReducer.default);
          injectSagas(adminDentistsSagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/admin/reports',
      name: 'adminReportsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/AdminDentistsPage/reducer'),
          System.import('containers/AdminDentistsPage/sagas'),

          System.import('containers/AdminReportsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          adminDentistsReducer,
          adminDentistsSagas,

          component
        ]) => {
          injectReducer('adminDentistsPage', adminDentistsReducer.default);
          injectSagas(adminDentistsSagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/admin/reviews',
      name: 'adminReviewsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/AdminDentistsPage/reducer'),
          System.import('containers/AdminDentistsPage/sagas'),

          System.import('containers/AdminReviewsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          adminDentistsReducer,
          adminDentistsSagas,

          component
        ]) => {
          injectReducer('adminDentistsPage', adminDentistsReducer.default);
          injectSagas(adminDentistsSagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/charge15',
      name: 'chargePage15',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/ChargePage15'),
        ])
          .then(([component]) => {
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      path: '/charge20',
      name: 'chargePage20',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/ChargePage20'),
        ])
          .then(([component]) => {
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
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Dashboard'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/dentist/contact-admin',
      name: 'contactAdminPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ContactAdminPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/dentist/edit-profile',
      name: 'dentistEditProfilePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/DentistMembersPage/reducer'),
          System.import('containers/DentistMembersPage/sagas'),
          System.import('containers/DentistEditProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dentistMembersPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/dentist/members',
      name: 'dentistMembersPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/DentistMembersPage/reducer'),
          System.import('containers/DentistMembersPage/sagas'),
          System.import('containers/DentistMembersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
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
      getComponent(nextState, cb) {
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
      getComponent(nextState, cb) {
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
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/EditOfficeInformation/reducer'),
          System.import('containers/EditOfficeInformation/sagas'),
          System.import('containers/EditOfficeInformation'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('editOfficeInformation', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/error/404-not-found',
      name: 'notFoundPage',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/faq',
      name: 'faq',
      getComponent(nextState, cb) {
        System.import('containers/FaqPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/learn-more',
      name: 'learnMore',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LearnMorePage/reducer'),
          System.import('containers/LearnMorePage/sagas'),
          System.import('containers/LearnMorePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component,]) => {
          injectReducer('learnMorePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToDashboard,
      path: '/marketplace/profile/:dentistId',
      name: 'marketplaceProfile',
      getComponent(nextState, cb) {
        Promise.all([
          System.import('containers/MarketplaceProfilePage')
        ])
          .then(([component]) => {
            loadModule(cb)(component);
          })
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/patient/profile',
      name: 'patientProfilePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/PatientProfilePage/reducer'),
          System.import('containers/PatientProfilePage/sagas'),
          System.import('containers/PatientProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          patientDashboardReducer,
          patientDashboardSagas,
          component
        ]) => {
          injectReducer('patientProfilePage', patientDashboardReducer.default);
          injectSagas(patientDashboardSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/patient/membership-info',
      name: 'patientMembershipInfoPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/PatientProfilePage/reducer'),
          System.import('containers/PatientProfilePage/sagas'),
          System.import('containers/PatientMembershipInfoPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          patientDashboardReducer,
          patientDashboardSagas,
          component
        ]) => {
          injectReducer('patientProfilePage', patientDashboardReducer.default);
          injectSagas(patientDashboardSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/patient/your-dentist',
      name: 'patientDentistPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/PatientProfilePage/reducer'),
          System.import('containers/PatientProfilePage/sagas'),
          System.import('containers/PatientDentistPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          patientDashboardReducer,
          patientDashboardSagas,
          component
        ]) => {
          injectReducer('patientProfilePage', patientDashboardReducer.default);
          injectSagas(patientDashboardSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      onEnter: redirectToLogin,
      path: '/patient/your-reviews',
      name: 'patientReviewsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/PatientProfilePage/reducer'),
          System.import('containers/PatientProfilePage/sagas'),
          System.import('containers/PatientReviewsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          patientDashboardReducer,
          patientDashboardSagas,
          component
        ]) => {
          injectReducer('patientProfilePage', patientDashboardReducer.default);
          injectSagas(patientDashboardSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/privacy',
      name: 'privacy',
      getComponent(nextState, cb) {
        System.import('containers/PrivacyPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/search',
      name: 'search',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SearchPage/reducer'),
          System.import('containers/SearchPage/sagas'),
          System.import('containers/SearchPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('search', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/subscribe',
      name: 'subscribePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SubscribePage/reducer'),
          System.import('containers/SubscribePage/sagas'),
          System.import('containers/SubscribePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('subscribe', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/terms',
      name: 'terms',
      getComponent(nextState, cb) {
        System.import('containers/TermsPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: redirectTo404,
      path: '*',
      name: '404',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
