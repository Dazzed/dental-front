import { USER_TYPES } from 'common/constants';
import { selectCurrentPath } from 'common/selectors/router.selector';

import {
  selectAuthState,
  selectAuthLoadingState,
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
  };
}

function redirectToDashboard (store) {
  return (nextState, replace) => {
    const isLoggedIn = selectAuthState(store.getState());
    const userType = selectUserType(store.getState());

    if (isLoggedIn && userType === USER_TYPES.CLIENT) {
      replace('/patient/profile');
    }
    else if (isLoggedIn && userType === USER_TYPES.DENTIST) {
      replace('/dentist/new-members');
    }
    else if (isLoggedIn && userType === USER_TYPES.ADMIN) {
      replace('/admin/dentists');
    }
  };
}

function redirectTo404 (store) {
  return (nextState, replace) => {
    replace('/error/404-not-found');
  };
}

function logoutReducer(store) {
  return (nextState, replace) => {
    store.replaceReducer(createReducer({}));
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
    logoutReducer: logoutReducer(store),
  };
}
