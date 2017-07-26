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

      adultMonthlyFee: dentistInfo.memberships.find(
          sub => sub.type == 'month' && sub.subscription_age_group === 'adult' && sub.active),
      childMonthlyFee: dentistInfo.memberships.find(
          sub => sub.type == 'month' && sub.subscription_age_group === 'child' && sub.active),
      adultYearlyFee: dentistInfo.memberships.find(
          sub => sub.type == 'year' && sub.subscription_age_group === 'adult' && sub.active),
      childYearlyFee: dentistInfo.memberships.find(
          sub => sub.type == 'year' && sub.subscription_age_group === 'child' && sub.active),

      // TODO: Hardcoded to the first membership for now. Fix this field to
      // distinguish between discounts.
      treatmentDiscount: dentistInfo.memberships[0].discount,
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

  if (initialValues.officeInfo.services) {
    initialValues.officeInfo.services = initialValues.officeInfo.services.filter(service => service != null);
  }
  return initialValues;
};

export default formatDentistEditProfileFormSubmissionData;
