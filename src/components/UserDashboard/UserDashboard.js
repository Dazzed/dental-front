import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import { Well } from 'react-bootstrap';

import * as widgetActions from 'redux/modules/currentUser';
import FamilyMembers from './FamilyMembers';
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
        <Well className="message-box">
          <div className="row">
            <div className="col-md-8">
              <div className="hello-name">Hello {`${user.firstName} ${user.lastName}`},</div>
              <div>Welcome to your personal dashboard. Here you can edit your account, write reviews and contact your dentist.</div>
            </div>
          </div>
        </Well>
        <h1>Your Dentist</h1>
        <Well>
          <Dentist {...user.dentist[0]} />
        </Well>
        <div className="h1-with-button clearfix">
          <h1>Your Family Members</h1>
          <Button bsStyle="primary" className="btn-add-member with-shadow" onClick="">Add | edit family members</Button>
        </div>
        <Well>
          <FamilyMembers
            accountStatus="Active"
            monthlyDue="999"
            dueDate="Dec 7, 2017"
            members={user.members}
          />
        </Well>
      </div>
    );
  }
}
