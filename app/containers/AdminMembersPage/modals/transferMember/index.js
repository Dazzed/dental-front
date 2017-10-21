import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import FormControl from 'react-bootstrap/lib/FormControl';

import styles from './styles.css';

@CSSModules(styles)
export default class TransferMemberModal extends React.Component {

  componentWillMount = () => {
    this.state = {
      reEnrollFee: false
    };
  }

  toggleReEnrollFee = () => {
    const {
      reEnrollFee
    } = this.state;
    this.setState({ reEnrollFee: !reEnrollFee });
  }

  initiateTransfer = () => {
    const {
      transferMember,
      transferringMember
    } = this.props;
    const {
      reEnrollFee: shouldChargeReEnrollmentFree
    } = this.state;
    transferMember(transferringMember, shouldChargeReEnrollmentFree);
  }

  render () {
    const {
      onCancel,
      isTransferringMember
    } = this.props;

    const {
      reEnrollFee
    } = this.state;

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        show
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <span className={styles['float-left']}>
              <FormControl
                type="checkbox"
                value={reEnrollFee}
                onChange={this.toggleReEnrollFee}
                className="input-checkbox"
              />
              <p className={styles['charge-text']}>Charge Re-Enrollment Fee</p>
            </span>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={isTransferringMember}
              onClick={this.initiateTransfer}
              value={isTransferringMember ? 'Loading...' : 'INITIATE TRANSFER'}
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
