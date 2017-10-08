import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// app
import AccountSecurityFormModal from 'components/AccountSecurityFormModal';
import DentistDashboardHeader from 'components/DentistDashboardHeader';
import DentistDashboardTabs from 'components/DentistDashboardTabs';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // fetch
  fetchDentistInfo,
  fetchPatients,
  fetchDentistReports,

  // search / sort patients
  searchMembers,

  // download report
  downloadReport,

  // edit security
  setEditingSecurity,
  clearEditingSecurity,
  submitSecurityForm,
} from 'containers/DentistMembersPage/actions';
import {
  // fetch
  selectDentistInfo,
  selectProcessedPatients,
  selectDentistReports,

  // search / sort patients
  selectMemberSearchTerm,

  // edit security
  editingSecuritySelector,
  dentistRatingSelector
} from 'containers/DentistMembersPage/selectors';

import {
  // fetch
  selectDataLoaded,
  selectRecentReviewers,
  selectProcessedReviews,
} from './selectors';
import styles from './styles.css';
import ReviewProfileList from './components/reviewProfileList';
/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    dataLoaded: selectDataLoaded(state),
    dentistInfo: selectDentistInfo(state),
    patients: selectProcessedPatients(state),
    recentReviewers: selectRecentReviewers(state),
    reports: selectDentistReports(state),
    user: selectCurrentUser(state),

    // search / sort patients
    currentSearchTerm: selectMemberSearchTerm(state),

    // edit security
    editingSecurity: editingSecuritySelector(state),
    processedReviews: selectProcessedReviews(state),
    dentistRating: dentistRatingSelector(state)
  };
}

function mapDispatchToProps (dispatch) {
  const boundActionCreators = bindActionCreators({
    changePageTitle,
    fetchDentistInfo,
    fetchPatients,
    fetchDentistReports,
    searchMembers,
    setEditingSecurity,
    clearEditingSecurity,
    submitSecurityForm,
    downloadReport,
  }, dispatch);

  return {
    ...boundActionCreators,
    resetSecurityForm: () => dispatch(resetForm('accountSecurity')),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class DentistNewReviewsPage extends React.Component {

  static propTypes = {
    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state
    dataLoaded: React.PropTypes.bool.isRequired,
    patients: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until loaded
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),
    processedReviews: React.PropTypes.array.isRequired,

    // fetch - dispatch
    fetchDentistInfo: React.PropTypes.func.isRequired,
    fetchPatients: React.PropTypes.func.isRequired,
  }

  componentWillMount () {
    if (this.props.user && (!this.props.dentistInfo || !this.props.patients)) {
      this.props.fetchDentistInfo();
      this.props.fetchPatients();
      this.props.fetchDentistReports();
    }
  }

  componentDidMount () {
    this.props.changePageTitle('New Reviews');
  }

  // security
  updateSecuritySettings = () => {
    this.props.resetSecurityForm();
    this.props.setEditingSecurity({
      changeEmail: true,
      changePassword: true,
    });
  }

  // reports
  onReportSelected = ({ month, year, url }) => {
    const {
      user: { firstName, lastName },
    } = this.props;

    const reportName = `dentist_${lastName}_${firstName}_${year}_${month}.pdf`;
    this.props.downloadReport(reportName, url);
  }

  // secruity
  handleSecurityFormSubmit = (values) => {
    this.props.submitSecurityForm(values, this.props.user);
  }

  cancelSecurityFormAction = () => {
    this.props.clearEditingSecurity();
  }

  renderHeaderAndTabs = () => {
    const {
      currentSearchTerm,
      dentistInfo,
      patients,
      reports,
      user,
      dentistRating
    } = this.props;
    return (
      <div>
        <DentistDashboardHeader
          currentSearchTerm={currentSearchTerm}
          dentistInfo={dentistInfo}
          patients={patients}
          reports={reports}
          user={user}
          onMemberSearch={this.props.searchMembers}
          onReportSelected={this.onReportSelected}
          onSecurityLinkClicked={this.updateSecuritySettings}
          dentistRating={dentistRating}
        />
        <DentistDashboardTabs active="new-reviews" />
      </div>
    );
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dataLoaded,
      dentistInfo,
      patients,
      processedReviews,
      user,
      // edit security
      editingSecurity,
    } = this.props;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (dataLoaded === false) {
      return (
        <div>
          <DentistDashboardTabs active="new-reviews" />

          <div styleName="content content--filler">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    // precondition: there are no patients, thus there can be no reviews
    if (patients.length === 0) {
      return (
        <div>
          {this.renderHeaderAndTabs()}
          <div styleName="content content--filler">
            <p>
              It looks like you just got your DentalHQ account and haven't signed up any of your patients yet.  Of course you'll need to get them on one of your DentalHQ plans before they can start leaving you five star reviews!
            </p>
          </div>

          <AccountSecurityFormModal
            show={editingSecurity !== null}
            onCancel={this.cancelSecurityFormAction}

            initialValues={editingSecurity}
            onSubmit={this.handleSecurityFormSubmit}
          />
        </div>
      );
    }

    // precondition: there are no recent reviewers
    if (processedReviews.length === 0) {
      return (
        <div>
          {this.renderHeaderAndTabs()}

          <div styleName="content content--filler">
            <p>
              No new reviews were posted by your patients in the past 7 days.  Great job keeping up with your patients!
            </p>
          </div>

          <AccountSecurityFormModal
            show={editingSecurity !== null}
            onCancel={this.cancelSecurityFormAction}

            initialValues={editingSecurity}
            onSubmit={this.handleSecurityFormSubmit}
          />
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */

    return (
      <div>
        {this.renderHeaderAndTabs()}

        <div styleName="content">
          <ReviewProfileList profiles={processedReviews} />
        </div>

        <AccountSecurityFormModal
          show={editingSecurity !== null}
          onCancel={this.cancelSecurityFormAction}

          initialValues={editingSecurity}
          onSubmit={this.handleSecurityFormSubmit}
        />

      </div>
    );
  }
}

export default DentistNewReviewsPage;
