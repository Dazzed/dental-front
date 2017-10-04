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
              DentalHQ was founded by dentists to connect over
              <br />
              100 million uninsured Americans with dentists
              <br />
              offering affordable monthly memberships.
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
                  Why DentalHQ?
                </h2>

                <div styleName="features">
                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Completely automate your in-house memberships.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Attract new patients through the DentalHQ Marketplace.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Offer both monthly and annual payment options.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      It's risk-free - no setup fees, no monthly fees, cancel anytime.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Get signed up and into your dashboard in under 10 minutes.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Customize your memberships - you decide your pricing and benefits.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Fully compliant - HIPPA, PHI, PCI
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      White-labeled with your logo, and easily integrated with your website.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-offset-1 col-md-1" styleName="feature__check">
                      <FaCheck />
                    </div>
                    <div className="col-md-10" styleName="feature">
                      Branded marketing materials provided at no cost to you.
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
              With no upfront or recurring fees, we've made
              <br />
              enrolling your practice simple and risk-free.
            </p>

            <p styleName="large-text">
              Still have questions? Get in touch.
              <br />
              We'll help you every step of the way!
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
