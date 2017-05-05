/*
Admin Members Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import { createSelector } from 'reselect';

// app
import { selectCurrentUser } from 'containers/App/selectors';

/*
Selectors
================================================================================
*/
const domainSelector = state => state.adminDentistsPage;

/*
Fetch
------------------------------------------------------------
*/
const selectDentists = createSelector(
  domainSelector,
  (substate) => substate.dentists
);

const selectDentistDetails = createSelector(
  domainSelector,
  (substate) => substate.dentistDetails
);

const selectDentistMembers = createSelector(
  domainSelector,
  (substate) => substate.dentistMembers
);

const selectDentistReviews = createSelector(
  domainSelector,
  (substate) => substate.dentistReviews
);

const selectStats = createSelector(
  domainSelector,
  (substate) => substate.stats
);

/*
Search / Sort
------------------------------------------------------------
*/
const selectSearch = createSelector(
  domainSelector,
  (substate) => substate.searchName
);

const selectSort = createSelector(
  domainSelector,
  (substate) => substate.sortStatus
);

/*
Export
------------------------------------------------------------
*/
 export default domainSelector;

export {
  // search / sort patients
  selectSearch,
  selectSort,

  // fetch
  selectDentists,
  selectDentistDetails,
  selectDentistMembers,
  selectDentistReviews,
  selectStats,
};
