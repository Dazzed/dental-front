/*
Patient Profile Page Constants
================================================================================
*/

/* eslint-disable no-multi-spaces */

// fetch dentist
export const DENTIST_REQUEST = 'app/PatientProfilePage/DENTIST_REQUEST';
export const DENTIST_SUCCESS = 'app/PatientProfilePage/DENTIST_SUCCESS';
export const DENTIST_ERROR   = 'app/PatientProfilePage/DENTIST_ERROR';

// fetch members
export const FAMILY_MEMBERS_REQUEST = 'app/PatientProfilePage/FAMILY_MEMBERS_REQUEST';
export const FAMILY_MEMBERS_SUCCESS = 'app/PatientProfilePage/FAMILY_MEMBERS_SUCCESS';
export const FAMILY_MEMBERS_ERROR   = 'app/PatientProfilePage/FAMILY_MEMBERS_ERROR';

// add / edit member
export const SET_EDITING_MEMBER   = 'app/PatientProfilePage/SET_EDITING_MEMBER';
export const CLEAR_EDITING_MEMBER = 'app/PatientProfilePage/CLEAR_EDITING_MEMBER';
export const SUBMIT_MEMBER_FORM   = 'app/PatientProfilePage/SUBMIT_MEMBER_FORM';
export const ADD_MEMBER_SUCCESS   = 'app/PatientProfilePage/ADD_MEMBER_SUCCESS';
export const EDIT_MEMBER_SUCCESS  = 'app/PatientProfilePage/EDIT_MEMBER_SUCCESS';

// remove member
export const REMOVE_MEMBER_REQUEST = 'app/PatientProfilePage/REMOVE_MEMBER_REQUEST';
export const REMOVE_MEMBER_SUCCESS = 'app/PatientProfilePage/REMOVE_MEMBER_SUCCESS';

// edit profile
export const SET_EDITING_PROFILE   = 'app/PatientProfilePage/SET_EDITING_PROFILE';
export const CLEAR_EDITING_PROFILE = 'app/PatientProfilePage/CLEAR_EDITING_PROFILE';
export const SUBMIT_PROFILE_FORM   = 'app/PatientProfilePage/SUBMIT_PROFILE_FORM';
// update user data at App level, see SET_USER_DATA in `/app/containers/App/constants.js`

// add / edit review
export const SET_EDITING_REVIEW   = 'app/PatientProfilePage/SET_EDITING_REVIEW';
export const CLEAR_EDITING_REVIEW = 'app/PatientProfilePage/CLEAR_EDITING_REVIEW';
export const SUBMIT_REVIEW_FORM   = 'app/PatientProfilePage/SUBMIT_CLIENT_REVIEW_FORM';
export const ADD_REVIEW_SUCCESS  = 'app/PatientProfilePage/ADD_REVIEW_SUCCESS';
export const EDIT_REVIEW_SUCCESS  = 'app/PatientProfilePage/EDIT_REVIEW_SUCCESS';

// remove review
export const REMOVE_REVIEW_REQUEST = 'app/PatientProfilePage/REMOVE_REVIEW_REQUEST';
export const REMOVE_REVIEW_SUCCESS = 'app/PatientProfilePage/REMOVE_REVIEW_SUCCESS';

// edit security settings
export const SET_EDITING_SECURITY   = 'app/PatientProfilePage/SET_EDITING_SECURITY';
export const CLEAR_EDITING_SECURITY = 'app/PatientProfilePage/CLEAR_EDITING_SECURITY';
export const SUBMIT_SECURITY_FORM   = 'app/PatientProfilePage/SUBMIT_SECURITY_FORM';
// update user data at App level, see SET_USER_DATA in `/app/containers/App/constants.js`

// edit payment info
export const SET_EDITING_PAYMENT   = 'app/PatientProfilePage/SET_EDITING_PAYMENT';
export const CLEAR_EDITING_PAYMENT = 'app/PatientProfilePage/CLEAR_EDITING_PAYMENT';
export const SUBMIT_PAYMENT_FORM   = 'app/PatientProfilePage/SUBMIT_PAYMENT_FORM';
// don't store payment info locally
