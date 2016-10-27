import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

import { submitInvitePatientForm } from 'containers/Dashboard/actions';
import InvitePatientForm from './InvitePatientForm';

@connect(null, mapDispatchToProps)
class InvitePatientModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool,
    onClose: PropTypes.func,
    dispatchSubmit: PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm (values) {
    this.props.dispatchSubmit({
      ...values,
    });
    // this.props.onClose();
  }

  render () {
    const { showModal, onClose } = this.props;

    return (
      <Modal show={showModal} onHide={onClose} onEnter={this.onModalEnter}>
        <Modal.Header closeButton>
          <Modal.Title>Invite A Client</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InvitePatientForm
            onSubmit={this.onSubmitForm}
          />
        </Modal.Body>

      </Modal>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSubmit: (values) => dispatch(submitInvitePatientForm(values)),
  };
}

export default InvitePatientModal;
