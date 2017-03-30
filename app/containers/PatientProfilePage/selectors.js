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
Fetch
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
Add / Edit Member
------------------------------------------------------------
*/
const editingActiveSelector = createSelector(
  domainSelector,
  substate => substate.editingActive,
);

const editingMemberSelector = createSelector(
  domainSelector,
  subtate => subtate.editingMember,
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  familyMembersSelector,
  membersSelector,

  editingActiveSelector,
  editingMemberSelector,
};
