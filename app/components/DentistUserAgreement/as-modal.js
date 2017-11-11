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
const PDF_URL = '/documents/dentalhq-dentist-user-agreement.pdf';

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

  printTerms = () => {
    const pdf = window.open(PDF_URL);
    pdf.print();
  }

  onAgreeClick = () => {
    if (this.props.onAgreed) {
      this.props.onAgreed();
    }
  }

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
            <DentistUserAgreement />
          </div>
        </Modal.Body> 

        {/*
        Modal Footer
        ------------------------------------------------------------
        */}
        <Modal.Footer>
          <div className="row">
            <div className="col-sm-4">
              <p styleName="action-link-container">
                <a href="#" onClick={this.printTerms} styleName="action-link">Print</a>
                {' '}<a href={PDF_URL} target="_blank" styleName="action-link">Download</a>
              </p>
            </div>

            <div className="col-sm-4">
              {showAcceptButton === true && (
                <p styleName="accept-button-container">
                  <label>
                    <input
                      styleName="large-button--secondary"
                      type="button"
                      onClick={this.onAgreeClick}
                      value="I Agree"
                    />
                  </label>
                </p>
              )}
            </div>
          </div>
        </Modal.Footer>

      </Modal>
    );
  }
}
