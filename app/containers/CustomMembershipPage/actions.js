import { createAction } from 'redux-act';

const fetchDentistInfo = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_FETCH_DENTIST_INFO'
);
const fetchDentistInfoSuccess = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_FETCH_DENTIST_INFO_SUCCESS',
  dentistInfo => dentistInfo
);
const fetchDentistInfoError = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_FETCH_DENTIST_INFO_ERROR'
);

const createMembership = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_CREATE_MEMBERSHIP',
  values => values
);
const createMembershipSuccess = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_CREATE_MEMBERSHIP_SUCCESS'
);
const createMembershipError = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_CREATE_MEMBERSHIP_ERROR'
);

const editMembership = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_EDIT_MEMBERSHIP',
  values => values
);
const editMembershipSuccess = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_EDIT_MEMBERSHIP_SUCCESS',
  (values) => values
);
const editMembershipError = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_EDIT_MEMBERSHIP_ERROR',
  values => values
);
const setEditingMembershipId = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_SET_EDITING_MEMBERSHIP',
  id => id
);

const deleteMembership = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_DELETE_MEMBERSHIP',
  id => id
);
const deleteMembershipSuccess = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_DELETE_MEMBERSHIP_SUCCESS',
  (values) => values
);
const deleteMembershipError = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_DELETE_MEMBERSHIP_ERROR',
  values => values
);
const setDeletingMembershipId = createAction(
  'CUSTOM_MEMBERSHIP_PAGE_SET_DELETING_MEMBERSHIP',
  id => id
);

export {
  fetchDentistInfo,
  fetchDentistInfoSuccess,
  fetchDentistInfoError,

  createMembership,
  createMembershipSuccess,
  createMembershipError,

  editMembership,
  editMembershipSuccess,
  editMembershipError,
  setEditingMembershipId,

  deleteMembership,
  deleteMembershipSuccess,
  deleteMembershipError,
  setDeletingMembershipId
};

