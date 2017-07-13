/*
Dentist Edit Profile Form - Format Initial Values
================================================================================
This is used to format the existing dentist / dentistInfo objects so they are
compatible with the form.
*/
const formatDentistEditProfileFormSubmissionData = (dentist, dentistInfo) => {
  const initialValues = {

    user: {
      ...dentist,
    },

    officeInfo: {
      ...dentistInfo,

      specialtyId: dentist.specialtyId,
      officeImages0: dentistInfo.officeImages[0],
      officeImages1: dentistInfo.officeImages[1],
      officeImages2: dentistInfo.officeImages[2],
    },

    pricing: {
      codes: dentistInfo.priceCodes,

      /*
      dentistInfo.priceCodes.reduce((priceCodesObj, priceCodeEntry) => {
        const key = "D" + priceCodeEntry.code;
        priceCodesObj[key] = priceCodeEntry.price;
        return priceCodesObj;
      }, {}),
      */

      adultYearlyFeeActivated: dentistInfo.membership.adultYearlyFeeActivated,
      childYearlyFeeActivated: dentistInfo.childMembership.childYearlyFeeActivated,

      adultMonthlyFee: dentistInfo.membership.monthly,
      childMonthlyFee: dentistInfo.childMembership.monthly,
      adultYearlyFee: dentistInfo.membership.yearly,
      childYearlyFee: dentistInfo.childMembership.yearly,

      treatmentDiscount: dentistInfo.membership.discount,
    },

    marketplace: {
      optIn: dentistInfo.marketplaceOptIn,
    },

    // TODO: BE needs to send services, and then likely need to reverse the "format-submission-data" process
    services: {
      acceptsChildren: dentistInfo.acceptsChildren,
      childStartingAge: dentistInfo.childStartingAge,
    },

    workingHours: dentistInfo.workingHours.reduce((workingHoursObj, workingHoursEntry) => {
      workingHoursObj[workingHoursEntry.day] = {
        isOpen: workingHoursEntry.isOpen,
        startAt: workingHoursEntry.startAt,
        endAt: workingHoursEntry.endAt,
      };

      return workingHoursObj;
    }, {}),
  };

  return initialValues;
};

export default formatDentistEditProfileFormSubmissionData;
