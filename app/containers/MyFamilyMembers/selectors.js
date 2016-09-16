import { createSelector } from 'reselect';

/**
 * Direct selector to the myFamilyMembers state domain
 */
const selectMyFamilyMembersDomain = state => state.myFamilyMembers;

/**
 * Other specific selectors
 */


/**
 * Default selector used by MyFamilyMembers
 */

const selectMyFamilyMembers = createSelector(
  selectMyFamilyMembersDomain,
  (substate) => substate
);

const selectMembersList = createSelector(
  selectMyFamilyMembersDomain,
  (substate) => substate.membersList
);

const selectEditingMember = createSelector(
  selectMyFamilyMembersDomain,
  (substate) => substate.editingMember
);

export default selectMyFamilyMembers;
export {
  selectMyFamilyMembersDomain,
  selectMembersList,
  selectEditingMember,
};
