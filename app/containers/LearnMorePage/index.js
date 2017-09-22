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
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';
import FaCheck from 'react-icons/lib/fa/check';

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
function mapStateToProps(state) {
  return {
    // send contact us message
    editingContactUsMessage: editingContactUsMessageSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
    // send contact us message - state
    editingContactUsMessage: React.PropTypes.object,

    // send contact us message - dispatch
    resetContactUsMessageForm: React.PropTypes.func.isRequired,
    setContactUsMessage: React.PropTypes.func.isRequired,
    clearContactUsMessage: React.PropTypes.func.isRequired,
    submitContactUsForm: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showMarketingVideo: false,
    };
  }

  /*
  Actions
  ------------------------------------------------------------
  */
  toggleMarketingVideo = () => {
    this.setState({
      ...this.state,
      showMarketingVideo: !this.state.showMarketingVideo,
    });
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
              DentalHQ.com was founded by Dentists to
              <br />
              connect the over 100 million Americans without
              <br />
              dental insurance to practices offering
              <br />
              affordable monthly memberships. Click the
              <br />
              link below to learn more about us:
            </p>

            <input
              type="button"
              styleName="large-button__inverse"
              value="WATCH VIDEO &gt;"
              onClick={this.toggleMarketingVideo}
            />
          </div>
        </div>

        {/*
        Second Block
        ------------------------------------------------------------
        */}
        <div styleName="second-block">
          <div className="container">

            <div className="row">
              <div className="col-md-10 col-md-offset-1">

                <h2 styleName="large-title">
                  Why DentalHQ.com?
                </h2>

                <div styleName="features">
                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Automated software platform, with recurring billing for monthly or annual memberships.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Fully customizable plans.  YOU decide your pricing and benefits.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      No setup fee.  No monthly fees.  No contracts.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      White-labled with your office logo and easily integrated with your website.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      DentalHQ takes care of your in-office membership marketing materials.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Merchant service fees and placement in the DentalHQ marketplace also included!
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Monthly membership report and revenues sent directly to you.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Compliant with: HIPPA, PHI, and PCI.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Retain more uninsured patients and give them an affordable option for your dental care.  Unlike insurance, these plans are a direct relationship betweeen you and the patient.
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

        {/*
        Third Block
        ------------------------------------------------------------
        */}
        <div styleName="third-block">
          <div styleName="third-block__content">
            <p styleName="large-text">
              With no signup fees or contracts
              <br />
              we've made enrolling your practice easy.
              <br />
              Questions? Just give us a call and we'll
              <br />
              walk you through the process!
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
        Modals
        ------------------------------------------------------------
        */}
        <Modal
          backdrop={true}
          dialogClassName={styles['marketing-video-modal']}
          onHide={this.toggleMarketingVideo}
          show={this.state.showMarketingVideo}
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <video
              autoPlay
              controls
              poster="https://s3.amazonaws.com/dentalhq-files/marketing/marketing-video-poster.png"
              ref="video"
              style={{width: '100%', height: '100%'}}
            >
              <source src="https://s3.amazonaws.com/dentalman_uploads/Dental%20HQ.mp4" type="video/mp4" />
            </video>
          </Modal.Body>
        </Modal>

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
