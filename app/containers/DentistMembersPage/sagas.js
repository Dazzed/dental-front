/*
Dentist Members Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { change, stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';

// app
import {
  // edit security
  setUserData,
} from 'containers/App/actions';
import request from 'utils/request';

// local
import {
  fetchDentistInfoSuccess,
  fetchDentistInfoError,

  dentistSpecialtiesSuccess,

  fetchPatientsSuccess,
  fetchPatientsError,

  fetchDentistReportsSuccess,
  fetchDentistReportsError,

  setAddedMember,
  setEditedMember,
  setRemovedMember,

  setEditedPatientProfile,
  clearEditingPatientPayment,
  setToggledWaivePatientFees,

  downloadReportSuccess,
  downloadReportFailure,

  // upload image
  uploadImageSuccess,

  // signup
  signupSuccess,

  // edit security
  clearEditingSecurity,
} from './actions';
import {
  FETCH_DENTIST_INFO_REQUEST,
  DENTIST_SPECIALTIES_REQUEST,
  FETCH_PATIENTS_REQUEST,
  FETCH_DENTIST_REPORTS_REQUEST,

  SUBMIT_MEMBER_FORM,
  REMOVE_MEMBER_REQUEST,

  SUBMIT_PATIENT_PROFILE_FORM,
  SUBMIT_PATIENT_PAYMENT_FORM,
  TOGGLE_WAIVE_PATIENT_FEES_REQUEST,

  DOWNLOAD_REPORT_REQUEST,

  // upload image
  UPLOAD_IMAGE_REQUEST,

  // signup
  DENTIST_SIGNUP_REQUEST,

  // edit security
  SUBMIT_SECURITY_FORM,

  // images deletion
  DELETE_OFFICE_LOGO,
  DELETE_DENTIST_AVATAR,
  DELETE_DENTIST_OFFICE_IMAGE,
} from './constants';


/*
Sagas
================================================================================
*/
// Bootstrap sagas
export default [
  main,
];

function* main () {
  const watcherA = yield fork(dentistInfoFetcher);
  const watcherB = yield fork(fetchDentistSpecialties);
  const watcherC = yield fork(patientsFetcher);
  const watcherD = yield fork(dentistReportsFetcher);
  const watcherE = yield fork(submitMemberFormWatcher);
  const watcherF = yield fork(removeMemberWatcher);
  const watcherG = yield fork(submitPatientProfileFormWatcher);
  const watcherH = yield fork(submitPatientPaymentFormWatcher);
  const watcherI = yield fork(toggleWaivePatientFeesWatcher);
  const watcherJ = yield fork(downloadReport);
  const watcherK = yield fork(uploadImageWatcher);
  const watcherL = yield fork(signupWatcher);
  const watcherM = yield fork(submitAccountSecurityFormWatcher);
  const watcherN = yield fork(deleteLogoWatcher);
  const watcherO = yield fork(deleteAvatarWatcher);
  const watcherP = yield fork(deleteOfficeImagesWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
  yield cancel(watcherH);
  yield cancel(watcherI);
  yield cancel(watcherJ);
  yield cancel(watcherK);
  yield cancel(watcherL);
  yield cancel(watcherM);
}

/*
Fetch Dentist Info
------------------------------------------------------------
*/
function* dentistInfoFetcher () {
  yield* takeLatest(FETCH_DENTIST_INFO_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/users/me/dentist-info')
      Stripe.setPublishableKey(response.stripe_public_key || 'pk_test_6pRNASCoBOKtIshFeQd4XMUh');
      yield put(fetchDentistInfoSuccess(response.data));
    }
    catch (error) {
      yield put(fetchDentistInfoError(error));
    }
  });
}

/* Fetch Dentist Specialties
 * ------------------------------------------------------ */
function* fetchDentistSpecialties () {
  yield* takeLatest(DENTIST_SPECIALTIES_REQUEST, function* handler () {
    try {
      const response = yield call(request, '/api/v1/dentist-specialties');
      yield put(dentistSpecialtiesSuccess(response.data));
    } catch (e) {
      console.log(e);
    }
  });
}

/*
Fetch Patients
------------------------------------------------------------
*/
function* patientsFetcher () {
  yield* takeLatest(FETCH_PATIENTS_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/dentists/me/members');
      yield put(fetchPatientsSuccess(response.data));
    } catch (error) {
      yield put(fetchPatientsError(error));
    }
  });
}

