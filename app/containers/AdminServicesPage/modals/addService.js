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
import validators from './validators';

@connect(null, null)
@reduxForm({
  form: 'addService',
  enableReinitialize: true,
  validate: validators,
})
@CSSModules(styles)
export default class AddServiceModal extends React.Component{

  getInput(props) {
    return new Input(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  render() {
    const {
      addingService,
      onCancel,
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
        show={addingService}
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
          >
            <Row>
              <Field
                name="name"
                type="text"
                component={this.getLabeledInput}
                label="Service Name"
                placeholder=""
                width={12}
                className="col-sm-12"
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
              value="ADD SERVICE"
            />
          </div>
        </Modal.Footer>
      </Modal>
    )
  }

}