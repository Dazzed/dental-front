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
import refundValidator from './refundValidator';

@connect(null, null)
@reduxForm({
  form: 'refundMember',
  enableReinitialize: true,
  validate: refundValidator,
})
@CSSModules(styles)
export default class RefundMemberForm extends React.Component {

  getInput(props) {
    return new Input(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  render() {
    const {
      onCancel,
      refundingMember,
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
        show={refundingMember}
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Refund Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
          >
            <Row>
              <Field
                name="amount"
                type="number"
                component={this.getLabeledInput}
                label="Amount (in dollars)"
                placeholder=""
                width={6}
                className="col-sm-12"
              />
            </Row>
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={submitting || !valid || pristine}
              onClick={submit}
              value="INITIATE REFUND"
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
