/*
Patient Offsite Signup Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import { createSelector } from 'reselect';


/*
Selectors
================================================================================
*/
const domainSelector = state => state.signupPatientOffsitePage;

/*
Fetch Dentist
------------------------------------------------------------
*/
const dentistSelector = createSelector(
  domainSelector,
  (substate) => { return substate.dentist; }
);

const dentistErrorSelector = createSelector(
  domainSelector,
  (substate) => { return substate.dentistError; }
);

/*
Fetch Members
------------------------------------------------------------
*/
const membersSelector = createSelector(
  domainSelector,
  (substate) => { return substate.members; }
);

// TODO: include user in this list?  See `/app/containers/PatientProfilePage/selectors.js`.
const sortedMembersSelector = createSelector(
  membersSelector,

  (members) => {
    members.sort((a, b) => {
      const aName = a.firstName + a.lastName;
      const bName = b.firstName + b.lastName;

      if (aName < bName) {
        return -1;
      }
      if (aName > bName) {
        return 1;
      }

      return 0;
    });

    return members;
  }
);

/*
Add / Edit
------------------------------------------------------------
*/
const editingMemberSelector = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'member') {
      return substate.editing;
    }

    return null;
  }
);

const editingCheckoutSelector = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'checkout') {
      return substate.editing;
    }

    return null;
  }
);

/*
Signup
------------------------------------------------------------
*/
const accountInfoSelector = createSelector(
  domainSelector,
  (substate) => substate.accountInfo,
);

const isSignedUpSelector = createSelector(
  domainSelector,
  (substate) => substate.patientCreated,
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  // fetch dentist
  dentistSelector,
  dentistErrorSelector,

  // fetch members
  membersSelector,
  sortedMembersSelector,

  // add / edit
  editingMemberSelector,
  editingCheckoutSelector,

  // signup
  accountInfoSelector,
  isSignedUpSelector,
}
