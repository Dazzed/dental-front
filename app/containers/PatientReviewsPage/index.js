/*
Patient Reviews Page
================================================================================
Route: `/patient/your-reviews`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import FamilyMembersList from 'components/FamilyMembersList';
import LoadingSpinner from 'components/LoadingSpinner';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // fetch
  fetchDentist,
} from 'containers/PatientDentistPage/actions';
import {
  // fetch
  dentistSelector,
} from 'containers/PatientDentistPage/selectors';
import {
  // fetch
  fetchFamilyMembers,
} from 'containers/PatientProfilePage/actions';
import {
  // fetch
  membersSelector,
} from 'containers/PatientProfilePage/selectors';

// local
import {
  // fetch
  selectDataLoaded,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    dataLoaded: selectDataLoaded(state),
    dentist: dentistSelector(state),
    members: membersSelector(state),
    user: selectCurrentUser(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentist: () => dispatch(fetchDentist()),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),
  };
}


/*
Patient Reviews
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class PatientReviewsPage extends React.Component {

  static propTypes = {
    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state
    dataLoaded: React.PropTypes.bool.isRequired,
    dentist: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),
    members: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // fetch - dispatch
    fetchDentist: React.PropTypes.func.isRequired,
    fetchFamilyMembers: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.changePageTitle('Your Reviews');
    this.props.fetchDentist();
    this.props.fetchFamilyMembers();
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  editReview = (review) => {
    // TODO
  }

  removeReview = (review) => {
    // TODO
  }

  /*
  Events
  ------------------------------------------------------------
  */
  handleEditReviewFormSubmit = (values) => {
    // TODO
  }

  cancelEditReviewFormAction = () => {
    // TODO
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dataLoaded,
      dentist,
      members,
      user,
    } = this.props;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (dataLoaded === false) {
      return (
        <div>
          <PatientDashboardTabs active="reviews" />

          <div styleName="content content--filler">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    // precondition: there are no reviews to display
    // TODO

    /*
    Main Render
    ------------------------------------------------------------
    */
    return (
      <div>
        <PatientDashboardTabs active="reviews" />

        <div styleName="content">
          {/* TODO */}
          Welcome to the "Your Reviews" tab in the patient dashboard.  Still TODO.
        </div>

        {/* TODO: edit revieew modal goes here */}
      </div>
    );
  }

}

export default PatientReviewsPage;
