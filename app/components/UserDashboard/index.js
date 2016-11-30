import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import formatUser from 'utils/formatUser';
import PaymentForm from 'containers/Authorize.net';

import { selectCurrentUser } from 'containers/App/selectors';
import { fetchMyDentist, fetchMyMembers } from 'containers/Dashboard/actions';
import {
  myDentistSelector,
  myMembersSelector,
} from 'containers/Dashboard/selectors';

import Intro from './Intro';
import MyDentist from './MyDentist';
import MyInfo from './MyInfo';
import FamilyMembers from './FamilyMembers';

import styles from './index.css';


const mapStateToProps = (state) => ({
  loggedInUser: selectCurrentUser(state),
  myDentist: myDentistSelector(state),
  myMembers: myMembersSelector(state),
});


function mapDispatchToProps (dispatch) {
  return {
    fetchMyDentist: () => dispatch(fetchMyDentist()),
    fetchMyMembers: () => dispatch(fetchMyMembers()),
    changeRoute: (url) => dispatch(push(url)),
  };
}


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class UserDashboard extends Component {

  static propTypes = {
    myDentist: PropTypes.object,
    newMsgCountBySender: PropTypes.object,
    myMembers: PropTypes.array,
    fetchMyDentist: PropTypes.func,
    fetchMyMembers: PropTypes.func,
    markMsgRead: PropTypes.func,
    changeRoute: PropTypes.func,
    loggedInUser: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
  };

  componentWillMount () {
    this.props.fetchMyDentist();
    this.props.fetchMyMembers();
  }

  goToMembersPage = () => {
    this.props.changeRoute('my-family-members');
  }

  goToProfilePage = () => {
    this.props.changeRoute('/accounts/profile');
  }

  markMsgRead = (senderId) => {
    this.props.markMsgRead(senderId);
  }

  render () {
    const {
      loggedInUser, myDentist, myMembers, newMsgCountBySender,
    } = this.props;

    const fullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

    console.log(myDentist);

    return (
      <div className="user-dashboard-container">
        <Intro fullName={fullName} />

        <h3>Your Dentist</h3>

        <MyDentist
          dentist={myDentist}
          newMsgCount={newMsgCountBySender}
          markMsgRead={this.markMsgRead}
        />

        <div styleName="h3-with-button" className="clearfix">
          <h3>Your Info</h3>
          <button
            className="btn btn-padding btn-darkest-green btn-round"
            onClick={this.goToProfilePage}
          >
            Edit your info
          </button>
        </div>

        <MyInfo user={loggedInUser} />

        <div styleName="h3-with-button" className="clearfix">
          <h3>Your Family Memberships</h3>
        </div>

        <FamilyMembers
          members={myMembers}
        />

        <div className="clearfix">
          <PaymentForm user={loggedInUser} status={status} />
        </div>
        <br />
      </div>
    );
  }
}

