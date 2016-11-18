import { createSelector } from 'reselect';

const paymentFormDomain = state => state.paymentForm;

export const requestEnableSelector = createSelector(
  paymentFormDomain,
  (substate) => substate.requesting,
);


export const tokenSelector = createSelector(
  paymentFormDomain,
  (substate) => substate.token,
);


export default {
  requestEnableSelector,
  tokenSelector,
};


