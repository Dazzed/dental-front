import { createSelector } from 'reselect';

/**
 * Direct selector to the routing state domain
 */
function selectRoutingDomain(state) {
  return state.get('route');
}

/**
 * Other specific selectors
 */
export const selectNextPathname = createSelector(
  selectRoutingDomain,
  substate => {
    let nextPathname = false;

    if (substate.hasIn(['locationBeforeTransitions', 'state', 'nextPathname'])) {
      nextPathname = substate.getIn(['locationBeforeTransitions', 'state', 'nextPathname']);
    }

    return nextPathname;
  }
);

export const selectRouting = createSelector(
  selectRoutingDomain,
  substate => substate
);

// selectLocationState expects a plain JS object for the routing state
export const selectLocationState = () => {
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
