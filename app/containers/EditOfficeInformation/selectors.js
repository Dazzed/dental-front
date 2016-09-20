import { createSelector } from 'reselect';

/**
 * Direct selector to the editOfficeInformation state domain
 */
const selectEditOfficeInformationDomain = () => state =>
  state.get('editOfficeInformation');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditOfficeInformation
 */

const selectEditOfficeInformation = () => createSelector(
  selectEditOfficeInformationDomain(),
  (substate) => substate.toJS()
);

export default selectEditOfficeInformation;
export {
  selectEditOfficeInformationDomain,
};
