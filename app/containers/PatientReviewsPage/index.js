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

  // add / edit review
  // TODO: edit
  setEditingReview,
  clearEditingReview,
  submitReviewForm,

  // remove review
  // TODO
} from 'containers/PatientProfilePage/actions';
import {
  // fetch
  dentistSelector,
  membersSelector,

  // add / edit review
  // TODO: edit
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
function mapStateToProps (state) {
  return {
    // fetch
    dataLoaded: selectDataLoaded(state),
    dentist: dentistSelector(state),
    members: membersSelector(state),
    user: selectCurrentUser(state),

    // send review
    editingReview: editingReviewSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentist: () => dispatch(fetchDentist()),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),

    // send review
    resetForm: () => dispatch(resetForm('sendReview')),
    setEditingReview: (review) => dispatch(setEditingReview(review)),
    clearEditingReview: () => dispatch(clearEditingReview()),
    submitReviewForm: (values, dentistId) => dispatch(submitReviewForm(values, dentistId)),
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

    // send review - state
    editingReview: React.PropTypes.object,

    // send review - dispatch
    resetForm: React.PropTypes.func.isRequired,
    setEditingReview: React.PropTypes.func.isRequired,
    clearEditingReview: React.PropTypes.func.isRequired,
    submitReviewForm: React.PropTypes.func.isRequired,
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
  // reviews
  addReview = () => {
    this.props.resetForm();
    this.props.setEditingReview({});
  }

  removeReview = (review) => {
    alert('TODO: remove review');
  }

  updateReview = (review) => {
    alert('TODO: update review');
  }

  // members
  addMember = () => {
    alert('TODO: add member');
  }

  reEnrollMember = () => {
    alert('TODO: re-enroll member');
  }

  removeMember = (member) => {
    alert('TODO: remove member');
  }

  renewMember = () => {
    alert('TODO: renew member');
  }

  updateMember = (member) => {
    alert('TODO: update member');
  }

  /*
  Events
  ------------------------------------------------------------
  */
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
  render () {
    const {
      // fetch
      dataLoaded,
      dentist,
      members,
      user,

      // send review
      editingReview,
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
    if (dentist.dentistReviews.length === 0) {
      return (
        <div>
          <PatientDashboardHeader user={user} />
          <PatientDashboardTabs active="reviews" />

          <div styleName="content content--filler">
            <p className="text-center">
              <input
                type="button"
                styleName="button"
                value="WRITE A REVIEW"
                onClick={this.writeReview}
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
        <PatientDashboardHeader user={user} />
        <PatientDashboardTabs active="reviews" />

        <div styleName="content">
          <PatientsList
            patients={[user]}

            getAdditionalMembershipContent={this.getReviews}

            onAddMember={this.addMember}
            onReEnrollMember={this.reEnrollMember}
            onRemoveMember={this.removeMember}
            onRenewMember={this.renewMember}
            onUpdateMember={this.updateMember}
          />

          <div styleName="add-review-wrapper">
            <input
              type="button"
              styleName="button"
              value="WRITE A NEW REVIEW"
              onClick={this.writeReview}
            />
          </div>
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

}

export default PatientReviewsPage;
