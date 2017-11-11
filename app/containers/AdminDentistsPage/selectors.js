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

const selectManagers = createSelector(
  domainSelector,
  (substate) => substate.managers
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

const selectDentistReports = createSelector(
  domainSelector,
  (substate) => substate.dentistReports
);

/* Getters
 * ------------------------------------------------------ */
const selectSelectedDentist = createSelector(
  domainSelector,
  (substate) => substate.selectedDentist
);

const selectEditingDentistId = createSelector(
  domainSelector,
  (substate) => substate.editingDentistId
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

const selectRefundingMember = createSelector(
  domainSelector,
  (substate) => substate.refundingMember
);

const selectMasterReportsDates = createSelector(
  domainSelector,
  (substate) => substate.masterReportsDates
);

const selectProcessedDentistsOld = createSelector(
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
      } else if (sortMethod === 'name') {
        stringA = (dentistA.firstName + ' ' + dentistA.lastName).toLowerCase();
        stringB = (dentistB.firstName + ' ' + dentistB.lastName).toLowerCase();
      } else if (sortMethod === 'activated') {
        return dentistA.dentistInfo.managerId ? 1 : -1;
      }
      if (stringA < stringB) {
        return -1;
      } else if (stringA > stringB) {
        return 1;
      }
      return 0;
    });

    return processedDentists;
  }
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
    if (sortMethod === 'unassigned') {
      processedDentists = processedDentists
        .filter(pd => !pd.dentistInfo.managerId);
    } else {
      processedDentists = processedDentists
        .filter(pd => pd.dentistInfo.managerId === Number(sortMethod));
    }

    return processedDentists;
  }
);

const transferringMemberSelector = createSelector(
  domainSelector,
  substate => substate.transferringMember
);

const isTransferringMemberSelector = createSelector(
  domainSelector,
  substate => substate.isTransferringMember
);

const termsUpdateModalOpenSelector = createSelector(
  domainSelector,
  substate => substate.termsUpdateModalOpen
);

const isUpdatingTermsSelector = createSelector(
  domainSelector,
  substate => substate.isUpdatingTerms
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
  selectDentistReports,

  // getters
  selectSelectedDentist,
  selectEditingDentistId,
  // search / sort dentists
  selectSearch,
  selectSort,
  selectProcessedDentists,
  selectManagers,
  selectRefundingMember,
  // reports
  selectMasterReportsDates,

  transferringMemberSelector,
  isTransferringMemberSelector,
  termsUpdateModalOpenSelector,
  isUpdatingTermsSelector
};
