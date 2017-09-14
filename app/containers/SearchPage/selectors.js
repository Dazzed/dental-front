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

/*
Exports
------------------------------------------------------------
*/
export default domainSelector;

export {
  // search
  searchResultsSelector,
  specialtiesListSelector,
};
