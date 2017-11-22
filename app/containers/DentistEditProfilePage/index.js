/*
Dentist Signup Page
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

// app
import DentistEditProfileForm from 'components/DentistEditProfileForm';
import formatDentistProfileFormInitialValues from 'components/DentistEditProfileForm/format-initial-values';
import formatDentistProfileFormSubmissionData from 'components/DentistEditProfileForm/format-submission-data';
import DentistDashboardHeader from 'components/DentistDashboardHeader';
import LoadingSpinner from 'components/LoadingSpinner';
import {
  changePageTitle,
} from 'containers/App/actions';
import {
  selectCurrentUser,
} from 'containers/App/selectors';
import {
  // fetch
  fetchDentistInfo,
  fetchPatients,
  dentistSpecialtiesRequest,
// TODO: enable images
//  uploadImageRequest,

  // submit
  signupRequest,
} from 'containers/DentistMembersPage/actions';

// TODO: enable services
/*
import {
  requestServices,
} from 'containers/App/actions';

import {
  selectServices,
} from 'containers/App/selectors';
*/

import {
  // fetch
  selectDentistInfo,
  selectPatients,
  dentistSpecialtiesSelector,
} from 'containers/DentistMembersPage/selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    dentistInfo: selectDentistInfo(state),
    patients: selectPatients(state),
    dentistSpecialties: dentistSpecialtiesSelector(state),
    user: selectCurrentUser(state),
// TODO: enable services
//    allServices: selectServices(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changeRoute: (url) => dispatch(push(url)),
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentistInfo: () => dispatch(fetchDentistInfo()),
    fetchPatients: () => dispatch(fetchPatients()),
    getDentistSpecialties: () => dispatch(dentistSpecialtiesRequest()),
// TODO: enable services
//    requestServices: () => dispatch(requestServices()),

    // image upload
// TODO: enable images
//    uploadImage: (field, file) => dispatch(uploadImageRequest(field, file)),

    // signup
    makeSignupRequest: (values) => dispatch(signupRequest(values)),
  };
}

/* Redux Form
 * ------------------------------------------------------ */
let initialValues = null;


/*
Signup
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class DentistEditProfilePage extends Component {

  static propTypes = {
    // app - dispatch
    changeRoute: React.PropTypes.func.isRequired,
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state

    patients: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until loaded

    dentistSpecialties: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })),

    user: React.PropTypes.oneOfType([
      React.PropTypes.bool, // will be `false` until loaded
      React.PropTypes.object,
    ]).isRequired,

    // fetch - dispatch
    fetchDentistInfo: React.PropTypes.func.isRequired,
    fetchPatients: React.PropTypes.func.isRequired,
    getDentistSpecialties: React.PropTypes.func.isRequired,

// TODO: enable services
//    requestServices: React.PropTypes.func.isRequired,

    // image upload - dispatch
// TODO: enable images
//    uploadImage: React.PropTypes.func.isRequired,

    // signup - dispatch
    makeSignupRequest: React.PropTypes.func.isRequired,
  };

  componentWillMount () {
    if (this.props.user) {
      this.props.fetchDentistInfo();
      this.props.fetchPatients();
      this.props.getDentistSpecialties();
// TODO: enable services
//      this.props.requestServices();
    }
  }

  componentDidMount() {
    this.props.changePageTitle('Edit Profile');
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // profile form
// TODO: enable images
/*
  onImageUpload = (field, file) => {
    this.props.uploadImage(field, file);
  }
*/

  onSubmit = (values) => {
    const formattedValues = formatDentistProfileFormSubmissionData(values, this.props.dentistInfo.priceCodes);
    this.props.makeSignupRequest(formattedValues);
  }

// TODO: enable services
/*
  updateServiceState(allServices, selectedServices) {
    for (let i = 0; i < allServices.length; i++) {
      const service = allServices[i];
      const matchingService = selectedServices.find(selected => selected.id === service.id);
      allServices[i].enabled = !!matchingService;
    }
  }
*/

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dentistInfo,
      patients,
      dentistSpecialties,
// TODO: enable services
//      allServices,
      user,
    } = this.props;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if ( user === false
      || dentistInfo === null
      || patients === null
      || dentistSpecialties.length === 0
    ) {
      return (
        <div>
          <h1 styleName="large-title">Edit Profile</h1>

          <div styleName="content content--filler">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
    if (initialValues === null) {
      initialValues = formatDentistProfileFormInitialValues(user, dentistInfo);
    }
// TODO: enable services
//    this.updateServiceState(allServices, initialValues.officeInfo.services);

    return (
      <div>
        {/*<DentistDashboardHeader
          dentistInfo={dentistInfo}
          patients={patients}
          user={user}
        />*/}

        <h1 styleName="large-title">Edit Profile</h1>

        <div styleName="content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">

              <DentistEditProfileForm
                dentistSpecialties={dentistSpecialties}

                initialValues={initialValues}
                onSubmit={this.onSubmit}

                pricingCodes={dentistInfo.priceCodes}
              />
                {/* // TODO: enable services */}
                {/* allServices={allServices} */}
                {/* // TODO: enable images */}
                {/* onImageUpload={this.onImageUpload} */}
  
            </div>
          </div>
        </div>

      {/* End Wrapper Div */}
      </div>
    );
  }
}
