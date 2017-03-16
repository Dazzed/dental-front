import { USER_TYPES } from 'common/constants';
import { selectCurrentPath } from 'common/selectors/router.selector';

import {
  selectAuthState,
  selectAuthLoadingState,
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

    // If user is not logged in, redirect to '/accounts/login'
    if (!isLoggedIn) {
      replace({
        pathname: '/accounts/login',
        state: { nextPathname: nextState.location.pathname },
      });
      return;
    }

    // In the process of loading user details from auth token
    // Let's wait (do nothing here in this hook)
    const loadingFromToken = selectAuthLoadingState(store.getState());
    if (loadingFromToken) {
      return;
    }

    // Check the signup complete state, if not yet completed full signup
    // Redirect to /accoutns/complete-signup
    const currentPath = selectCurrentPath(store.getState());
    const signupFinalPath = '/accounts/complete-signup';
    const isSignupComplete = selectSignupCompleteState(store.getState());
    if (!isSignupComplete && currentPath !== signupFinalPath) {
      replace(signupFinalPath);
    }
  };
}

function redirectToDashboard (store) {
  return (nextState, replace) => {
    const isLoggedIn = selectAuthState(store.getState());
    const userType = selectUserType(store.getState());

    if (isLoggedIn && userType === USER_TYPES.CLIENT) {
      replace('/your-profile');
    }
    else if (isLoggedIn && userType === USER_TYPES.DENTIST) {
      // TODO
      // replace('/dentist-dashboard');

      replace('/dashboard');
    }
  };
}

function redirectTo404 (store) {
  return (nextState, replace) => {
    replace('/error/404-not-found');
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
    redirectTo404: redirectTo404(store),
  };
}
