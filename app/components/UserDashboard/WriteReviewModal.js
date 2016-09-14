import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

import { submitClientReviewForm } from 'containers/Dashboard/actions';

import WriteReviewForm from './WriteReviewForm';

class WriteReviewModal extends Component {
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
    console.log('Review form submitted', values);
    this.props.dispatchSubmit(values);
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
          <WriteReviewForm
            onSubmit={this.onSubmitForm}
          />
        </Modal.Body>

      </Modal>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSubmit: (values) => dispatch(submitClientReviewForm(values)),
  };
}

export default connect(null, mapDispatchToProps)(WriteReviewModal);
