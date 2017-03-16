/*
Dentist New Members Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';

// app
import {
  FETCH_PATIENTS_SUCCESS
} from 'containers/DentistMembersPage/constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  patientsWithNewMembers: null,
};


/*
Reducers
================================================================================
*/
function dentistNewMembersPageReducer (state = initialState, action) {
  switch (action.type) {

    /*
    New Members Reducer
    ------------------------------------------------------------
    */
    case FETCH_PATIENTS_SUCCESS:
      const patients = action.payload;
      const oneMonthAgo = moment().subtract(30, 'days');

      return {
        ...state,

        patientsWithNewMembers: patients.filter((patient) => {
          const patientCreatedAt = moment(patient.createdAt);
          let patientIsNew = patientCreatedAt.isSameOrAfter(oneMonthAgo, 'day');

          return patient.members.reduce((anyMemberIsNew, member) => {
            // precondition: skip checking other members if one is already new,
            // since all of a patient's members will be included in the results
            if (anyMemberIsNew === true) {
              return true;
            }            

            const memberCreatedAt = moment(member.createdAt);
            return memberCreatedAt.isSameOrAfter(oneMonthAgo, 'day');
          }, patientIsNew);
        }),
      };

    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;
  }
}

export default dentistNewMembersPageReducer;
