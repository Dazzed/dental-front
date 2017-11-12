/*
Patient Membership Info Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import { createSelector } from 'reselect';

// app
import { selectCurrentUser } from 'containers/App/selectors';
import {
  dentistSelector,
  membersSelector,
} from 'containers/PatientProfilePage/selectors';

/*
Selectors
------------------------------------------------------------
*/
const domainSelector = state => state.patientProfilePage;

/*
Data Loaded
------------------------------------------------------------
*/
const selectDataLoaded = createSelector(
  selectCurrentUser,
  dentistSelector,
  membersSelector,
  (user, dentist, members) => {
    return user !== false && dentist !== false && members !== false;
  }
);

/* Savings
 * ------------------------------------------------------ */
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
  selectDataLoaded,
  dentistSavingsSelector,
};

/* Helpers
 * ------------------------------------------------------ */
function convertPriceCodeArrayToObject (priceCodes) {
  return priceCodes
    .reduce((acc, priceCode) => {
      const { code, price } = priceCode;
      acc[`D${code}`] = parseFloat(price);
      return acc;
    }, {});
}
