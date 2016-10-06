import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

import { submitClientMessageForm } from 'containers/Dashboard/actions';

import WriteMessageForm from './WriteMessageForm';

class WriteMessageModal extends Component {
  static propTypes = {
    recipientId: PropTypes.number,
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
      recipientId: this.props.recipientId,
      body: {
        ...values,
      },
    });
    this.props.onClose();
  }

  render () {
    const { showModal, onClose } = this.props;

    return (
      <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write A Message</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <WriteMessageForm
            onSubmit={this.onSubmitForm}
          />
        </Modal.Body>

      </Modal>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSubmit: (values) => dispatch(submitClientMessageForm(values)),
  };
}

export default connect(null, mapDispatchToProps)(WriteMessageModal);
