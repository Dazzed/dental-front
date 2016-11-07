/*
 *
 * PaymentForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { requestPayBill } from './actions';
import { requestEnableSelector } from './selectors';

let payment;


SpreedlyExpress.onPaymentMethod((token, paymentMethod) => {
  if (payment) {
    payment(token, paymentMethod);
  }
});


class PaymentForm extends React.Component {

  static propTypes = {
    total: React.PropTypes.number,
    user: React.PropTypes.object,
    status: React.PropTypes.string,
    requesting: React.PropTypes.bool,
    requestPayBill: React.PropTypes.func.isRequired,
  }

  openSpreadlyView = () => {
    SpreedlyExpress.init('MY4WccjEpI34lIikNK7qDAXpRVQ', {
      amount: `$${this.props.total}`,
      company_name: 'Wells Familly Dentistry',
      sidebar_top_description: 'Find your dentist',
      sidebar_bottom_description: 'This is the ammount of your package',
      full_name: `${this.props.user.firstName} ${this.props.user.lastName}`,
    }, {
      email: '${this.props.user.email}',
    });

    payment = (token, method) => {
      this.props.requestPayBill(token, method, this.props.user.id);
    };

    SpreedlyExpress.openView();
  }

  render () {
    const disabled = this.props.requesting || this.props.status === 'active';

    return (
      <input
        type="submit"
        className="btn btn-darkest-green btn-round"
        value="Enter Payment Info"
        onClick={this.openSpreadlyView}
        disabled={disabled}
      />
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    requestPayBill: (token, method, userId) =>
      dispatch(requestPayBill(token, method, userId)),
  };
}

export default connect(state => ({
  requesting: requestEnableSelector(state),
}), mapDispatchToProps)(PaymentForm);
