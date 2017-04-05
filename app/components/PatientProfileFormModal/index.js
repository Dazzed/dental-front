/*
Patient Profile Form Modal Component
================================================================================
*/

/*
Import
------------------------------------------------------------
*/
// libs
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm, submit as submitForm } from 'redux-form';

// app
import {
  PREFERRED_CONTACT_METHODS,
  US_STATES,
} from 'common/constants';
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import PatientProfileValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch(submitForm('patientProfile')),
});


/*
Member Form Modal
================================================================================
*/
@connect(null, mapDispatchToProps)
@reduxForm({
  form: 'patientProfile',
  enableReinitialize: true,
  validate: PatientProfileValidator,
})
@CSSModules(styles)
export default class PatientProfileFormModal extends React.Component {

  static propTypes = {
    // event handlers - passed in
    goToSecurityForm: React.PropTypes.func,

    // form related - passed in
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // modal related - passed in
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  /*
  Event Handlers
  ------------------------------------------------------------
  */
  securityFormLinkClick = (e) => {
    e.preventDefault();
    this.props.goToSecurityForm();
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // event handlers
      goToSecurityForm,

      // form related
      initialValues,
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
          <Modal.Title>Edit Profile</Modal.Title>
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
            <Row>
              <Field
                name="address"
                type="text"
                component={LabeledInput}
                label="Address"
                placeholder=""
                className="col-sm-12"
              />

              <Field
                name="city"
                type="text"
                component={LabeledInput}
                label="City"
                placeholder=""
                className="col-sm-4"
              />

              <Field
                name="state"
                type="select"
                component={LabeledInput}
                label="State"
                placeholder=""
                className="col-sm-4"
              >
                <option value=""></option>
                {Object.keys(US_STATES).map(key =>
                  <option value={key} key={key}>
                    {US_STATES[key]}
                  </option>
                )}
              </Field>

              <Field
                name="zipCode"
                type="text"
                mask="99999"
                maskChar=" "
                component={LabeledInput}
                label="Zip Code"
                placeholder=""
                className="col-sm-4"
              />
            </Row>

            <Row>
              <Field
                name="phone"
                type="text"
                mask="(999) 999-9999"
                maskChar=" "
                component={LabeledInput}
                label="Phone"
                placeholder=""
                className="col-sm-4"
              />

              <Field
                name="contactMethod"
                type="select"
                label="Preferred Contact Method"
                component={LabeledInput}
                className="col-md-6 col-sm-8"
              >
                <option value=""></option>
                {Object.keys(PREFERRED_CONTACT_METHODS).map(key =>
                  <option
                    value={key}
                    key={key}
                  >
                    {PREFERRED_CONTACT_METHODS[key]}
                  </option>
                )}
              </Field>
            </Row>

            {goToSecurityForm && (
              <p styleName="field-instructions">
                You can update your account email and password in the
                {' '}
                <a href="#" onClick={this.securityFormLinkClick}>Login and Security Settings</a>
                {' '}
                form.
              </p>
            )}

          </form>
        </Modal.Body>

        {/*
        Modal Footer
        ------------------------------------------------------------
        */}
        <Modal.Footer>
          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={submitting}
              onClick={submit}
              value="Update Profile"
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}