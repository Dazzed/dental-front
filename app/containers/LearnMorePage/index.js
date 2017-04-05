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

  constructor (props) {
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

            {/* TODO: https://trello.com/c/f033SU5f/124-marketing-add-marketing-videos */}
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
            {/* TODO: show video */}
            {/* https://trello.com/c/f033SU5f/124-marketing-add-marketing-videos */}
            Video Goes Here
            {/*
              <video
                autoPlay
                controls
                poster={marketingVideoPoster}
                ref="video"
              >
                <source src={marketingVideo} type="video/mp4" />
              </video>
            */}
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