/*
Fetch Dentist Reports
------------------------------------------------------------
*/
function* dentistReportsFetcher () {
  yield* takeLatest(FETCH_DENTIST_REPORTS_REQUEST, function* handler(action) {
    try {
      const response = yield call(request, `/api/v1/reports/dentist/dates/me/list`);
      yield put(fetchDentistReportsSuccess(response.data));
    }
    catch (error) {
      yield put(fetchDentistReportsError(error));
    }
  });
}

/*
Add / Edit Member
------------------------------------------------------------
*/
function* submitMemberFormWatcher () {
  while (true) {
    yield takeLatest(SUBMIT_MEMBER_FORM, function* handler ({ patient, payload }) {
      if (payload.id === undefined) {
        yield submitAddMemberForm(patient, payload);
      }
      else {
        yield submitEditMemberForm(patient, payload);
      }
    });
  }
}

function* submitAddMemberForm(patient, payload) {
  try {
    const requestURL = `/api/v1/users/${patient.id}/members`;
    let body = JSON.stringify({
      parentMember: patient,
      member: payload
    });
    const params = {
      method: 'POST',
      body
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been added.`;
    yield put(toastrActions.success('', message));

    yield put(setAddedMember(patient, response.data));
  } catch (err) {
    console.log(err);
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

function* submitEditMemberForm (patient, payload) {
  const dentistId = payload.dentistId;
  try {
    let requestURL;
    if (payload.isEnrolling) {
      requestURL = `/api/v1/dentists/${dentistId}/subscription/plan/${payload.id}/re-enroll?membershipId=${payload.membershipId}`;
    } else {
      requestURL = `/api/v1/dentists/${dentistId}/subscription/plan/${payload.membershipId}/user/${payload.id}?subscriptionId=${payload.subscription.id}`;
    }
    const params = {
      method: 'PUT',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been modified.`;

    yield put(toastrActions.success('', message));

    yield put(setEditedMember(patient, payload, response.data));

  } catch (err) {
    console.log(err);
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

/*
Remove Member
------------------------------------------------------------
*/
function* removeMemberWatcher () {
  while (true) {
    const { patient, payload, dentistId } = yield take(REMOVE_MEMBER_REQUEST);

    try {
      const requestURL = `/api/v1/dentists/${dentistId}/subscription/members/${payload.id}/plan`;
      const params = {
        method: 'DELETE',
      };

      const updatedSubscription = yield call(request, requestURL, params);

      const message = `${payload.firstName} ${payload.lastName}'s subscription has been canceled successfully.`;
      yield put(toastrActions.success('', message));

      yield put(setRemovedMember(patient, payload.id, updatedSubscription));
    } catch (err) {
      console.log(err);
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

/*
Edit Patient Profile
------------------------------------------------------------
*/
function* submitPatientProfileFormWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_PATIENT_PROFILE_FORM);

    const allowedFields = pick(
      payload,
      'id',
      'email',
      'firstName',
      'middleName',
      'lastName',
    );

    try {

      // For now: Only allowed to update the primary member account.
      // Later: Support updating family members.
      const requestURL = `/api/v1/users/${allowedFields.id}/members/${allowedFields.id}`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(allowedFields),
      };

      const response = yield call(request, requestURL, params);

      const message = `The patient's profile has been updated.`;
      yield put(toastrActions.success('', message));

      yield put(setEditedPatientProfile(payload));

    } catch (err) {
      const errors = mapValues(err.errors, (value) => value.msg);

      yield put(toastrActions.error('', 'Please fix errors on the form!'));
      yield put(stopSubmit('patientProfile', errors));
    }
  }
}

/* Edit Patient Payment Info
 * ------------------------------------------------------ */
function* submitPatientPaymentFormWatcher () {
  while (true) {
    const { patient, payload, } = yield take(SUBMIT_PATIENT_PAYMENT_FORM);

    try {
      const stripeToken = yield call(makeStripeCreateTokenRequest, payload);
      if (stripeToken) {
        const requestURL = `/api/v1/users/${patient.id}/account/payment/sources/${stripeToken}/`;
        const params = {
          method: 'POST',
          body: JSON.stringify({ token: stripeToken }),
        };

        const response = yield call(request, requestURL, params);
        const message = `Your account payment information has been updated.`;
        yield put(toastrActions.success('', message));

        yield put(clearEditingPatientPayment());
      }
    } catch (err) {
      const formErrors = {
        number: err.errors && err.errors.errorMessage
      };

      yield put(toastrActions.error('', 'There was an issue with your payment information.  Please correct it!'));
      yield put(stopSubmit('checkout', formErrors));
      yield put(change('checkout', 'cardCode', null));
      return false;
    }
  }
}

/*
Toggle Waive Patient Fees
------------------------------------------------------------
*/
function* toggleWaivePatientFeesWatcher () {
  while (true) {
    const { patient, payload } = yield take(TOGGLE_WAIVE_PATIENT_FEES_REQUEST);
    try {
      let requestURL;
        requestURL = `/api/v1/dentists/me/patients/${patient.id}/toggle-reenrollment-waiver`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(payload),
      };

      yield call(request, requestURL, params);

      const message = `The patient's fee settings have been updated.`;
      yield put(toastrActions.success('', message));

      yield put(setToggledWaivePatientFees(patient, payload));

    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

/* Download Report
 * ------------------------------------------------------ */
// Based on: https://stackoverflow.com/questions/1999607/download-and-open-pdf-file-using-ajax
function* downloadReport () {
  while (true) {
    const { reportName, reportUrl } = yield take(DOWNLOAD_REPORT_REQUEST);

    try {
      const params = {
        method: "GET",
      };
      const pdfBlob = yield call(request, '/api/v1' + reportUrl, params);

      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(pdfBlob);
      link.download = reportName;
      link.click();

      downloadReportSuccess();
    }

    catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      downloadReportFailure(err);
    }
  }
}

/*
Upload Image Sagas
------------------------------------------------------
*/
function* uploadImageWatcher () {
  while (true) {
    const { field, file, } = yield take(UPLOAD_IMAGE_REQUEST);

    try {
      const requestURL = `/api/v1/users/upload-photos`;
      const body = new FormData();
      body.append("photos", file);

      const params = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body,
      };

      // NOTE: Normally we call the `request` util, but that overrides the
      // Content-Type header and we need to keep it as FormData, so we're
      // calling Fetch directly here.
      const rawResponse = yield call(fetch, requestURL, params);

      if (rawResponse.ok) { // response.status >= 200 && response.status < 300
        const response = yield call(rawResponse.json.bind(rawResponse));
        const location = response.data[0].location;

        yield put(uploadImageSuccess(location));
        yield put(change('dentist-edit-profile', field, location));
      }

      else {
        const error = new Error('Request endpoint Error');
        error.res = response;
        throw error;
      }

    } catch (err) {
      yield put(toastrActions.error('', 'This image could not be uploaded.'));
    }
  }
}

/*
Signup Sagas
------------------------------------------------------
*/
function* signupWatcher () {
  while (true) {
    // listen for the DENTIST_SIGNUP_REQUEST action dispatched on form submit
    const { payload } = yield take(DENTIST_SIGNUP_REQUEST);

    // execute the signup task
    const isSuccess = yield call(signup, payload);

    if (isSuccess) {
      yield put(toastrActions.success('', "Your profile was updated successfully!"));
      setTimeout(() => {
        window.location.reload();
      }, 350);
    }
  }
}

function* signup (data) {
  try {
    // send a post request with the desired user details
    const response = yield call(request, `/api/v1/dentist-info/${data.user.id}/edit/${data.user.dentistInfo.id}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return true;

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    // Map from known response errors to their form field identifiers.
    // Currently, only server-side-only validation is included most of the
    // validation is identical on the client and the server.  Thus a
    // non-malicious user will have already checked the other possible error
    // responses.
    const formErrors = {};

    if (errors.email) {
      formErrors.user = {};
      formErrors.user.email = errors.email;
      delete errors.email;
    }

    if (Object.keys(formErrors).length === 0) {
      yield put(toastrActions.error('', 'An unknown error occurred.  Please double check the information you entered to see if anything appears to be incorrect.'));
    }
    else {
      yield put(toastrActions.error('', 'Please fix errors on the form!'));
    }

    yield put(stopSubmit('dentist-edit-profile', formErrors));
    return false;
  }
}

function createStripeToken(cardDetails) {
  let stripe_obj = {
    name: cardDetails.name,
    number: cardDetails.number,
    cvc: cardDetails.cvc,
    exp_month: cardDetails.expiry.split('/')[0],
    exp_year: cardDetails.expiry.split('/')[1]
  };
  return new Promise((resolve, reject) => {
    Stripe.card.createToken({
      ...stripe_obj
    }, (status, response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response.id);
      }
    })
  });
}

function* makeStripeCreateTokenRequest(cardDetails) {
  try {
    const token = yield call(createStripeToken, cardDetails);
    return token;
  } catch (err) {
    // console.log('Error in creating stripe token');
    // console.log(err);
    const formErrors = {
      number: err.errors && err.errors.errorMessage
    }
    yield put(toastrActions.error('', err.message || 'Please Enter Valid Card details.'));
    yield put(stopSubmit('checkout', formErrors));
    yield put(change('checkout', 'cardCode', null));
    return false;
  }
}

/*
Edit Security
------------------------------------------------------------
*/
function* submitAccountSecurityFormWatcher() {
  while (true) {
    const { payload, user } = yield take(SUBMIT_SECURITY_FORM);

    let cleanedPayload = {
      oldPassword: payload.oldPassword,
    };

    if (payload.changeEmail) {
      cleanedPayload.newEmail = payload.newEmail;
      cleanedPayload.confirmNewEmail = payload.confirmNewEmail;
    }

    if (payload.changePassword) {
      cleanedPayload.newPassword = payload.newPassword;
      cleanedPayload.confirmNewPassword = payload.confirmNewPassword;
    }

    try {
      const requestURL = `/api/v1/users/${user.id}/account/change-auth`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(payload),
      };

      const response = yield call(request, requestURL, params);
      const message = `Your account security information has been updated.`;
      yield put(toastrActions.success('', message));

      let updatedUser = {
        ...user,
      };
      if (payload.newEmail) {
        updatedUser.email = payload.newEmail;
      }
      yield put(setUserData(updatedUser));

      yield put(clearEditingSecurity());

    } catch (err) {
      if (get(err, 'meta.code') === 401) {
        const message = "Your 'Current Password' was incorrect.  Please re-enter it and submit the form again.";
        yield put(toastrActions.error('', message));
      }
      else {
        yield put(toastrActions.error('', "Please fix errors on the form and re-enter your 'Current Password'."));
      }

      const errors = mapValues(err.errors, (value) => value.msg);
      yield put(stopSubmit('accountSecurity', errors));

      yield put(change('accountSecurity', 'oldPassword', null));
    }
  }
}

function* deleteLogoWatcher () {
  yield takeLatest(DELETE_OFFICE_LOGO, function* handler ({ dentistId, dentistInfoId }) {
    try {
      const requestURL = `/api/v1/users/${dentistId}/dentist-info/${dentistInfoId}/logo/`;
      const params = {
        method: 'DELETE'
      };
      yield call(request, requestURL, params);
      const message = 'Your Logo was removed successfully!';
      yield put(toastrActions.success('', message));
    } catch (e) {
      yield put(toastrActions.error('', 'There was an error in removing the logo. Please try again.'));
    }
  });
}

function* deleteAvatarWatcher () {
  yield takeLatest(DELETE_DENTIST_AVATAR, function* handler ({ dentistId }) {
    try {
      const requestURL = `/api/v1/users/${dentistId}/account/delete-avatar`;
      const params = {
        method: 'DELETE'
      };
      yield call(request, requestURL, params);
      const message = 'Your Avatar was removed successfully!';
      yield put(toastrActions.success('', message));
    } catch (e) {
      yield put(toastrActions.error('', 'There was an error in removing the Avatar. Please try again.'));
    }
  });
}

function* deleteOfficeImagesWatcher () {
  yield takeLatest(DELETE_DENTIST_OFFICE_IMAGE, function* handler ({ dentistId, dentistInfoId, dentistInfoPhotoId }) {
    try {
      const requestURL = `/api/v1/users/${dentistId}/dentist-info/${dentistInfoId}/photos/${dentistInfoPhotoId}`;
      const params = {
        method: 'DELETE'
      };
      yield call(request, requestURL, params);
      const message = 'The Office Image was removed successfully!';
      yield put(toastrActions.success('', message));
    } catch (e) {
      yield put(toastrActions.error('', 'There was an error in removing the Office Image. Please try again.'));
    }
  });
}
