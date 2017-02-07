/*
Patient Family Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  FAMILY_MEMBERS_REQUEST,
  FAMILY_MEMBERS_SUCCESS,
  FAMILY_MEMBERS_ERROR,
} from './constants';

export function fetchFamilyMembers() {
  return {
    type: FAMILY_MEMBERS_REQUEST,
  };
}

export function setFamilyMembers (payload) {
  return {
    type: FAMILY_MEMBERS_SUCCESS,
    payload,
  };
}

export function setFamilyMembersErrors (payload) {
  return {
    type: FAMILY_MEMBERS_ERROR,
    payload,
  };
}
