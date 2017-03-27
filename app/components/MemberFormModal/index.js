/*
Member Form Modal Component
================================================================================
*/

/*
Import
------------------------------------------------------------
*/
// libs
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm, submit as submitForm } from 'redux-form';

// app
import {
  SEX_TYPES,
  PREFERRED_CONTACT_METHODS,
  MEMBER_RELATIONSHIP_TYPES,
} from 'common/constants';
import renderDatePicker from 'components/DatePicker';
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import MemberValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch(submitForm('familyMember')),
});


/*
Member Form Modal
================================================================================
*/
@connect(null, mapDispatchToProps)
@reduxForm({
  form: 'familyMember',
  enableReinitialize: true,
  validate: MemberValidator,
})
@CSSModules(styles)
export default class MemberFormModal extends React.Component {

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

  render () {
    const {
      // form related
      initialValues,
      handleSubmit,
      submit,
      submitting,

      // modal related
      show,
      onCancel,
    } = this.props;

    let title = "Edit Member";
    let saveText = "Save Member";
    if (initialValues === null) {
      title = "Add Member";
      saveText = "Save and Checkout";
    }

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
          <Modal.Title>{title}</Modal.Title>

          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={submitting}
              onClick={submit}
              value={saveText}
            />
          </div>
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
                name="firstName"
                type="text"
                component={LabeledInput}
                label="First Name"
                className="col-md-6"
              />

              <Field
                name="lastName"
                type="text"
                component={LabeledInput}
                label="Last Name"
                className="col-md-6"
              />
            </Row>

            <Row>
              <Field
                name="familyRelationship"
                type="select"
                component={LabeledInput}
                label="Family Relationship"
                className="col-md-6"
              >
                <option value="">Select a relationship type</option>
                {Object.keys(MEMBER_RELATIONSHIP_TYPES).map((key, index) =>
                  <option value={key} key={index}>
                    {MEMBER_RELATIONSHIP_TYPES[key]}
                  </option>
                )}
              </Field>

              <Field
                name="birthDate"
                type="date"
                component={renderDatePicker}
                label="Birthdate"
                className="col-md-6"
              />
            </Row>

            <Row>
              <Field
                name="sex"
                type="select"
                label="Sex"
                component={LabeledInput}
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
                name="contactMethod"
                type="select"
                label="Contact method"
                component={LabeledInput}
                className="col-md-6"
              >
                <option value="">Select preferred contact method</option>
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

            <div className="form-group">
              <Field
                name="phone"
                type="text"
                mask="(999) 999-9999"
                maskChar=" "
                component={LabeledInput}
                label="Phone Number"
                className="col-md-6"
              />

              <Field
                name="email"
                type="text"
                component={LabeledInput}
                label="Email"
                className="col-md-6"
              />
            </div>
          </form>
        </Modal.Body>

      </Modal>
    );
  }
}
