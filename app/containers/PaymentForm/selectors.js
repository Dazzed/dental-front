import { createSelector } from 'reselect';

const paymentFormDomain = state => state.paymentForm;

export const requestEnableSelector = createSelector(
  paymentFormDomain,
  (substate) => substate.requesting,
);


export default {
  requestEnableSelector,
};

