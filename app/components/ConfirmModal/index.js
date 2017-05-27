import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

import InvitePatientForm from './InvitePatientForm';

@connect(null, mapDispatchToProps)
class ConfirmModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  };

  componentWillReceiveProps({ showModal }) {
    this.setState({ showModal });
  }

  handleModalEnter = () => { };

  constructor(props) {
    super(props);
    this.state = { showModal: props.showModal };
  }

  handleCloseDialog = () => {
    const showModal = false;
    this.setState({ showModal });
  };

  onClose = () => {
    const { props: { onCancel } } = this;
    if (onCancel) {
      onCancel();
    }

    this.setState({ showModal: false });
  };

  render() {
    const { props: { onCancel, onConfirm, title, message }, state: { showModal }, onClose } = this;
    return (
      <Modal show={showModal} onHide={onClose} onEnter={this.handleModalEnter}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{ float: 'none' }}>{title || 'Confirm'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-muted text-center p-a-4">
            {message || 'Are you sure?'}
          </p>
          <div className="text-center">
            <input className="btn btn-primary" type="button" onClick={onConfirm} value="Confirm" />{' '}
            <input className="btn btn-danger" type="button" onClick={onClose} value="Cancel" />
          </div>
        </Modal.Body>

      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default ConfirmModal;
