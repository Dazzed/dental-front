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
  fetchDentistReports,
  fetchDentistInfo,
  fetchPatients,
  dentistSpecialtiesRequest,
  uploadImageRequest,

  // download report
  downloadReport,

  // submit
  signupRequest,
} from 'containers/DentistMembersPage/actions';
import {
  // fetch
  selectDentistReports,
  selectDentistInfo,
  selectPatients,
  dentistSpecialtiesSelector,
  pricingCodesSelector,
} from 'containers/DentistMembersPage/selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    reports: selectDentistReports(state),
    dentistInfo: selectDentistInfo(state),
    patients: selectPatients(state),
    dentistSpecialties: dentistSpecialtiesSelector(state),
    user: selectCurrentUser(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changeRoute: (url) => dispatch(push(url)),
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentistReports: () => dispatch(fetchDentistReports()),
    fetchDentistInfo: () => dispatch(fetchDentistInfo()),
    fetchPatients: () => dispatch(fetchPatients()),
    getDentistSpecialties: () => dispatch(dentistSpecialtiesRequest()),

    // image upload
    uploadImage: (field, file) => dispatch(uploadImageRequest(field, file)),

    // download report
    downloadReport: (reportName, reportUrl) => dispatch(downloadReport(reportName, reportUrl)),

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
    reports: React.PropTypes.arrayOf(React.PropTypes.object),

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
    fetchDentistReports: React.PropTypes.func.isRequired,
    fetchDentistInfo: React.PropTypes.func.isRequired,
    fetchPatients: React.PropTypes.func.isRequired,
    getDentistSpecialties: React.PropTypes.func.isRequired,

    // image upload - dispatch
    uploadImage: React.PropTypes.func.isRequired,

    // download report - dispatch
    downloadReport: React.PropTypes.func.isRequired,

    // signup - dispatch
    makeSignupRequest: React.PropTypes.func.isRequired,
  };

  componentWillMount () {
    this.props.fetchDentistReports();
    this.props.fetchDentistInfo();
    this.props.fetchPatients();
    this.props.getDentistSpecialties();
  }

  componentDidMount() {
    this.props.changePageTitle('Edit Profile');
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // profile form
  onImageUpload = (field, file) => {
    this.props.uploadImage(field, file);
  }

  onSubmit = (values) => {
    const formattedValues = formatDentistProfileFormSubmissionData(values);
    this.props.makeSignupRequest(formattedValues);
  }

  // reports
  onReportSelected = ({month, year, url}) => {
    const {
      user: { firstName, lastName },
    } = this.props;

    const reportName = `dentist_${lastName}_${firstName}_${year}_${month}.pdf`;
    this.props.downloadReport(reportName, url);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      reports,
      dentistInfo,
      patients,
      dentistSpecialties,
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

    return (
      <div>
        <DentistDashboardHeader
          dentistInfo={dentistInfo}
          patients={patients}
          reports={reports}
          user={user}
          onReportSelected={this.onReportSelected}
        />

        <h1 styleName="large-title">Edit Profile</h1>

        <div styleName="content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">

              <DentistEditProfileForm
                dentistSpecialties={dentistSpecialties}

                initialValues={initialValues}
                onSubmit={this.onSubmit}

                onImageUpload={this.onImageUpload}
              />

            </div>
          </div>
        </div>

      {/* End Wrapper Div */}
      </div>
    );
  }
}
