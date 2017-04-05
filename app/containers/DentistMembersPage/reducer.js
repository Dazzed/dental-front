/*
Dentist Members Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import findIndex from 'lodash/findIndex';

// local
import {
  // fetch
  FETCH_DENTIST_INFO_SUCCESS,
  FETCH_PATIENTS_SUCCESS,

  // search / sort patients
  SEARCH_MEMBERS,
  SORT_MEMBERS,

  // add / edit member
  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,

  // remove member
  REMOVE_MEMBER_SUCCESS,

  // edit patient profile
  SET_EDITING_PATIENT_PROFILE,
  CLEAR_EDITING_PATIENT_PROFILE,
  EDIT_PATIENT_PROFILE_SUCCESS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  // fetch
  dentistInfo: null,
  patients: null,

  // search / sort patients
  searchName: null,
  sortStatus: "active",

  // add / edit member
  editingActive: false,
  editing: null,
};


/*
Reducers
================================================================================
*/
function dentistMembersPageReducer (state = initialState, action) {
  let memberIdx, patientIdx, prevStatePatient, newStatePatient;

  switch (action.type) {    
    /*
    Fetch
    ------------------------------------------------------------
    */
    case FETCH_DENTIST_INFO_SUCCESS:      
      return {
        ...state,
        dentistInfo: action.payload,
      };

    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: action.payload,
      };

    /*
    Search / Sort Patients
    ------------------------------------------------------------
    */
    case SEARCH_MEMBERS:
      return {
        ...state,
        searchName: action.name !== ""
                      ? action.name
                      : null,
      };

    case SORT_MEMBERS:
      return {
        ...state,
        sortStatus: action.status,
      };

    /*
    Add / Edit Member
    ------------------------------------------------------------
    */
    case SET_EDITING_MEMBER:
      return {
        ...state,
        editingActive: 'member',
        editing: {
          member: action.member,
          patient: action.patient,
        },
      };

    case CLEAR_EDITING_MEMBER:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    case ADD_MEMBER_SUCCESS:
      patientIdx = findIndex(state.patients, { id: action.patient.id });
      prevStatePatient = state.patients[patientIdx];

      newStatePatient = {
        ...prevStatePatient,
        members: [
          ...prevStatePatient.members,
          action.payload,
        ],
      };

      return {
        ...state,
        patients: [
          ...state.patients.slice(0, patientIdx),
          newStatePatient,
          ...state.patients.slice(patientIdx + 1),
        ],
        editingActive: false,
        editing: null,
      };

    case EDIT_MEMBER_SUCCESS:
      patientIdx = findIndex(state.patients, { id: action.patient.id });
      prevStatePatient = state.patients[patientIdx];
      memberIdx = findIndex(prevStatePatient.members, { id: action.payload.id });

      newStatePatient = {
        ...prevStatePatient,
        members: [
          ...prevStatePatient.members.slice(0, memberIdx),
          action.payload,
          ...prevStatePatient.members.slice(memberIdx + 1),
        ],
      };

      return {
        ...state,
        patients: [
          ...state.patients.slice(0, patientIdx),
          newStatePatient,
          ...state.patients.slice(patientIdx + 1),
        ],
        editingActive: false,
        editing: null,
      };

    /*
    Remove Member
    ------------------------------------------------------------
    */
    case REMOVE_MEMBER_SUCCESS:
      patientIdx = findIndex(state.patients, { id: action.patient.id });
      prevStatePatient = state.patients[patientIdx];
      memberIdx = findIndex(prevStatePatient.members, { id: action.memberId });

      newStatePatient = {
        ...prevStatePatient,
        members: [
          ...prevStatePatient.members.slice(0, memberIdx),
          ...prevStatePatient.members.slice(memberIdx + 1),
        ],
      };

      return {
        ...state,
        patients: [
          ...state.patients.slice(0, patientIdx),
          newStatePatient,
          ...state.patients.slice(patientIdx + 1),
        ],
      };

    /*
    Edit Patient Profile
    ------------------------------------------------------------
    */
    case SET_EDITING_PATIENT_PROFILE:
      return {
        ...state,
        editingActive: 'patientProfile',
        editing: action.patient,
      };

    case CLEAR_EDITING_PATIENT_PROFILE:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    case EDIT_PATIENT_PROFILE_SUCCESS:
      patientIdx = findIndex(state.patients, { id: action.payload.id });

      return {
        ...state,
        patients: [
          ...state.patients.slice(0, patientIdx),
          action.payload,
          ...state.patients.slice(patientIdx + 1),
        ],
        editingActive: false,
        editing: null,
      };

    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}

export default dentistMembersPageReducer;
