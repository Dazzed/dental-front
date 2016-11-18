/*
 *
 * PaymentForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ReactTooltip from 'react-tooltip';

import { requestPayBill } from './actions';
import { requestEnableSelector } from './selectors';
import styles from './style.css';

let payment;


SpreedlyExpress.onPaymentMethod((token, paymentMethod) => {
  if (payment) {
    payment(token, paymentMethod);
  }
});

/* eslint-disable */
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class PaymentForm extends React.Component {

  static propTypes = {
    total: React.PropTypes.string,
    user: React.PropTypes.object,
    status: React.PropTypes.string,
    requesting: React.PropTypes.bool,
    requestPayBill: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      checked: [ false, false, false ],
      allChecked: false,
    };
  }

  handleChange = (index) => {
    const checkList = this.state.checked;
    let allChecked = false;

    checkList[index] = !checkList[index];
    allChecked = checkList.filter((c) => !!c).length === checkList.length;

    this.setState({
      checked: checkList,
      allChecked,
    });
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
    const isPayed = this.props.status === 'active';
    const noAmount = parseFloat(this.props.total) === 0;
    const disabled = this.props.requesting
      || noAmount
      || this.props.status === 'active'
      || !this.state.allChecked;

    return (
      <div>
        <input
          type="submit"
          className="btn btn-darkest-green btn-round"
          value="Enter Payment Info"
          onClick={this.openSpreadlyView}
          disabled={disabled}
        />
        { noAmount &&
          <div styleName="checklist-container">
            <p>To proceed with payment, please add family members or join{' '}
            the membership yourself.</p>
          </div>
        }
        { !isPayed && !noAmount &&
          <div styleName="checklist-container">
            <p>To proceed with payment, please read and check the following.</p>
            <div>
              <label htmlFor="check-0">
                <input
                  type="checkbox"
                  name="check-0"
                  checked={this.state.checked[0]}
                  onChange={this.handleChange.bind(this, 0)}
                />
                I accept the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <div>
              <label htmlFor="check-1">
                <input
                  type="checkbox"
                  name="check-1"
                  checked={this.state.checked[1]}
                  onChange={this.handleChange.bind(this, 1)}
                />
                I acknowledge that
                <ul>
                  <li>
                    If membership is cancelled in under 3 months a $20 early cancellation fee will be charged.
                  </li>
                  <li>
                    If this account becomes inactive, a $99 re-enrollment fee will be applied to re-activate your account.
                  </li>
                </ul>
              </label>
            </div>
            <div>
              <label htmlFor="check-2">
                <input
                  type="checkbox"
                  name="check-2"
                  checked={this.state.checked[2]}
                  onChange={this.handleChange.bind(this, 2)}
                />
                If{' '}
                <span data-tip data-for="disease-definition" className="link">
                  Periodontal Disease
                </span>
                {' '}is present additional treatment and fees will be necessary prior to your basic cleaning.
              </label>
            </div>
          </div>
        }

        <ReactTooltip id="disease-definition" place="bottom" type="info" effect="solid" offset={{top: '-15px', right: '70px'}}>
          <p>
            Periodontal disease, also known as gum disease, can range from relatively-minor gum inflammation <br/>
            to much more serious forms of disease that can damage the soft tissue and bone that support the teeth.
          </p>
        </ReactTooltip>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    requesting: requestEnableSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    requestPayBill: (token, method, userId) =>
      dispatch(requestPayBill(token, method, userId)),
  };
}

export default PaymentForm;
