/*
Dentist User Agreement Modal Component
================================================================================
*/

/*
Import
------------------------------------------------------------
*/
// libs
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';

// local
import DentistUserAgreement from './index.js';
import styles from './styles.css';


/*
Modal
================================================================================
*/
@CSSModules(styles)
export default class DentistUserAgreementModal extends React.Component {

  static propTypes = {
    // modal related
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,

    // user agreement
    onAgreed: React.PropTypes.func,
    showAcceptButton: React.PropTypes.bool,
  };

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // modal related
      show,
      onCancel,

      // user agreement
      onAgreed,
      showAcceptButton,
    } = this.props;

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        onHide={onCancel}
        show={show}
      >
        {/*
        Modal Header
        ------------------------------------------------------------
        */}
        <Modal.Header closeButton>
          <Modal.Title>Dentist User Agreement</Modal.Title>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          <div styleName="dentistUserAgreement__scrollWrapper">
            <DentistUserAgreement
              onAgreed={onAgreed}
              showAcceptButton={showAcceptButton}
            />
          </div>
        </Modal.Body> 

        {/*
        Modal Footer
        ------------------------------------------------------------
        */}
        <Modal.Footer>
          <p>
            Scroll down to the bottom of the terms and click "I Agree" to continue.
          </p>
        </Modal.Footer>

      </Modal>
    );
  }
}
