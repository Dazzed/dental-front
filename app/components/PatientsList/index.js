/*
Patients List Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';

// app
import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';

// local
import styles from './styles.css';

/*
Patients List
================================================================================
*/
@CSSModules(styles)
class PatientsList extends React.Component {

  static propTypes = {
    // passed in
    patients: React.PropTypes.arrayOf(React.PropTypes.object), // will be `null` until loaded
    onEditMembership: React.PropTypes.func.isRequired,
    onRenewMembership: React.PropTypes.func.isRequired,
    onToggleEnrollmentFee: React.PropTypes.func.isRequired,
  }

  onEditClick = (index) => {
    const patient = this.props.patients[index];

    return () => {
      this.props.onEditMembership(patient);
    };
  }

  onRenewClick = (index) => {
    const patient = this.props.patients[index];

    return () => {
      this.props.onRenewMembership(patient);
    };
  }

  onEnrollmentFeeClick = (index) => {
    const patient = this.props.patients[index];

    return () => {
      this.props.onToggleEnrollmentFee(patient);
    };
  }

  render () {
    const {
      patients
    } = this.props;

    const patientRows = patients.map((patient, index) => {
      return (
        <div className="row">
          
        </div>
      );
    });

    return (
      <div>
        {patientRows}
      </div>
    );
  }

}

export default PatientsList;
