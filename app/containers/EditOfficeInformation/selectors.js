import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import forEach from 'lodash/forEach';

/**
 * Direct selector to the editOfficeInformation state domain
 */
const selectEditOfficeInformationDomain = state =>
  state.editOfficeInformation;

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditOfficeInformation
 */

const selectEditOfficeInformation = createSelector(
  selectEditOfficeInformationDomain,
  (substate) => substate
);


const selectDentistInfo = createSelector(
  selectEditOfficeInformationDomain,
  (substate) => {
    // We need to sort some fiels to display in nice way
    const result = substate.dentistInfo;
    result.workingHours = sortBy(result.workingHours, 'id');
    forEach(result.workingHours, item => {
      if (item.startAt) {
        item.startAt = item.startAt.substring(0 ,5); // eslint-disable-line
      }

      if (item.endAt) {
        item.endAt = item.endAt.substring(0 ,5); // eslint-disable-line
      }
    });

    result.serviceSelected = {};

    forEach(result.services, service => {
      result.serviceSelected[`_${service.id}`] = true;
    });

    return result;
  }
);


export default selectEditOfficeInformation;

export {
  selectEditOfficeInformationDomain,
  selectEditOfficeInformation,
  selectDentistInfo,
};
