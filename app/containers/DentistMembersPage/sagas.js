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
}

/*
Fetch Dentist Info
------------------------------------------------------------
*/
function* dentistInfoFetcher () {
  yield* takeLatest(FETCH_DENTIST_INFO_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/users/me/dentist-info')
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
      const response = yield call(request, `/api/v1/reports/dentists/me/list`);
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
    const requestURL = `/api/v1/users/${patient.client.id}/members`;
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
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

function* submitEditMemberForm (patient, payload) {
  try {
    // const requestURL = `/api/v1/users/${patient.id}/members/${payload.id}`;
    let requestURL;
    if (payload.isEnrolling) {
      requestURL = `/api/v1/dentists/${payload.membership.dentistId}/subscription/plan/${payload.id}/re-enroll?membershipId=${payload.membershipId}`;
    } else {
      requestURL = `/api/v1/dentists/${payload.membership.dentistId}/subscription/plan/${payload.membershipId}/user/${payload.id}?subscriptionId=${payload.subscriptionId}`;
    }
    const params = {
      method: 'PUT',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been modified.`;
    yield put(toastrActions.success('', message));

    yield put(setEditedMember(patient, response.data));

  } catch (err) {
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
      // const requestURL = `/api/v1/users/${patient.id}/members/${payload.id}`;
      const requestURL = `/api/v1/dentists/${dentistId}/subscription/members/${payload.id}/plan`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `'${payload.firstName} ${payload.lastName}'
        has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(setRemovedMember(patient, payload.id));
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
      'firstName',
      'lastName',
      'clientSubscription',
      'sex',
      'birthDate',
      'address',
      'city',
      'state',
      'zipCode',
      'phone',
      'contactMethod',
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

    const allowedFields = {
      card: pick(
        payload,
        'fullName',
        'number',
        'expiry',
        'cvc',
        'zip',
      ),

      cancellationFeeWaiver: payload.feeWaiver,
      periodontalDiseaseWaiver: payload.periodontalDiseaseWaiver,
      reEnrollmentFeeWaiver: payload.feeWaiver,
      termsAndConditions: payload.termsAndConditions,
    };
    allowedFields.card.address = `${payload.address}, ${payload.state}, ${payload.city}`;

    try {
      const requestURL = `/api/v1/dentists/me/patients/${patient.id}/update-card`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(allowedFields),
      };

      const response = yield call(request, requestURL, params);
      const message = `The patient's payment information has been updated.`;
      yield put(toastrActions.success('', message));

      yield put(clearEditingPatientPayment());

    } catch (err) {
      // Map from known response errors to their form field identifiers.
      // In this case, Authorize.NET is the validator.
      const formErrors = {
        number: err.errors && err.errors.errorMessage
      }

      yield put(toastrActions.error('', 'There was an issue with your payment information.  Please correct it in Step 3!'));
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
    const { patient, payload, toggleType } = yield take(TOGGLE_WAIVE_PATIENT_FEES_REQUEST);
    try {
      let requestURL;
      if (toggleType === 'cancel') {
        requestURL = `/api/v1/dentists/me/patients/${patient.client.id}/toggle-cancellation-waiver`;
      } else {
        requestURL = `/api/v1/dentists/me/patients/${patient.client.id}/toggle-reenrollment-waiver`;
      }
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
    }
  }
}

function* signup (data) {
  try {
    // send a post request with the desired user details
    yield call(request, '/api/v1/dentists/edit/' + data.user.id, {
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
