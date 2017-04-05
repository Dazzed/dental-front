/*
Learn More Page
================================================================================
Route: '/learn-more'
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import CSSModules from 'react-css-modules';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { reset as resetForm } from 'redux-form';

// app
import ContactUsFormModal from 'components/ContactUsFormModal';
import PageHeader from 'components/PageHeader';

// local
import {
  // send contact us message
  setContactUsMessage,
  clearContactUsMessage,
  submitContactUsForm,
} from './actions';
import {
  // send contact us message
  editingContactUsMessageSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // send contact us message
    editingContactUsMessage: editingContactUsMessageSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changeRoute: (url) => dispatch(push(url)),

    // send contact us message
    resetContactUsMessageForm: () => dispatch(resetForm('contactUs')),
    setContactUsMessage: (message) => dispatch(setContactUsMessage(message)),
    clearContactUsMessage: () => dispatch(clearContactUsMessage()),
    submitContactUsForm: (values) => dispatch(submitContactUsForm(values)),
  };
}


/*
Learn More
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class LearnMorePage extends React.Component {

  static propTypes = {
    // app - dispatch
    changeRoute: React.PropTypes.func.isRequired,

    // send contact us message - state
    editingContactUsMessage: React.PropTypes.object,

    // send contact us message - dispatch
    resetContactUsMessageForm: React.PropTypes.func.isRequired,
    setContactUsMessage: React.PropTypes.func.isRequired,
    clearContactUsMessage: React.PropTypes.func.isRequired,
    submitContactUsForm: React.PropTypes.func.isRequired,
  };

  /*
  Actions
  ------------------------------------------------------------
  */
  goToDentistSignup = () => {
    this.props.changeRoute('/accounts/dentist-signup');
  }

  // send contact us message
  sendContactUsMessage = () => {
    this.props.resetContactUsMessageForm();
    this.props.setContactUsMessage({});
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // send contact us message
  handleContactUsFormSubmit = (values) => {
    this.props.submitContactUsForm(values);
  }

  cancelContactUsFormAction = () => {
    this.props.clearContactUsMessage();
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // send contact us message
      editingContactUsMessage,
    } = this.props;

    return (
      <div styleName="container-wrapper">
        <PageHeader title="Start Attracting New Patients Today!" />

        {/*
        First Block
        ------------------------------------------------------------
        */}
        <div styleName="first-block">
          <div styleName="first-block__content">
            <p styleName="large-text">
              DentalHQ.com was founded by a dentist to
              <br />
              connect the over 100 million Americans without
              <br />
              dental insurance to practices offering
              <br />
              affordable monthly memberships.
            </p>

            <input
              type="button"
              styleName="large-button__inverse"
              value="CONTACT US &gt;"
              onClick={this.sendContactUsMessage}
            />
          </div>
        </div>

        {/*
        Second Block
        ------------------------------------------------------------
        */}
        <div styleName="second-block">
          <h2 styleName="large-title">
            Why DentalHQ.com?
          </h2>

          <p styleName="large-text">
            Cut out the middleman and attract new fee-for-service
            <br />
            patients without the hassle of dental insurance.
          </p>
        </div>

        {/*
        Third Block
        ------------------------------------------------------------
        */}
        <div styleName="third-block">
          <div styleName="third-block__content">
            <p styleName="large-text">
              We've made signing up your practice
              <br />
              and getting started easy.  Just give us a call
              <br />
              and we'll walk you through the process!
            </p>

            <input
              type="button"
              styleName="large-button__inverse"
              value="GET STARTED &gt;"
              onClick={this.goToDentistSignup}
            />
          </div>
        </div>

        /*
        Modals
        ------------------------------------------------------------
        */
        <ContactUsFormModal
          show={editingContactUsMessage !== null}
          onCancel={this.cancelContactUsFormAction}

          initialValues={editingContactUsMessage}
          onSubmit={this.handleContactUsFormSubmit}
        />

      {/* End Wrapper Div */}
      </div>
    );
  }
}
