/*
Patient Profile Page Selectors
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
const domainSelector = state => state.patientProfilePage;

/*
Fetch Dentist
------------------------------------------------------------
*/
const dentistSelector = createSelector(
  domainSelector,
  (substate) => { return substate.dentist; }
);

/*
Fetch Members
------------------------------------------------------------
*/
const familyMembersSelector = createSelector(
  domainSelector,
  (substate) => { return substate.familyMembers; }
);

const membersSelector = createSelector(
  selectCurrentUser,
  familyMembersSelector,

  (currentUser, familyMembers) => {
    // precondition: the user hasn't been fetched yet
    if (currentUser === false) {
      return false;
    }

    // precondition: the family members haven't been fetched yet
    if (familyMembers === null) {
      return false;
    }

    let members = [];
    members = members.concat(familyMembers);
    members.push(currentUser);
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
Add / Edit Member or Review
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

const editingReviewSelector = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'review') {
      return substate.editing;
    }

    return null;
  }
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  // fetch dentist
  dentistSelector,

  // fetch members
  familyMembersSelector,
  membersSelector,

  // add / edit (member or review)
  editingMemberSelector,
  editingReviewSelector,
};
