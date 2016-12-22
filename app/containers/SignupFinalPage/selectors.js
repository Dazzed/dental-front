import { createSelector } from 'reselect';

const signupFinalDomain = state => state.signupFinal;

const officesSelector = createSelector(
  signupFinalDomain,
  (substate) => substate.offices,
);

const signupCompleteSelector = createSelector(
  signupFinalDomain,
  (substate) => substate.signupComplete,
);

export {
  officesSelector,
  signupCompleteSelector,
};

export default signupFinalDomain;
