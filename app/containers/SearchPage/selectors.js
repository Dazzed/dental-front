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

/*
Exports
------------------------------------------------------------
*/
export default domainSelector;

export {
  // search
  searchResultsSelector,
};
