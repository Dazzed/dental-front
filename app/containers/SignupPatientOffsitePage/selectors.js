/*
Patient Offsite Signup Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import { createSelector } from 'reselect';


/*
Selectors
================================================================================
*/
const domainSelector = state => state.signupPatientOffsitePage;

/*
Fetch Dentist
------------------------------------------------------------
*/
const dentistSelector = createSelector(
  domainSelector,
  (substate) => {
    let { dentist } = substate;
    if (dentist) {
      if (dentist.memberships) {
        dentist.memberships = replaceDefaultToStandard(dentist.memberships);
      }
    }
    return dentist;
   }
);

const dentistErrorSelector = createSelector(
  domainSelector,
  (substate) => { return substate.dentistError; }
);

/*
Fetch Members
------------------------------------------------------------
*/
const membersSelector = createSelector(
  domainSelector,
  dentistSelector,
  (substate, dentist) => {
    // precondition: the dentist hasn't been fetched yet
    if (dentist === false) {
      return [];
    }

    // fake a subscription so we can calculate the cost of the membership and
    // other subscription-like info
    const members = substate.user.members.map((member) => {
      const age = moment().diff(moment(member.birthDate), 'years');
      const membership = age <= 13
                       ? dentist.dentistInfo.childMembership
                       : dentist.dentistInfo.membership;

      return {
        ...member,
        subscription: {
          ...membership,
          status: "signup",
        }
      };
    });

    return members;
  }
);

const sortedMembersSelector = createSelector(
  membersSelector,

  (members) => {
    members.sort((a, b) => {
      const aName = (a.firstName + a.lastName).toLowerCase();
      const bName = (b.firstName + b.lastName).toLowerCase();

      if (aName < bName) {
        return -1;
      }
      if (aName > bName) {
        return 1;
      }

      return 0;
    });

    return members;
  }
);

/*
Fetch Stages
------------------------------------------------------------
*/
const stagesSelector = createSelector(
  domainSelector,
  (substate) => { return substate.stages; }
);

/*
Fetch User
------------------------------------------------------------
*/
const userSelector = createSelector(
  domainSelector,
  dentistSelector,
  sortedMembersSelector,
  (substate, dentist, sortedMembers) => {
    // precondition: the dentist hasn't been fetched yet
    if (dentist === false) {
      return {
        ...substate.user,
        members: sortedMembers,
      };
    }

    // fake a subscription so we can calculate the cost of the membership and
    // other subscription-like info
    const age = moment().diff(moment(substate.user.birthDate), 'years');
    const membership = age <= 13
                     ? dentist.dentistInfo.childMembership
                     : dentist.dentistInfo.membership;

    return {
      ...substate.user,
      dentistId: dentist.id,
      members: sortedMembers,
      subscription: {
        ...membership,
        status: "signup",
      }
    };
  }
);

/*
Add / Edit
------------------------------------------------------------
*/
const editingMemberSelector = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'member') {
      return substate.editing;
    }

    return null;
  }
);

const editingCheckoutSelector = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'checkout') {
      return substate.editing;
    }

    return null;
  }
);

/*
Signup
------------------------------------------------------------
*/
const accountInfoSelector = createSelector(
  domainSelector,
  (substate) => substate.accountInfo,
);

const isSignedUpSelector = createSelector(
  domainSelector,
  (substate) => substate.patientCreated,
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  // fetch dentist
  dentistSelector,
  dentistErrorSelector,

  // fetch members
  membersSelector,
  sortedMembersSelector,

  // fetch stages
  stagesSelector,

  // fetch user
  userSelector,

  // add / edit
  editingMemberSelector,
  editingCheckoutSelector,

  // signup
  accountInfoSelector,
  isSignedUpSelector,
}

function replaceDefaultToStandard(memberships) {
  if (memberships) {
    return memberships.map(m => {
      return {
        ...m,
        name: m.name.replace('default','standard')
      };
    });
  } else {
    return memberships;
  }
}
