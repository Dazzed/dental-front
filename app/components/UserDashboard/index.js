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
import { Modal } from 'react-bootstrap';
import util from 'util';
import axios from 'axios';

import { selectCurrentUser } from 'containers/App/selectors';
import { fetchMyDentist, fetchMyFamily } from 'containers/Dashboard/actions';
import {
  selectMyDentist,
  selectMyFamilyMembers,
} from 'containers/Dashboard/selectors';

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
    myFamilyMembers: PropTypes.array,
    fetchMyDentist: PropTypes.func,
    fetchMyFamily: PropTypes.func,
    changeRoute: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.goToMembersPage = this.goToMembersPage.bind(this);
    this.openSpreadlyView = this.openSpreadlyView.bind(this);
  }

  // SpreedlyExpress.onPaymentMethod(function(token, paymentMethod) {
  //   // Send requisite payment method info to backend
  //   var tokenField = document.getElementById("payment_method_token");
  //   var fingerprintField = document.getElementById("payment_method_fingerprint");
  //
  //   tokenField.setAttribute("value", token);
  //   fingerprintField.setAttribute("value", paymentMethod["fingerprint"]);
  //
  //   var masterForm = document.getElementById('payment-form');
  //   masterForm.submit();
  //
  // });

  componentWillMount () {
    SpreedlyExpress.init("MY4WccjEpI34lIikNK7qDAXpRVQ", {
      "amount": "$9.83",
      "company_name": "Acme",
      "sidebar_top_description": "Providing widgets",
      "sidebar_bottom_description": "Your order total today",
      "full_name": "Mike O'Dell"
    }, {
      "email": "mikeodell77@gmail.com"
    });


    SpreedlyExpress.onPaymentMethod(function(token, paymentMethod) {
      console.log("on payment method");
      console.log("What is the incoming token : ", token);
      console.log("What is the incoming payment method : ", paymentMethod);

      const url = "https://core.spreedly.com/v1/gateways/UNdlfrv8cVnLhV9c4SFRfgfgCwP/purchase.json";
      const body = {
        "transaction": {
          "payment_method_token": paymentMethod,
          "amount": 100,
          "currency_code": "USD",
          "retain_on_success": true
        }
      }
      const headers = {
        "Access-Control-Allow-Origin": "*"
      }

      fetch(url, {
        method: 'POST',
        body: body,
        headers: headers
      }).then(response => {
        console.log("Response : ", util.inspect(response));
      // (token => {
      //  alert('Thank you for subscribing!');
      }).catch(error => {
        console.log("Error : ", util.inspect(error));
      });
    });

    this.props.fetchMyDentist();
    this.props.fetchMyFamily();
  }



  goToMembersPage () {
    this.props.changeRoute('my-family-members');
  }

  openSpreadlyView () {
    SpreedlyExpress.openView();
  }

  render () {
    const { loggedInUser, myDentist, myFamilyMembers } = this.props;
    const fullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    const status = myDentist ? myDentist.subscriptions[0].status : '';
    // TODO: better here to use selector!
    let total = myDentist ? myDentist.subscriptions[0].monthly : 0;

    if (myDentist) {
      total = new Change({ dollars: loggedInUser.accountHolder ? total : 0 });
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

        <h3>Your Info</h3>

        <MyInfo user={loggedInUser} />

        <div styleName="h3-with-button" className="clearfix">
          <h3>Your Family Members</h3>
        </div>

        <FamilyMembers
          accountStatus={status}
          monthlyDue={total}
          dueDate="Dec 7, 2017"
          members={myFamilyMembers}
        />
        <div className="clearfix">
          <button
            className="btn btn-darkest-green btn-round"
            onClick={this.goToMembersPage}
          >
            Add | edit family members
          </button>

          <input type="submit" className="btn btn-darkest-green btn-round" value="Enter Payment Info" onClick={this.openSpreadlyView}/>

        </div>

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
