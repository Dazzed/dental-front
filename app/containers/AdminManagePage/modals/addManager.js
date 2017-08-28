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

@connect(null, null)
@reduxForm({
  form: 'addManager',
  enableReinitialize: true,
  validate: addManagerValidator,
})
@CSSModules(styles)
export default class AddManagerForm extends React.Component{

  getInput(props) {
    return new Input(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  render() {
    const {
      addingManager,
      onCancel,
      onAddManager,
      submitting,
      submit,
      handleSubmit,
      valid,
      pristine,
    } = this.props;

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        show={addingManager}
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Manager</Modal.Title>
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
              disabled={submitting || !valid || pristine}
              onClick={submit}
              value="SUBMIT"
            />
          </div>
        </Modal.Footer>
      </Modal>
    )
  }

}