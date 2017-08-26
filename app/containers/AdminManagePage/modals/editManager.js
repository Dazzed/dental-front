import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm, submit as submitForm } from 'redux-form';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';

import styles from './styles.css';
import addManagerValidator from './addManagerValidator';

function formatPhoneNumber(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

function mapStateToProps(state) {
  if (state.AdminManagePage.editingManager) {
    const { firstName, lastName, email } = state.AdminManagePage.editingManager;
    const phone = state.AdminManagePage.editingManager.phoneNumbers[0].number;
    return {
      initialValues: {
        firstName,
        lastName,
        email,
        phone: formatPhoneNumber(phone),
      }
    };
  }
  return {};
}

@connect(mapStateToProps, null)
@reduxForm({
  form: 'editManager',
  enableReinitialize: true,
  validate: addManagerValidator,
})
@CSSModules(styles)
export default class EditManagerForm extends React.Component{

  getInput(props) {
    return new Input(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  render() {
    const {
      editingManager,
      onCancel,
      onEditManager,
      submitting,
      submit,
      handleSubmit,
      valid,
      dirty
    } = this.props;

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        show={editingManager !== null}
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
          >
            <Row>
              <Field
                name="firstName"
                type="text"
                component={this.getLabeledInput}
                label="First Name"
                placeholder=""
                width={6}
                className="col-sm-12"
              />
            </Row>
            <br />
            <Row>
              <Field
                name="lastName"
                type="text"
                component={this.getLabeledInput}
                label="Last Name"
                placeholder=""
                width={6}
                className="col-sm-12"
              />
            </Row>
            <br />
            <Row>
              <Field
                name="phone"
                type="text"
                mask="(999) 999-9999"
                maskChar=" "
                component={this.getLabeledInput}
                label="Phone Number"
                placeholder=""
                width={6}
              />
            </Row>
            <br />
            <Row>
              <Field
                name="email"
                type="text"
                component={this.getLabeledInput}
                label="Email"
                placeholder=""
                className="col-sm-6"
              />
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={submitting || !valid || !dirty}
              onClick={submit}
              value="EDIT"
            />
          </div>
        </Modal.Footer>
      </Modal>
    )
  }

}