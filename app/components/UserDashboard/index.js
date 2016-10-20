/**
*
* UserDashboard
*
*/

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Button from 'react-bootstrap/lib/Button';
import changeFactory from 'change-js';

import { selectCurrentUser } from 'containers/App/selectors';
import { fetchMyDentist, fetchMyFamily } from 'containers/Dashboard/actions';
import {
  selectMyDentist,
  selectMyFamilyMembers,
} from 'containers/Dashboard/selectors';

import Intro from './Intro';
import MyDentist from './MyDentist';
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
    myFamilyMembers: PropTypes.array,
    fetchMyDentist: PropTypes.func,
    fetchMyFamily: PropTypes.func,
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

  render () {
    const { loggedInUser, myDentist, myFamilyMembers } = this.props;
    const fullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    const status = myDentist ? myDentist.subscriptions[0].status : '';
    // TODO: better here to use selector!
    let total = myDentist ? myDentist.subscriptions[0].monthly : 0;

    if (myDentist) {
      total = new Change({ dollars: total });
      myFamilyMembers.forEach(member => {
        total = total.add(new Change({ dollars: member.subscription.monthly }));
      });
      total = total.dollars();
    }

    return (
      <div className="user-dashboard-container">
        <Intro fullName={fullName} />

        <h3>Your Dentist</h3>

        <MyDentist dentist={myDentist} />

        <div styleName="h3-with-button" className="clearfix">
          <h3>Your Family Members</h3>
          <Button
            bsStyle="primary"
            styleName="btn-add-member"
            onClick={this.goToMembersPage}
          >
            Add | edit family members
          </Button>
        </div>

        <FamilyMembers
          accountStatus={status}
          monthlyDue={total}
          dueDate="Dec 7, 2017"
          members={myFamilyMembers}
        />
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
