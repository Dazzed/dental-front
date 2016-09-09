import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';

// import PatientGroup from './PatientGroup';

// import { load as loadCurrentUser } from 'redux/modules/currentUser';
// import { load as loadPatients } from 'redux/modules/patients';

// import RevenueStats from './RevenueStats';
// import './DentistDashboard.scss';

// @connect(
//   state => ({
//     user: state.auth.user,
//     currentUser: state.currentUser.data,
//     error: state.currentUser.error,
//     patients: state.patients.data,
//     loading: state.currentUser.loading
//   }),
//   {
//     loadCurrentUser,
//     loadPatients,
//   }
// )

export default class DentistDashboard extends Component {
  static propTypes = {
    user: PropTypes.object,
    currentUser: PropTypes.object,
    patients: PropTypes.array,
    loading: PropTypes.bool,
    loadCurrentUser: PropTypes.func.isRequired,
    loadPatients: PropTypes.func.isRequired,
  }

  componentWillMount () {
    // const { user } = this.props;
    // this.props.loadCurrentUser(user.id);
    // this.props.loadPatients(user.id);
  }

  render () {
    return <div>Dentist Dashboard</div>
    // const user = this.props.currentUser;
    // const patients = this.props.patients || [];

    // return (user &&
    //   <div className="dentist-dashboard-container">
    //     <Well className="message-box">
    //       <div className="row">
    //         <div className="col-md-8">
    //           <div className="hello-name">Hello {`${user.firstName} ${user.lastName}`},</div>
    //           <div>Current membership fees and activation fees</div>
    //         </div>
    //       </div>
    //     </Well>
    //     <h1>List Total Active Members</h1>
    //     <Well>
    //       <PatientGroup
    //         patients={patients}
    //         title="New Members"
    //         sortBy={null}
    //       />
    //     </Well>

    //     <RevenueStats total={user.totalRevenue} />
    //   </div>
    // );
  }
}
