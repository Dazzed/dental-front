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
  DENTIST_SPECIALTIES_SUCCESS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_DENTIST_REPORTS_SUCCESS,

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

  // edit patient payment info
  SET_EDITING_PATIENT_PAYMENT,
  CLEAR_EDITING_PATIENT_PAYMENT,

  // waive patient fees
  TOGGLE_WAIVE_PATIENT_FEES_SUCCESS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  // fetch
  dentistInfo: null,
  patients: null,
  dentistReports: null,
  dentistSpecialties: [],

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
  let memberIdx, patients, patientIdx, prevStatePatient, newStatePatient;

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

    case DENTIST_SPECIALTIES_SUCCESS:
      return {
        ...state,
        dentistSpecialties: action.payload.sort((specialtyA, specialtyB) => {
          const specialtyAName = specialtyA.name.toLowerCase();
          const specialtyBName = specialtyB.name.toLowerCase();
 
          if (specialtyAName < specialtyBName) {
            return -1;
          }
          else if (specialtyAName > specialtyBName) {
            return 1;
          }
          return 0; // specialtyAName === specialtyBName
        }),
      };

    case FETCH_PATIENTS_SUCCESS:
      patients = action.payload.map((patient) => {
        return {
          ...patient,
          members: [ // TODO: remove main account holder insert from members?
            ...patient.members,
            patient,
          ],
        };
      });

      return {
        ...state,
        patients,
      };

    case FETCH_DENTIST_REPORTS_SUCCESS:
      return {
        ...state,
        dentistReports: action.payload.reverse(),
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
        onSubmitCb: action.callback,
        editing: {
          member: action.member,
          patient: action.patient
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

      // rebuild the updated patient's members list (and add them to the list)
      newStatePatient = {
        ...action.payload,
        members: [
          ...action.payload.members, // TODO: remove main account holder insert from members?
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

    /* Edit Patient Payment Info
     * ------------------------------------------------------ */
    case SET_EDITING_PATIENT_PAYMENT:
      return {
        ...state,
        editingActive: 'patientPayment',
        editing: {
          patient: action.patient,
          paymentInfo: action.paymentInfo,
        },
      };

    case CLEAR_EDITING_PATIENT_PAYMENT:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    // don't store payment info after the form is submitted

    /*
    Toggle Waive Patient Fees
    ------------------------------------------------------------
    */
    case TOGGLE_WAIVE_PATIENT_FEES_SUCCESS:
      patientIdx = findIndex(state.patients, { id: action.patient.id });
      prevStatePatient = state.patients[patientIdx];

      return {
        ...state,
        patients: [
          ...state.patients.slice(0, patientIdx),
          {
            ...prevStatePatient,
            cancellationFee: action.payload.cancellationFee,
            reEnrollmentFee: action.payload.reEnrollmentFee,
          },
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
