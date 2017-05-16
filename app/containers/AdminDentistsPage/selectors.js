/*
Admin Members Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
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

const seletDentistReports = createSelector(
  domainSelector,
  (substate) => substate.dentistReports
);

/* Getters
 * ------------------------------------------------------ */
const selectSelectedDentist = createSelector(
  domainSelector,
  (substate) => substate.selectedDentist
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

const selectProcessedDentists = createSelector(
  selectDentists,
  selectSearch,
  selectSort,
  (dentists, searchName, sortMethod) => {
    // precondition: haven't fetched the dentists yet
    if (dentists === null) {
      return dentists;
    }

    let processedDentists = dentists;

    // search
    if (searchName !== null) {
      searchName = searchName.toLowerCase();

      processedDentists = dentists.filter((dentist) => {
        const dentistName = dentist.firstName + ' ' + dentist.lastName;
        const matchesDentist = dentistName.toLowerCase().indexOf(searchName) > -1;

        return matchesDentist;
      });
    }

    // sort
    processedDentists = processedDentists.sort((dentistA, dentistB) => {
      if (sortMethod === "date") {
        return moment(dentistB.createdAt).diff(dentistA.createdAt);
      }

      let stringA;
      let stringB;
      if (sortMethod === "email") {
        stringA = (dentistA.email + ' ' + dentistA.email).toLowerCase();
        stringB = (dentistB.email + ' ' + dentistB.email).toLowerCase();
      }
      else {
        // sortMethod === "name"
        stringA = (dentistA.firstName + ' ' + dentistA.lastName).toLowerCase();
        stringB = (dentistB.firstName + ' ' + dentistB.lastName).toLowerCase();
      }

      if (stringA < stringB) {
        return -1
      }
      else if (stringA > stringB) {
        return 1;
      }

      return 0;
    });

    return processedDentists;
  }
);

/*
Export
------------------------------------------------------------
*/
 export default domainSelector;

export {
  // fetch
  selectDentists,
  selectDentistDetails,
  selectDentistMembers,
  selectDentistReviews,
  selectStats,
  seletDentistReports,

  // getters
  selectSelectedDentist,

  // search / sort dentists
  selectSearch,
  selectSort,
  selectProcessedDentists,
};
