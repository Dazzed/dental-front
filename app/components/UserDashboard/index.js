/**
*
* UserDashboard
*
*/

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import changeFactory from 'change-js';
import moment from 'moment';
import get from 'lodash/get';

import formatUser from 'utils/formatUser';

import { selectCurrentUser } from 'containers/App/selectors';
import { fetchMyDentist, fetchMyFamily } from 'containers/Dashboard/actions';
import PaymentForm from 'containers/Authorize.net';
import { selectMyDentist } from 'containers/Dashboard/selectors';
import { selectMembersList as selectMyFamilyMembers }
  from 'containers/MyFamilyMembers/selectors';

import Intro from './Intro';
import MyDentist from './MyDentist';
import MyInfo from './MyInfo';
import FamilyMembers from './FamilyMembers';

import styles from './index.css';

const Change = changeFactory();

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class UserDashboard extends Component {

  static propTypes = {
    loggedInUser: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    myDentist: PropTypes.object,
    newMsgCountBySender: PropTypes.object,
    myFamilyMembers: PropTypes.array,
    fetchMyDentist: PropTypes.func,
    fetchMyFamily: PropTypes.func,
    markMsgRead: PropTypes.func,
    changeRoute: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.goToMembersPage = this.goToMembersPage.bind(this);
  }

  componentWillMount () {
    this.props.fetchMyDentist();
    this.props.fetchMyFamily();
  }

  goToMembersPage () {
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
      loggedInUser, myDentist, myFamilyMembers, newMsgCountBySender,
    } = this.props;
    const fullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    const status = myDentist ? myDentist.subscriptions[0].status : '';
    // TODO: better here to use selector!
    let total = myDentist ? myDentist.subscriptions[0].monthly : '0';
    const paidAt = get(myDentist, 'subscriptions[0].paidAt');
    let dueAt;

    if (myDentist) {
      total = new Change({ dollars: loggedInUser.payingMember ? total : '0' });
      myFamilyMembers.forEach(member => {
        if (member.subscription) {
          total = total.add(
            new Change({ dollars: member.subscription.monthly })
          );
        }
      });
      total = total.dollars().toFixed(2);
    }

    if (paidAt) {
      dueAt = moment(paidAt).add(1, 'month');
    }

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
          accountStatus={status}
          monthlyDue={total}
          dueAt={dueAt}
          members={myFamilyMembers}
          owner={formatUser(loggedInUser, myDentist)}
        />
        <div className="clearfix">
          <PaymentForm total={total} user={loggedInUser} status={status} />
        </div>

        {dueAt &&
          <div className="clearfix">
            <p>
              <br />
              This is a recurring payment and the membership is good until{' '}
              <strong>{dueAt.format('MMMM Do YYYY')}</strong>.
            </p>
          </div>
        }

        <br />

      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    loggedInUser: selectCurrentUser(state),
    myDentist: selectMyDentist(state),
    myFamilyMembers: selectMyFamilyMembers(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMyDentist: () => dispatch(fetchMyDentist()),
    fetchMyFamily: () => dispatch(fetchMyFamily()),
    changeRoute: (url) => dispatch(push(url)),
  };
}
