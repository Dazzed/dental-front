/*
Search Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
import get from 'lodash/get';
import { createSelector } from 'reselect';

const domainSelector = state => state.search;

/*
Search Selectors
------------------------------------------------------------
*/
const searchResultsSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'searchResults')
);

const specialtiesListSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'specialtiesList')
);

const searchLoadingStatusSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'loadingResults')
);

const dentistCountSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'totalDentistCount')
);

const errorsSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'errors')
);

const activeFiltersSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'filters')
);

/*
Exports
------------------------------------------------------------
*/
export default domainSelector;

export {
  // search
  searchResultsSelector,
  specialtiesListSelector,
  searchLoadingStatusSelector,
  dentistCountSelector,
  errorsSelector,
  activeFiltersSelector
};
