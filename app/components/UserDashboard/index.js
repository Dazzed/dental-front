/**
*
* UserDashboard
*
*/

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';

import Intro from './Intro';
import MyDentist from './MyDentist';
import FamilyMembers from './FamilyMembers';

import { selectCurrentUser } from 'containers/App/selectors';
import {
  selectMyDentist,
  selectMyFamilyMembers,
} from 'containers/Dashboard/selectors';
import { fetchMyDentist, fetchMyFamily } from 'containers/Dashboard/actions';

import styles from './index.css';

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
  };

  componentWillMount () {
    this.props.fetchMyDentist();
    this.props.fetchMyFamily();
  }

  render () {
    const { loggedInUser, myDentist, myFamilyMembers } = this.props;
    const fullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    return (
      <div className="user-dashboard-container">
        <Intro fullName={fullName} />

        <h3>Your Dentist</h3>

        <MyDentist dentist={myDentist} />

        <div styleName="h3-with-button" className="clearfix">
          <h3>Your Family Members</h3>
          <Button bsStyle="primary" styleName="btn-add-member">
            Add | edit family members
          </Button>
        </div>

        <FamilyMembers
          accountStatus="Active"
          monthlyDue="999"
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
  };
}
