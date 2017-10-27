import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

@connect(null, mapDispatchToProps)
class ConfirmModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.any,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    canClose: PropTypes.bool
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
    // We do not want to close the modal If the parent component
    // controls the onCancel behaviour completely
    if (this.props.canClose) {
      this.setState({ showModal: false });
    }
  };

  render() {
    const { props: { onCancel, onConfirm, title, message }, state: { showModal }, onClose } = this;
    return (
      <Modal show={showModal} onHide={onClose} onEnter={this.handleModalEnter}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{ float: 'none' }}>{title || 'Confirm'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-muted text-center p-a-4">
            {message || 'Are you sure?'}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
            <input className="btn btn-primary" type="button" onClick={onConfirm} value="Yes" />{' '}
            <input className="btn btn-danger" type="button" onClick={onClose} value="No" />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default ConfirmModal;
