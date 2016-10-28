/**
 * SubscribePage
 */

import React from 'react';

import { connect } from 'react-redux';
// import { Row, Col } from 'react-bootstrap';
// import SubscribeFormDental15 from 'components/SubscribeFormDental15';
// import SubscribeFormDental20 from 'components/SubscribeFormDental20';
import StripeCheckout from 'react-stripe-checkout';

import { selectCurrentUser } from 'containers/App/selectors';
import { billSelector } from './selectors';
import { requestBill, requestPayBill } from './actions';
import moment from 'moment';


@connect(state => ({
  bill: billSelector(state),
  loggedInUser: selectCurrentUser(state),
}), { requestBill, requestPayBill })
class SubscribePage extends React.Component {

  static propTypes = {
    requestBill: React.PropTypes.func.isRequired,
    requestPayBill: React.PropTypes.func.isRequired,
    loggedInUser: React.PropTypes.object,
    bill: React.PropTypes.object,
  }

  componentWillMount () {
    this.props.requestBill();
  }

  render () {
    const { bill, loggedInUser } = this.props;

    if (bill.status === 'active') {
      return (
        <div>
          You paid your subscription and next payment will
          be at: <strong>{moment(bill.endAt).format('LL')}</strong>
        </div>
      );
    } else if (!bill.total && !loggedInUser.accountHolder) {
      return (
        <div>
          You have to add member families to create a subscription.
        </div>
      );
    }

    return (
      <div className="wrapper">
        <div className="container" >
          <StripeCheckout
            stripeKey="pk_test_71G4lapBvaU5MFU7Xq79iHRP"
            name="My dental marketplace"
            description="Subscription"
            ComponentClass="div"
            panelLabel="Give Money"
            amount={bill.total}
            currency="USD"
            email={loggedInUser.email}
            token={this.props.requestPayBill}
          >
            <button className="btn btn-primary">
              Subscribe
            </button>
          </StripeCheckout>
        </div>
      </div>
    );
  }
}

export default SubscribePage;
