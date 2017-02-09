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

const domainSelector = state => state.familyPage;

// Needed?
const familyMembersSelector = createSelector(
  domainSelector,
  (substate) => { return substate.familyMembers; }
);

export default domainSelector;

export {
  familyMembersSelector
};
