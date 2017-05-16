/*
Dentist Signup Form - Format Submission Data
================================================================================
This is used to format the form data before it is sent to the server.  It must
be called by the `onSubmit` function passed to the `<DentistSignupForm>`
component.
*/
const formatDentistSignupFormSubmissionData = (data) => {

  /*
  Pre-Processing: Office Images
  ------------------------------------------------------------
  MOVE the office images into an array (part 1).
  */
  let officeImagesIdx = 0;
  const processedOfficeImages = [];
  if (data.officeInfo.officeImages0) {
    processedOfficeImages[officeImagesIdx] = data.officeInfo.officeImages0;
    officeImagesIdx++;
  }
  if (data.officeInfo.officeImages1) {
    processedOfficeImages[officeImagesIdx] = data.officeInfo.officeImages1;
    officeImagesIdx++;
  }
  if (data.officeInfo.officeImages2) {
    processedOfficeImages[officeImagesIdx] = data.officeInfo.officeImages2;
    officeImagesIdx++;
  }

  /*
  Processing
  ------------------------------------------------------------
  Create / modify the `data` in a new object, so that the original `data`
  object isn't disturbed.  Modifying it directly causes problems on the form
  if the submission fails and the user needs to go back and edit / resubmit.
  */
  const processedData = {
    ...data,

    user: {
      ...data.user,

      // COPY the zipCode from officeInfo- both `user` and `officeInfo` need it.
      zipCode: data.officeInfo.zipCode,

      // MOVE the specialtyId field from officeInfo to user.
      specialtyId: data.officeInfo.specialtyId,      
    },

    officeInfo: {
      ...data.officeInfo,

      // MOVE the office images into an array (part 2).
      officeImages: processedOfficeImages,

      // MOVE the fields about children from services to officeInfo.
      acceptsChildren: data.services.acceptsChildren,
      childStartingAge: data.services.childStartingAge, // CONDITIONAL
    },

    pricing: {
      ...data.pricing,

      // ALTER the pricing codes from an object with code => amount entries
      // to an array of objects, one per price code.  Also normalize the code
      // names and the price values.
      //
      // { "D1234": 12.5, ... } => [{ code: "1234", price: "12.50" }, ...]
      codes: Object.keys(data.pricing.codes).map((code) => {
        const amount = data.pricing.codes[code];
        return {
          code: code.substr(1), // "D1234" => "1234"
          amount: parseFloat(amount).toFixed(2),
        };
      }),

      // ALTER the activated indicators to ensure each value is a boolean.
      adultYearlyFeeActivated: data.pricing.adultYearlyFeeActivated === true,
      childYearlyFeeActivated: data.pricing.childYearlyFeeActivated === true,

      // ALTER the fees: normalize the price values.
      adultMonthlyFee: parseFloat(data.pricing.adultMonthlyFee).toFixed(2),
      childMonthlyFee: parseFloat(data.pricing.childMonthlyFee).toFixed(2),
      adultYearlyFee: parseFloat(data.pricing.adultYearlyFee).toFixed(2), // CONDITIONAL
      childYearlyFee: parseFloat(data.pricing.childYearlyFee).toFixed(2), // CONDITIONAL
    },

    marketplace: {
      ...data.marketplace,

      // ALTER the marketplace optIn to ensure the value is a boolean.
      optIn: data.marketplace.optIn === true,
    },

    // ALTER the services from an object with serviceKey => bool entries
    // to an array of serviceIds.  Note that redux-form will only include
    // checked Services, so no filtering is necessary.
    //
    // { "service-51": true, ... } => [ 51, ... ]
    services: Object.keys(data.services).map((serviceId) => {
      if (serviceId !== "acceptsChildren" && serviceId !== "childStartingAge") {
        return serviceId.substr(8); // "service-51" => "51"
      }
    }),

    // ALTER the workingHours from an object with dayName => dayWorkingHours
    // to an array of dayWorkingHours objects that include the dayName as the
    // `day` field.  Also ensure that `isOpen` is a boolean, and conditionally
    // remove the `startAt` and `endAt` fields if they aren't needed.
    //
    // { "monday": { "isOpen": true, "startAt": "13:06:00", "endAt": "16:30:00" }, ... }
    //     => [{ "day": "monday", "isOpen": true, "startAt": "13:06:00", "endAt": "16:30:00" }, ...]
    //
    // { "monday": { "isOpen": false, "startAt": "10:01:00", "endAt": "16:30:00" }, ... }
    //     => [{ "day": "monday", "isOpen": false }, ...]
    workingHours: Object.keys(data.workingHours).map((dayName) => {
      const dayHours = data.workingHours[dayName];
      const processedDay = {
        ...dayHours,

        day: dayName,
        isOpen: dayHours.isOpen === true,
      };

      if (processedDay.isOpen === false) {
        delete processedDay.startAt;
        delete processedDay.endAt;
      }

      return processedDay;
    }),

  }; // end processedData

  /*
  Post-Processing: Cleanup MOVE Operations
  ------------------------------------------------------------
  */
  delete processedData.officeInfo.specialtyId;

  delete processedData.officeInfo.officeImages0;
  delete processedData.officeInfo.officeImages1;
  delete processedData.officeInfo.officeImages2;

  // NOTE: `services` is ALTERED in the processedData, and the original object
  //       is replaced with an array.  Thus these fields will no longer exist
  //       so there is no need to delete them.  The commented code immediately
  //       following this note is left in on purpose, to illustrate what would
  //       need to happen otherwise.

  // delete processedData.services.acceptsChildren;
  // delete processedData.services.childStartingAge;

  /*
  Post-Processing: Handle CONDITIONAL Fields
  ------------------------------------------------------------
  Exclude them if they aren't needed.  Set them to a default value if they
  are needed but shouldn't be set.
  */
  if (processedData.officeInfo.acceptsChildren === false) {
    delete processedData.officeInfo.childStartingAge;
  }

  if (processedData.pricing.adultYearlyFeeActivated === false) {
    delete processedData.pricing.adultYearlyFee;
  }
  if (processedData.pricing.childYearlyFeeActivated === false) {
    delete processedData.pricing.childYearlyFee;
  }

  return processedData;
};

export default formatDentistSignupFormSubmissionData;
