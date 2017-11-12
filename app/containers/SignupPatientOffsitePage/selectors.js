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

const dentistSavingsSelector = createSelector(
  domainSelector,
  (substate) => {
    const savings = {
      monthly: {
        adult: null,
        child: null,
      },
      yearly: {
        adult: null,
        child: null,
      }
    };
    const { dentist } = substate;

    // precondition: return default savings values if the dentist hasn't loaded yet
    if (dentist === false) {
      return savings;
    }

    const { priceCodes } = dentist.dentistInfo;
    const priceCodeObject = convertPriceCodeArrayToObject(priceCodes);
    const {
      D1110,
      D0120,
      D0274,
      D0330,
      D0220,
      D0140,
      D1120,
      D0272,
      D1206
    } = priceCodeObject;
    let adultSavings = (D1110 * 2) + (D0120 * 2) + D0274 + (D0330 * 0.3) + D0220 + D0140;
    let childSavings = (D1120 * 2) + (D0120 * 2) + D0272 + (D0330 * 0.3) + D0220 + D0140 + D1206;

    const memberships = dentist.memberships.filter(m => m.active);

    const standardMonthlyMembership = memberships.find(m => m.subscription_age_group === 'adult' && m.type === 'month');
    if (standardMonthlyMembership) {
      savings.monthly.adult = (adultSavings - parseFloat(standardMonthlyMembership.price * 12)).toFixed(2);
      if (savings.monthly.adult < 0) {
        savings.monthly.adult = 0;
      }
    }

    const standardMonthlyChildMembership = memberships.find(m => m.subscription_age_group === 'child' && m.type === 'month');
    if (standardMonthlyChildMembership) {
      savings.monthly.child = (childSavings - parseFloat(standardMonthlyChildMembership.price * 12)).toFixed(2);
      if (savings.monthly.child < 0) {
        savings.monthly.child = 0;
      }
    }

    const standardAnnualMembership = memberships.find(m => m.subscription_age_group === 'adult' && m.type === 'year');
    if (standardAnnualMembership) {
      savings.yearly.adult = (adultSavings - parseFloat(standardAnnualMembership.price)).toFixed(2);
      if (savings.yearly.adult < 0) {
        savings.yearly.adult = 0;
      }
    }

    const standardAnnualChildMembership = memberships.find(m => m.subscription_age_group === 'child' && m.type === 'year');
    if (standardAnnualChildMembership) {
      savings.yearly.child = (childSavings - parseFloat(standardAnnualChildMembership.price)).toFixed(2);
      if (savings.yearly.child < 0) {
        savings.yearly.child = 0;
      }
    }

    return savings;
  }
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
  dentistSavingsSelector
}

function replaceDefaultToStandard (memberships) {
  if (memberships) {
    return memberships.map(m => {
      return {
        ...m,
        name: m.name.replace('default', 'standard')
      };
    });
  } else {
    return memberships;
  }
}

function convertPriceCodeArrayToObject (priceCodes) {
  return priceCodes
    .reduce((acc, priceCode) => {
      const { code, price } = priceCode;
      acc[`D${code}`] = parseFloat(price);
      return acc;
    }, {});
}
