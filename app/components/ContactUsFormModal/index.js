/*
Contact Us Form Modal Component
================================================================================
*/

/*
Import
------------------------------------------------------------
*/
// libs
import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  submit as submitForm
} from 'redux-form';

// app
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import ContactUsValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch(submitForm('contactUs')),
});


/*
Contact Us Form Modal
================================================================================
*/
@connect(null, mapDispatchToProps)
@reduxForm({
  form: 'contactUs',
  enableReinitialize: true,
  validate: ContactUsValidator,
})
@CSSModules(styles)
export default class ContactUsFormModal extends React.Component {

  static propTypes = {
    // form related
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // modal related
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // form related
      handleSubmit,
      submit,
      submitting,

      // modal related
      show,
      onCancel,
    } = this.props;

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        onHide={onCancel}
        show={show}
      >
        {/*
        Modal Header
        ------------------------------------------------------------
        */}
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="form-horizontal"
          >
            <div className="row">
              <Field
                name="name"
                type="text"
                component={this.getLabeledInput}
                label="Name"
                placeholder=""
                className="col-md-6"
              />

              <Field
                name="email"
                type="text"
                component={this.getLabeledInput}
                label="Email"
                placeholder=""
                className="col-sm-6"
              />
            </div>

            <div className="row">
              <Field
                name="message"
                type="textarea"
                component={this.getLabeledInput}
                label="Write Your Message"
                placeholder=""
                className="col-sm-12"
                rows={5}
              />
            </div>
          </form>
        </Modal.Body> 

        {/*
        Modal Footer
        ------------------------------------------------------------
        */}
        <Modal.Footer>
          <div className="row">

            <div className="col-md-9">
              <p>
                You can also email us at <a href="mailto:info@dentalhq.com" target="_blank">info@dentalhq.com</a> or give us a call at <a href="tel:(919) 825-1239">(919) 825-1239</a>.
              </p>
            </div>

            <div className="col-md-3">
              <div className="modal-controls">
                <input
                  type="button"
                  className="modal-control"
                  disabled={submitting}
                  onClick={submit}
                  value="SUBMIT"
                />
              </div>
            </div>

          </div>
        </Modal.Footer>

      </Modal>
    );
  }
}
