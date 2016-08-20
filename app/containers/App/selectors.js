import { createSelector } from 'reselect';

// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

/**
 * Direct selector to the app state domain
 */
function selectAppDomain(state) {
  return state.get('app');
}

/**
 * Public selectors used by App
 */
const selectApp = createSelector(
  selectAppDomain,
  (substate) => substate
);

const selectCurrentUser = createSelector(
  selectAppDomain,
  (substate) => substate.get('currentUser')
);

export {
  selectLocationState,
  selectApp,
  selectCurrentUser,
};
