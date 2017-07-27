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
  SEX_TYPES,
  PREFERRED_CONTACT_METHODS,
  US_STATES,
} from 'common/constants';
import LabeledInput from 'components/LabeledInput';
import renderDatePicker from 'components/DatePicker';

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

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  getDatePicker(props) {
    return new renderDatePicker(props);
  }

  /*
  Event Handlers
  ------------------------------------------------------------
  */
  securityFormLinkClick = (e) => {
    e.preventDefault();
    this.props.goToSecurityForm();
  }

  renderMembershipType = () => {
    const { dentist: { memberships } } = this.props;

    let membershipId = -1;
    if (this.props.initialValues) {
      membershipId = this.props.initialValues.clientSubscription ?
          this.props.initialValues.clientSubscription.membershipId :
          this.props.initialValues.membershipId;
    }

    // This is needed since the same component is being used for multiple views...
    // sometimes we get this value from "clientSubscription.membershipId", other
    // times 'membershipId'.
    const fieldName = (this.props.initialValues && this.props.initialValues.clientSubscription) ?
        'clientSubscription.membershipId' : 'membershipId';

    return (<Field
      name={fieldName}
      type="select"
      component={this.getLabeledInput}
      label="Membership Type"
      className="col-md-6"
    >
      <option>Membership Type</option>
      {
        memberships
          .filter(membership => (membership.active && membership.subscription_age_group === 'adult') || membershipId === membership.id)
          .sort((a, b) => a.subscription_age_group - b.subscription_age_group)
          .map(membership =>
            <option value={membership.id} key={membership.id} label={`${membership.name.ucFirst()} — $${membership.price}`}>{membership.id}</option>
          )
      }
    </Field>);
  };
  /*
  Render
  ------------------------------------------------------------
  */
  render() {
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
          <Modal.Title>Edit Patient</Modal.Title>
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
              {this.renderMembershipType()}
            </Row>

            <Row>
              <Field
                name="firstName"
                type="text"
                component={this.getLabeledInput}
                label="First Name"
                className="col-md-6"
              />

              <Field
                name="lastName"
                type="text"
                component={this.getLabeledInput}
                label="Last Name"
                className="col-md-6"
              />
            </Row>

            <Row>
              <Field
                name="sex"
                type="select"
                label="Sex"
                component={this.getLabeledInput}
                className="col-md-6"
              >
                <option value="">Select sex</option>
                {Object.keys(SEX_TYPES).map(key =>
                  <option value={key} key={key}>
                    {SEX_TYPES[key]}
                  </option>
                )}
              </Field>

              <Field
                name="birthDate"
                type="date"
                component={this.getDatePicker}
                label="Birthdate"
                className="col-md-6"
              />
            </Row>

           <Row>
              <Field
                name="address"
                type="text"
                component={this.getLabeledInput}
                label="Address"
                placeholder=""
                className="col-sm-12"
              />

              <Field
                name="city"
                type="text"
                component={this.getLabeledInput}
                label="City"
                placeholder=""
                className="col-sm-4"
              />

              <Field
                name="state"
                type="select"
                component={this.getLabeledInput}
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
                component={this.getLabeledInput}
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
                component={this.getLabeledInput}
                label="Phone"
                placeholder=""
                className="col-sm-4"
              />

              <Field
                name="contactMethod"
                type="select"
                label="Preferred Contact Method"
                component={this.getLabeledInput}
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
