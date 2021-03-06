/*
Patients Dentist Page
================================================================================
Route: `/patient/your-dentist`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import Avatar from 'components/Avatar';
import LoadingSpinner from 'components/LoadingSpinner';
import NavBar from 'components/NavBar';
import PatientDashboardHeader from 'components/PatientDashboardHeader';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import ReviewFormModal from 'components/ReviewFormModal';
import ReviewScore from 'components/ReviewScore';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // fetch
  fetchDentist,

  // add review
  setEditingReview,
  clearEditingReview,
  submitReviewForm,
} from 'containers/PatientProfilePage/actions';
import {
  // fetch
  dentistSelector,

  // add review
  editingReviewSelector,
} from 'containers/PatientProfilePage/selectors';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps(state) {
  return {
    // fetch
    dentist: dentistSelector(state),
    user: selectCurrentUser(state),

    // add review
    editingReview: editingReviewSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentist: () => dispatch(fetchDentist()),

    // add review
    resetForm: () => dispatch(resetForm('review')),
    setEditingReview: (review) => dispatch(setEditingReview(review)),
    clearEditingReview: () => dispatch(clearEditingReview()),
    submitReviewForm: (values, dentistId) => dispatch(submitReviewForm(values, dentistId)),
  };
}


/*
Dentist
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class PatientDentistPage extends React.Component {

  static propTypes = {
    // react
    location: React.PropTypes.object.isRequired,

    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state
    dentist: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // fetch - dispatch
    fetchDentist: React.PropTypes.func.isRequired,

    // add review - state
    editingReview: React.PropTypes.object,

    // add review - dispatch
    resetForm: React.PropTypes.func.isRequired,
    setEditingReview: React.PropTypes.func.isRequired,
    clearEditingReview: React.PropTypes.func.isRequired,
    submitReviewForm: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.changePageTitle('Your Dentist');
    this.props.fetchDentist();
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  addReview = () => {
    this.props.resetForm();
    this.props.setEditingReview({});
  }

  /*
  Form Events
  ------------------------------------------------------------
  */
  handleReviewFormSubmit = (values) => {
    this.props.submitReviewForm(values, this.props.dentist.id);
  }

  cancelReviewFormAction = () => {
    this.props.clearEditingReview();
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // react
      location,

      // fetch
      dentist,
      user,

      // add review
      editingReview,
    } = this.props;

    // precondition: the data must be loaded, otherwise wait for it
    if (dentist === false || !dentist.dentistInfo) {
      return (
        <div>
          <NavBar pathname={location.pathname} logo={false} />
          <PatientDashboardTabs active="dentist" />

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

    const workHours = dentist.dentistInfo.workingHours.reduce(
      (workHoursObj, dayWorkHours) => {
        const {
          day,
          endAt,
          isOpen,
          startAt,
        } = dayWorkHours;

        if (isOpen === true) {
          const prettyStartAt = moment(startAt, "HH:mm:ss").format("h:mm A");
          const prettyEndAt = moment(endAt, "HH:mm:ss").format("h:mm A");
          workHoursObj[day] = (
            <span>
              <span styleName="work-hours__hour">{prettyStartAt}</span>
              {' to '}
              <span styleName="work-hours__hour">{prettyEndAt}</span>
            </span>
          );
        }
        else {
          workHoursObj[day] = (<span styleName="work-hours__hour">Closed</span>);
        }

        return workHoursObj;
      },
      {}
    );

    return (
      <div>
        <NavBar pathname={location.pathname} logo={dentist.dentistInfo.logo || false} />
        <PatientDashboardHeader user={user} />
        <PatientDashboardTabs active="dentist" />

        <div styleName="content">

          <div className="row">

            {/*
            Dentist Profile
            ------------------------------------------------------------
            */}
            <div className="col-md-9" styleName="profile-content-wrapper">
              <div styleName="profile-content__avatar">
                <Avatar url={dentist.avatar} size={"9rem"} />
              </div>

              <div styleName="profile-content__name-and-rating">
                <h2 styleName="large-title--short">
                  {dentist.dentistInfo.officeName}
                </h2>

                <ReviewScore score={dentist.rating} />
              </div>
            </div>

            {/*
            User Action Buttons
            ------------------------------------------------------------
            */}
            <div className="col-md-3" styleName="profile-content-wrapper">
              <div styleName="profile-content__user-action-buttons">
                <p>
                  <input
                    type="button"
                    styleName="button--full-width"
                    value="WRITE A REVIEW"
                    onClick={this.addReview}
                  />
                </p>
              </div>
            </div>

          </div>

          <div className="row">

            {/*
            Dentist Details
            ------------------------------------------------------------
            */}
            <div className="col-md-6">
              <div styleName="detail">
                <p styleName="detail__content" className="text-justify">
                  {dentist.dentistInfo.message}
                </p>
              </div>

              <div styleName="detail">
                <h3 styleName="detail__title">
                  Address
                </h3>

                <p styleName="detail__content">
                  {dentist.dentistInfo.officeName}
                  <br />
                  {dentist.dentistInfo.address}
                  <br />
                  {dentist.dentistInfo.city}, {dentist.dentistInfo.state} {dentist.dentistInfo.zipCode}
                </p>

                <p styleName="detail__content">
                  <a href={"tel:" + dentist.dentistInfo.phone}>{dentist.dentistInfo.phone}</a>
                </p>
              </div>

              <div styleName="detail">
                <h3 styleName="detail__title">
                  Website
                </h3>

                <p styleName="detail__content">
                  <a href={dentist.dentistInfo.url}>{dentist.dentistInfo.url}</a>
                </p>
              </div>

              <div styleName="detail">
                <h3 styleName="detail__title">
                  Hours
                </h3>

                <p styleName="detail__content">
                  <span styleName="work-hours__day">Monday:</span>
                  {workHours.monday}
                  <br />

                  <span styleName="work-hours__day">Tuesday:</span>
                  {workHours.tuesday}
                  <br />

                  <span styleName="work-hours__day">Wednesday:</span>
                  {workHours.wednesday}
                  <br />

                  <span styleName="work-hours__day">Thursday:</span>
                  {workHours.thursday}
                  <br />

                  <span styleName="work-hours__day">Friday:</span>
                  {workHours.friday}
                  <br />

                  <span styleName="work-hours__day">Saturday:</span>
                  {workHours.saturday}
                  <br />

                  <span styleName="work-hours__day">Sunday:</span>
                  {workHours.sunday}
                </p>
              </div>

            </div>

            <div className="col-md-6">

              {/*
              Dentist Office Photos
              ------------------------------------------------------------
              */}
              {/* Hiding mocked-up portions of the UI.  Just uncomment to enable. */}
              {/*
              <div styleName="photos">
                TODO: Photos goes here...
              </div>
              */}

              {/*
              Dentist Map
              ------------------------------------------------------------
              */}
              {/* Hiding mocked-up portions of the UI.  Just uncomment to enable. */}
              {/*
              <div styleName="map">
                TODO: Map goes here...
              </div>
              */}

            </div>
          </div>

          <div className="row">

            {/*
            Dentist Services
            ------------------------------------------------------------
            */}
            {/* Hiding mocked-up portions of the UI.  Just uncomment to enable. */}
            {/*
            <div className="col-md-12">
              <div styleName="detail">
                <h3 styleName="detail__title">
                  Services
                </h3>

                <div className="row" styleName="detail__content">
                  <div className="col-md-3">
                    Cleanings &amp; Prevention
                    <br />
                    Dental Exams and Cleanings
                    <br />
                    Digital X-Rays
                    <br />
                    Fluoride Treatment
                    <br />
                    Sealants
                  </div>

                  <div className="col-md-3">
                    Cosmetic Dentistry
                    <br />
                    CEREC® One Day Crowns
                    <br />
                    Composite Fillings
                    <br />
                    Dental Implants
                    <br />
                    Invisalign
                  </div>

                  <div className="col-md-3">
                    Lumineers
                    <br />
                    Porcelain Crowns (Caps)
                    <br />
                    Porcelain Fixed Bridges
                    <br />
                    Porcelain Onlays
                    <br />
                    Porcelain Veneers
                  </div>

                  <div className="col-md-3">
                    Procera Crowns
                    <br />
                    Tooth Whitening
                    <br />
                    Sedation / Sleep Dentistry
                    <br />
                    Oral Cancer Screenings
                    <br />
                    Periodontal Disease
                    <br />
                    Emergency Care
                  </div>

                </div>
              </div>
            </div>
            */}

            {/* End Last Row */}
          </div>

          {/* End Content */}
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

export default PatientDentistPage;
