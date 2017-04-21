/*
Dentist Signup Form - Format Submission Data
================================================================================
This is used to format the form data before it is sent to the server.  It must
be called by the `onSubmit` function passed to the `<DentistSignupForm>`
component.
*/
const formatDentistSignupFormSubmissionData = (data) => {

  // The User needs a zipCode.
  data.user.zipCode = data.officeInfo.zipCode;

  // Move the specialtyId field from officeInfo to user.
  data.user.specialtyId = data.officeInfo.specialtyId;
  delete data.officeInfo.specialtyId;

  // Put the office images in an array.
  let officeImagesIdx = 0;
  data.officeInfo.officeImages = [];

  if (data.officeInfo.officeImages0) {
    data.officeInfo.officeImages[officeImagesIdx] = data.officeInfo.officeImages0;
    officeImagesIdx++;
  }
  delete data.officeInfo.officeImages0;

  if (data.officeInfo.officeImages1) {
    data.officeInfo.officeImages[officeImagesIdx] = data.officeInfo.officeImages1;
    officeImagesIdx++;
  }
  delete data.officeInfo.officeImages1;

  if (data.officeInfo.officeImages2) {
    data.officeInfo.officeImages[officeImagesIdx] = data.officeInfo.officeImages2;
    officeImagesIdx++;
  }
  delete data.officeInfo.officeImages2;

  // Move the fields about children from services to officeInfo.
  data.officeInfo.acceptsChildren = data.services.acceptsChildren;
  delete data.services.acceptsChildren;
  data.officeInfo.childStartingAge = data.services.childStartingAge;
  delete data.services.childStartingAge;

  if (data.officeInfo.acceptsChildren === false) {
    delete data.officeInfo.childStartingAge;
  }

  // Normalize pricing values.  Reformat the pricing codes from an object
  // with code => amount entries to an array of objects, one per price code.
  data.pricing = {
    ...data.pricing, // just incase another field is accidentally added to the form but not added here

    codes: Object.keys(data.pricing.codes).map((code) => {
      const amount = data.pricing.codes[code];
      return {
        code: code.substr(1), // "D1234" => "1234"
        amount: parseFloat(amount).toFixed(2),
      };
    }),

    adultMonthlyFee: parseFloat(data.pricing.adultMonthlyFee).toFixed(2),
    childMonthlyFee: parseFloat(data.pricing.childMonthlyFee).toFixed(2),
    adultYearlyFee: parseFloat(data.pricing.adultYearlyFee).toFixed(2),
    childYearlyFee: parseFloat(data.pricing.childYearlyFee).toFixed(2),

    adultYearlyFeeActivated: data.pricing.adultYearlyFeeActivated === true || false,
    childYearlyFeeActivated: data.pricing.childYearlyFeeActivated === true || false,

    treatmentDiscount: data.pricing.treatmentDiscount,
  };

  // Remove unactivated yearly fee amounts.
  if (data.pricing.adultYearlyFeeActivated === false) {
    delete data.pricing.adultYearlyFee;
  }
  if (data.pricing.childYearlyFeeActivated === false) {
    delete data.pricing.childYearlyFee;
  }

  // The server needs an array of Service ids. Redux-Form will only included
  // checked Services, so no filtering is necessary.
  data.services = Object.keys(data.services).map((serviceId) => {
    return serviceId.substr(8); // "service-51" => "51"
  });

  // The server needs an array of WorkingHours objects, not an object of them
  // indexed by day name.
  data.workingHours = Object.keys(data.workingHours).map((dayName) => {
    const dayHours = data.workingHours[dayName];
    dayHours.day = dayName;

    if (dayHours.isOpen === false) {
      delete dayHours.startAt;
      delete dayHours.endAt;
    }

    return dayHours;
  });

  return data;
};

export default formatDentistSignupFormSubmissionData;
