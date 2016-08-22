import createReducer from '../reducers';
import { selectCurrentUser } from 'containers/App/selectors';

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
    if (!selectCurrentUser(store.getState())) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };
}

function redirectToDashboard (store) {
  return (nextState, replace) => {
    if (selectCurrentUser(store.getState())) {
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
    redirectToDashboard: redirectToDashboard(store)
  };
}
