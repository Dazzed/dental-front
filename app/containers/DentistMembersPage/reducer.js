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
import get from 'lodash/get';

// local
import {
  // fetch
  FETCH_DENTIST_INFO_SUCCESS,
  DENTIST_SPECIALTIES_SUCCESS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_REQUEST,
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

  // edit security
  SET_EDITING_SECURITY,
  CLEAR_EDITING_SECURITY,
} from './constants';

import { setRecurringDate } from './helpers';
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

  editingActive: false,
  editing: null,
};


/*
Reducers
================================================================================
*/
function dentistMembersPageReducer(state = initialState, action) {
  let memberIdx, patients, patientIdx, prevStatePatient, newStatePatient, memberId;
  let member, newMembershipPlan;

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

          // set easy access to the patient's address and phone number
          address: get(patient, 'addresses[0].value'),
          phone: get(patient, 'phoneNumbers[0].number'),
          addresses: undefined,
          phoneNumbers: undefined,
        };
      });

      return {
        ...state,
        patients,
      };

    case FETCH_DENTIST_REPORTS_SUCCESS:
      return {
        ...state,
        dentistReports: action.payload,
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
      patientIdx = state.patients.findIndex(p => p.id === action.patient.id);
      prevStatePatient = state.patients[patientIdx];
      let alteredPayload = action.payload;
      alteredPayload.subscription = alteredPayload.clientSubscription;
      alteredPayload.subscription.status = 'active';

      newStatePatient = {
        ...prevStatePatient,
        members: prevStatePatient.members.concat(alteredPayload),
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
      memberId = action.memberId || action.payload.id;
      patientIdx = state.patients.findIndex(p => p.id === action.patient.id);
      prevStatePatient = state.patients[patientIdx];
      // If we are editing Primary account holder.
      if (prevStatePatient.id === memberId) {
        prevStatePatient.subscription.status = 'active';
        prevStatePatient.subscription.membershipId = action.payload.membershipId;
        prevStatePatient.subscription = action.subscription;
      } else {
        memberIdx = prevStatePatient.members.findIndex(m => m.id === memberId);
        member = prevStatePatient.members[memberIdx];
        prevStatePatient.members[memberIdx].subscription.status = 'active';
        prevStatePatient.members[memberIdx].subscription.membershipId = action.payload.membershipId;
        prevStatePatient.members[memberIdx].subscription = action.subscription;
      }
      newStatePatient = setRecurringDate(prevStatePatient);
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
      patientIdx = state.patients.findIndex(p => p.id === action.patient.id);
      prevStatePatient = state.patients[patientIdx];
      // If we are cancelling Primary account holder.
      if (prevStatePatient.id === action.memberId) {
        prevStatePatient.subscription.status = 'cancellation_requested';
      } else {
        memberIdx = prevStatePatient.members.findIndex(m => m.id === action.memberId);
        member = prevStatePatient.members[memberIdx];
        prevStatePatient.members[memberIdx].subscription.status = 'cancellation_requested';
      }
      newStatePatient = prevStatePatient;
      return {
          ...state,
        patients: [
          ...state.patients.slice(0, patientIdx),
          newStatePatient,
          ...state.patients.slice(patientIdx + 1),
        ]
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
      patientIdx = state.patients.findIndex(patient => patient.id === action.payload.id);

      return {
        ...state,
        editingActive: false,
        editing: null,
        patients: [
          ...state.patients.slice(0, patientIdx),
          action.payload,
          ...state.patients.slice(patientIdx + 1),
        ],
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
      // patientIdx = findIndex(state.patients, { id: action.patient.id });
      patientIdx = state.patients.findIndex(patient => patient.id === action.patient.id);
      prevStatePatient = state.patients[patientIdx];

      return {
        ...state,
        patients: [
          ...state.patients.slice(0, patientIdx),
          {
            ...prevStatePatient,
            cancellationFeeWaiver: action.payload.cancellationFeeWaiver,
            reEnrollmentFeeWaiver: action.payload.reEnrollmentFeeWaiver,
          },
          ...state.patients.slice(patientIdx + 1),
        ],
      };

    /*
    Edit Security
    ------------------------------------------------------------
    */
    case SET_EDITING_SECURITY:
      return {
        ...state,
        editingActive: 'security',
        editing: action.securityInfo,
      };

    case CLEAR_EDITING_SECURITY:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    // update user data at App level, see SET_USER_DATA in `/app/containers/App/reducer.js`

    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
return state;

  }
}

export default dentistMembersPageReducer;
