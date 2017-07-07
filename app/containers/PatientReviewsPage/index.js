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
import LoadingSpinner from 'components/LoadingSpinner';
import MemberFormModal from 'components/MemberFormModal';
import NavBar from 'components/NavBar';
import PatientDashboardHeader from 'components/PatientDashboardHeader';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import PatientsList from 'components/PatientsList';
import ReviewFormModal from 'components/ReviewFormModal';
import PatientReviews from 'components/PatientReviews';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // fetch
  fetchDentist,
  fetchFamilyMembers,

  // add / edit member
  setEditingMember,
  clearEditingMember,
  submitMemberForm,

  // add / edit review
  setEditingReview,
  clearEditingReview,
  submitReviewForm,

  // remove review
  setRemovingReview,
} from 'containers/PatientProfilePage/actions';
import {
  // fetch
  dentistSelector,
  membersSelector,

  // add / edit member
  editingMemberSelector,

  // add / edit review
  editingReviewSelector,
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
function mapStateToProps(state) {
  return {
    // fetch
    dataLoaded: selectDataLoaded(state),
    dentist: dentistSelector(state),
    members: membersSelector(state),
    user: selectCurrentUser(state),

    // add / edit member
    editingMember: editingMemberSelector(state),

    // add / edit review
    editingReview: editingReviewSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentist: () => dispatch(fetchDentist()),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),

    // add / edit member
    resetMemberForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (member) => dispatch(setEditingMember(member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (values, userId) => dispatch(submitMemberForm(values, userId)),

    // add / edit review
    resetReviewForm: () => dispatch(resetForm('review')),
    setEditingReview: (review) => dispatch(setEditingReview(review)),
    clearEditingReview: () => dispatch(clearEditingReview()),
    submitReviewForm: (values, dentistId) => dispatch(submitReviewForm(values, dentistId)),

    // remove review
    setRemovingReview: (review, dentistId) => dispatch(setRemovingReview(review, dentistId)),
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
    // react
    location: React.PropTypes.object.isRequired,

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

    // add / edit member - state
    editingMember: React.PropTypes.object,

    // add / edit member - dispatch
    resetMemberForm: React.PropTypes.func.isRequired,
    setEditingMember: React.PropTypes.func.isRequired,
    clearEditingMember: React.PropTypes.func.isRequired,
    submitMemberForm: React.PropTypes.func.isRequired,

    // add / edit review - state
    editingReview: React.PropTypes.object,

    // add / edit review - dispatch
    resetReviewForm: React.PropTypes.func.isRequired,
    setEditingReview: React.PropTypes.func.isRequired,
    clearEditingReview: React.PropTypes.func.isRequired,
    submitReviewForm: React.PropTypes.func.isRequired,

    // removing review
    setRemovingReview: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.changePageTitle('Your Reviews');
    this.props.fetchDentist();
    this.props.fetchFamilyMembers();
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  // members
  addMember = (user) => {
    this.props.resetMemberForm();
    this.props.setEditingMember({});
  }

  reEnrollMember = (user, member) => {
    alert('TODO: re-enroll member');
  }

  removeMember = (user, member) => {
    alert('TODO: remove member');
  }

  renewMember = (user, member) => {
    alert('TODO: renew member');
  }

  updateMember = (user, member) => {
    this.props.resetMemberForm();
    this.props.setEditingMember(member);
  }

  // reviews
  addReview = () => {
    this.props.resetReviewForm();
    this.props.setEditingReview({});
  }

  removeReview = (review) => {
    this.props.setRemovingReview(review, this.props.dentist.id);
  }

  updateReview = (review) => {
    this.props.resetReviewForm();
    this.props.setEditingReview(review);
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // members
  handleMemberFormSubmit = (values) => {
    this.props.submitMemberForm(values, this.props.user.id);
  }

  cancelMemberFormAction = () => {
    this.props.clearEditingMember();
  }

  // reviews
  handleReviewFormSubmit = (values) => {
    this.props.submitReviewForm(values, this.props.dentist.id);
  }

  cancelReviewFormAction = () => {
    this.props.clearEditingReview();
  }

  /*
  UI Functions
  ------------------------------------------------------------
  */
  getReviews = () => {
    const {
      // react
      location,

      // fetch
      dentist,
      user,
    } = this.props;

    return (
      <PatientReviews
        reviewer={user}
        reviews={dentist.dentistReviews}
        user={user}

        onRemoveReview={this.removeReview}
        onUpdateReview={this.updateReview}
      />
    );
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // fetch
      dataLoaded,
      dentist,
      members,
      user,

      // add / edit member
      editingMember,

      // add / edit review
      editingReview,
    } = this.props;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (dataLoaded === false || !dentist || !dentist.dentistInfo) {
      return (
        <div>
          <NavBar pathname={location.pathname} logo={false} />
          <PatientDashboardTabs active="reviews" />
          <div styleName="content">
            {
              dentist && !dentist.dentistInfo ?
                <h3 className="text-muted block text-center">You Have No Membership</h3> :
                <LoadingSpinner showOnlyIcon={false} />
            }
          </div>
        </div>
      );
    }

    // precondition: there are no reviews to display
    if (dentist.dentistReviews.length === 0) {
      return (
        <div>
          <NavBar pathname={location.pathname} logo={dentist.dentistInfo.logo || false} />
          <PatientDashboardHeader user={user} />
          <PatientDashboardTabs active="reviews" />

          <div styleName="content content--filler">
            <p className="text-center">
              <input
                type="button"
                styleName="button"
                value="WRITE A REVIEW"
                onClick={this.addReview}
              />
            </p>
          </div>

          <ReviewFormModal
            show={editingReview !== null}
            onCancel={this.cancelReviewFormAction}

            initialValues={editingReview}
            onSubmit={this.handleReviewFormSubmit}
          />

          {/* End Wrapper Div */}
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
    user.members = members;

    return (
      <div>
        <NavBar pathname={location.pathname} logo={dentist.dentistInfo.logo} />
        <PatientDashboardHeader user={user} />
        <PatientDashboardTabs active="reviews" />

        <div styleName="content">
          {this.getReviews()}
        </div>

        <MemberFormModal
          dentist={dentist}
          show={editingMember !== null}
          onCancel={this.cancelMemberFormAction}
          initialValues={editingMember}
          onFormSubmit={this.handleMemberFormSubmit}
        />

        <ReviewFormModal
          show={editingReview !== null}
          onCancel={this.cancelReviewFormAction}

          initialValues={editingReview}
          onSubmit={this.handleReviewFormSubmit}
        />

        {/* End Wrapper Div */}
      </div>
    );
  }

}

export default PatientReviewsPage;
