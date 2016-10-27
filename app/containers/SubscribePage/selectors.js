import { createSelector } from 'reselect';

const subscribeDomain = state => state.subscribe;

export const billSelector = createSelector(
  subscribeDomain,
  (substate) => substate.bill,
);


export default {
  billSelector,
};
