import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Well } from 'react-bootstrap';
import * as widgetActions from 'redux/modules/currentUser';
import FamilyMember from './FamilyMember';
import Dentist from './Dentist';
import './UserDashboard.scss';

@connect(
  state => ({
    user: state.auth.user,
    currentUser: state.currentUser.data,
    error: state.currentUser.error,
    loading: state.currentUser.loading
  }),
  {...widgetActions })
export default class UserDashboard extends Component {
  static propTypes = {
    user: PropTypes.object,
    currentUser: PropTypes.object,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    dentist: PropTypes.array,
  }

  componentWillMount() {
    const { user } = this.props;
    this.props.load(user.id);
  }

  render() {
    const user = this.props.currentUser || null;

    return (user &&
      <div className="user-dashboard-container">
        <Well>
          <h1>Hello {`${user.firstName} ${user.lastName}`}</h1>
          <p>Welcome to your personal dashboard. Here you can edit your account, write reviews and contact your dentist.</p>
        </Well>
        <h1>Your Dentist</h1>
        <Well>
          <Dentist {...user.dentist[0]} />
        </Well>
        <h1>Your Family Members</h1>
        <Well>
          <div className="member-list">
            {
              user.members.map((member, index) => (
                <FamilyMember {...member} key={index}/>
              ))
            }
          </div>
        </Well>
      </div>
    );
  }
}
