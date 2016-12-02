import { createSelector } from 'reselect';

const paymentFormDomain = state => state.paymentForm;

export const canCheckoutSelector = createSelector(
  paymentFormDomain,
  substate =>
    !substate.requesting && !substate.requested && !substate.charging
);

export const isRequestingSelector = createSelector(
  paymentFormDomain,
  substate => substate.requesting
);

export const isChargingSelector = createSelector(
  paymentFormDomain,
  substate => substate.charging
);

export const wasRequestedSelector = createSelector(
  paymentFormDomain,
  substate => substate.requested
);

export const errorSelector = createSelector(
  paymentFormDomain,
  substate => substate.error
);


export const openSelector = createSelector(
  paymentFormDomain,
  substate => substate.open
);

export const userOpenedSelector = createSelector(
  paymentFormDomain,
  substate => substate.userId
);

export const cardSelector = createSelector(
  paymentFormDomain,
  substate => substate.card
);


export const amountsSelector = createSelector(
  paymentFormDomain,
  substate => substate.amounts
);
