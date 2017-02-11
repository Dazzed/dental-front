/*
Patient Family Page
================================================================================
Route: `/your-dentist`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import Avatar from 'components/Avatar';
import LoadingSpinner from 'components/LoadingSpinner';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  fetchDentist,
} from './actions';
import {
  dentistSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    dentist: dentistSelector(state),
    user: selectCurrentUser(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    fetchDentist: () => dispatch(fetchDentist()),
    resetForm: () => dispatch(resetForm('TODO')),
    // TODO
  };
}


/*
Family
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class FamilyPage extends React.Component {

  static propTypes = {
    // state
    dentist: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // dispatch
    changePageTitle: React.PropTypes.func.isRequired,
    fetchDentist: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.changePageTitle('Your Dentist');
    this.props.fetchDentist();
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  sendMessage = () => {
    // TODO
  }

  writeReview = () => {
    // TODO
  }

  changeDentist = () => {
    // TODO
  }

  /*
  Form Events
  ------------------------------------------------------------
  */
  // TODO

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const { dentist, user } = this.props;

    console.log(dentist);

    // precondition: the data must be loaded, otherwise wait for it
    if (dentist === false) {
      return (
        <div>
          <PatientDashboardTabs active="dentist" />

          <div styleName="content">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <PatientDashboardTabs active="dentist" />

        <div styleName="content">

          <div className="row">

            {/*
            Dentist Profile
            ------------------------------------------------------------
            */}
            <div className="col-md-9" styleName="profile-content-wrapper">
              <div styleName="profile-content__avatar">
                <Avatar url={dentist.avatar} size={9} />
              </div>

              <div styleName="profile-content__name-and-rating">
                <h2 styleName="large-title--short">
                  {dentist.firstName} {dentist.lastName}
                </h2>

                <p>TODO: Rating</p>
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
                    value="SEND A MESSAGE"
                    onClick={this.sendMessage}
                  />
                </p>

                <p>
                  <input
                    type="button"
                    styleName="button--full-width"
                    value="WRITE A REVIEW"
                    onClick={this.writeReview}
                  />
                </p>

                <p>
                  <input
                    type="button"
                    styleName="button--lowlight--full-width"
                    value="CHANGE DENTIST"
                    onClick={this.changeDentist}
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
                <h3 styleName="detail__title">
                  Address
                </h3>

                <p styleName="detail__content">
                  {/* TODO: {dentist.address} */}
                  Wells Family Dental
                  <br />
                  123 Address Street
                  <br />
                  Cityname, North Carolina 12345
                </p>

                <p styleName="detail__content">
                  <a href="tel:450-512-2111">450-512-2111</a>
                </p>
              </div>

              <div styleName="detail">
                <h3 styleName="detail__title">
                  Website
                </h3>

                <p styleName="detail__content">
                  {/* TODO: {dentist.website} */}
                  <a href="https://google.com">WellsFamilyDental.com</a>
                </p>
              </div>

              <div styleName="detail">
                <h3 styleName="detail__title">
                  Hours
                </h3>

                <p styleName="detail__content">
                  {/* {dentist.hours[0]} */}
                  Monday - Thursday: 8AM - 6PM
                  <br />
                  {/* {dentist.hours[1]} */}
                  Friday: 8AM - 4PM
                </p>

                <p styleName="detail__content">
                  {/* {dentist.hours[2]} */}
                  Closed Saturday &amp; Sunday
                </p>
              </div>

            </div>

            {/*
            Dentist Map
            ------------------------------------------------------------
            */}
            <div className="col-md-6">
              {/* TODO */}
              TODO: need address for map...
            </div>

          </div>

          <div className="row">

            {/*
            Dentist Services
            ------------------------------------------------------------
            */}
            <div className="col-md-12">
              <div styleName="detail">
                <h3 styleName="detail__title">
                  Services
                </h3>

                <div className="row" styleName="detail__content">
                  {/* TODO: {dentist.services} */}

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

          </div>

        </div>
      </div>
    );
  }
}

export default FamilyPage;
