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
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  // fetch
  patients: null,

  // search / sort patients
  searchName: null,
  sortStatus: "active",

  // add / edit member
  editingActive: false,
  editingMember: null,
  editingPatient: null,
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
        editingActive: true,
        editingMember: action.member,
        editingPatient: action.patient,
      };

    case CLEAR_EDITING_MEMBER:
      return {
        ...state,
        editingActive: false,
        editingMember: null,
        editingPatient: null,
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
        editingMember: null,
        editingPatient: null,
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
        editingMember: null,
        editingPatient: null,
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
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}

export default dentistMembersPageReducer;
