const compareMembershipChange = (memberships, data) => {
  return memberships.filter(membership => {
    switch (membership.name) {
      case 'default annual membership':
        return membership.price !== data.adultYearlyFee.price;
      case 'default monthly child membership':
        return membership.price !== data.childMonthlyFee.price;
      case 'default monthly membership':
        return membership.price !== data.adultMonthlyFee.price;
      case 'default annual child membership':
        return membership.price !== data.childYearlyFee.price;
      default:
        return false;
    }
  });
};

/*
Dentist Edit Profile Form - Format Submission Data
================================================================================
This is used to format the form data before it is sent to the server.  It must
be called by the `onSubmit` function passed to the `<DentistEditProfileForm>`
component.
*/
const formatDentistEditProfileFormSubmissionData = (data) => {

  const getFee = (feeInfo) => {
    if (!feeInfo || !feeInfo.price) {
      return '';
    }
    return parseFloat(feeInfo.price).toFixed(2);
  }

  /*
  Pre-Processing: Office Images
  ------------------------------------------------------------
  MOVE the office images into an array (part 1).
  */
  let officeImagesIdx = 0;
  const processedOfficeImages = [];
  if (data.officeInfo.officeImages0) {
    processedOfficeImages[officeImagesIdx] = data.officeInfo.officeImages0.url;
    officeImagesIdx++;
  }
  if (data.officeInfo.officeImages1) {
    processedOfficeImages[officeImagesIdx] = data.officeInfo.officeImages1.url;
    officeImagesIdx++;
  }
  if (data.officeInfo.officeImages2) {
    processedOfficeImages[officeImagesIdx] = data.officeInfo.officeImages2.url;
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
      memberships: compareMembershipChange(data.officeInfo.memberships, data.pricing),
      marketplaceOptIn: data.marketplace.optIn === true,

      // MOVE the office images into an array (part 2).
      officeImages: processedOfficeImages,

      // MOVE the fields about children from services to officeInfo.
      acceptsChildren: data.services.acceptsChildren,
      childStartingAge: data.services.childStartingAge, // CONDITIONAL
    },

    pricing: {
      ...data.pricing,

      // ALTER the activated indicators to ensure each value is a boolean.
      adultYearlyFeeActivated: data.pricing.adultYearlyFeeActivated === true,
      childYearlyFeeActivated: data.pricing.childYearlyFeeActivated === true,

      // ALTER the fees: normalize the price values.
      adultMonthlyFee: getFee(data.pricing.adultMonthlyFee),
      childMonthlyFee: getFee(data.pricing.childMonthlyFee),
      adultYearlyFee: getFee(data.pricing.adultYearlyFee), // CONDITIONAL
      childYearlyFee: getFee(data.pricing.childYearlyFee), // CONDITIONAL
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

  // if (processedData.pricing.adultYearlyFeeActivated === false) {
  //   delete processedData.pricing.adultYearlyFee;
  // }
  // if (processedData.pricing.childYearlyFeeActivated === false) {
  //   delete processedData.pricing.childYearlyFee;
  // }

  return processedData;
};

export default formatDentistEditProfileFormSubmissionData;
