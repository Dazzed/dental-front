/*
Dentist Reports Modal Component
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

// app
import LoadingSpinner from 'components/LoadingSpinner';

// local
import styles from './styles.css';

/*
Dentist Reports Modal
================================================================================
*/
@CSSModules(styles)
export default class DentistReportsModal extends React.Component {

  static propTypes = {
    // modal related
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,

    // reports related
    reports: React.PropTypes.object,
    onReportSelected: React.PropTypes.func.isRequired,
  };

  renderReports = () => {
    const { reports } = this.props;
    const reportsList = [];
    for (const key in reports) {
      reports[key].forEach(r => {
        reportsList.push(r);
      });
    }

    return reportsList.map(r => {
      return (
        <div className="row" key={r.year + " - " + r.month}>
          <div className="col-sm-1">
            {r.year}
          </div>
          <div className="col-sm-1">
            {r.month}
          </div>
          <div className="col-sm-push-1 col-sm-8">
            <span styleName="report-link" onClick={() => {this.props.onReportSelected(r)}}>
              Download Report
            </span>
          </div>
        </div>
      );
    });
  };

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // modal related
      show,
      onHide,

      // reports related
      reports,
    } = this.props;

    let modalBody;

    // precondition render: the data must be loaded, otherwise wait for it
    if (reports === null) {
      modalBody = (
        <div className="text-center">
          <LoadingSpinner showOnlyIcon={true} />
        </div>
      );
    }

    // precondition render: there are no reports to display
    else if (reports.length === 0) {
      modalBody = (
        <div>
          You do not have any reports yet.
        </div>
      );
    }

    // main render
    else {
      modalBody = (
        <div>
          {this.renderReports()}
        </div>
      );
    }

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        onHide={onHide}
        show={show}
      >
        {/*
        Modal Header
        ------------------------------------------------------------
        */}
        <Modal.Header closeButton>
          <Modal.Title>Your Reports</Modal.Title>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          {modalBody}
        </Modal.Body>

      </Modal>
    );
  }
}
