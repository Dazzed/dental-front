/*
Patient Family Member Page Selectors
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
------------------------------------------------------------
*/
const domainSelector = state => state.familyPage;

// Needed?
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
    if (familyMembers === undefined) {
      return false;
    }

    const members = [];

    members.concat(familyMembers);
    members.push(currentUser);

    return members;
  }
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  familyMembersSelector,
  membersSelector,
};
