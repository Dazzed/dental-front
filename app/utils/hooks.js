import { selectCurrentPath } from 'common/selectors/router.selector';

import {
  selectAuthState,
  selectSignupCompleteState,
  selectUserType,
} from 'containers/App/selectors';
import createReducer from '../reducers';

/**
 * Inject an asynchronously loaded reducer
 */
function injectAsyncReducer (store) {
  return (name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer; // eslint-disable-line
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
function injectAsyncSagas (store) {
  return (sagas) => sagas.map(store.runSaga);
}

function redirectToLogin (store) {
  return (nextState, replace) => {
    const isLoggedIn = selectAuthState(store.getState());
    const isSignupComplete = selectSignupCompleteState(store.getState());
    const userType = selectUserType(store.getState());
    const currentPath = selectCurrentPath(store.getState());
    const signupFinalPath = '/accounts/complete-signup';

    if (!isLoggedIn) {
      replace({
        pathname: '/accounts/login',
        state: { nextPathname: nextState.location.pathname },
      });
    } else {
      if (userType !== 'dentist' && !isSignupComplete && currentPath !== signupFinalPath) { // eslint-disable-line
        replace(signupFinalPath);
      }
    }
  };
}

function redirectToDashboard (store) {
  return (nextState, replace) => {
    const isLoggedIn = selectAuthState(store.getState());

    if (isLoggedIn) {
      replace('/dashboard');
    }
  };
}

/**
 * Helper for creating injectors
 */
export default function getHooks (store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store),
    redirectToLogin: redirectToLogin(store),
    redirectToDashboard: redirectToDashboard(store),
  };
}
