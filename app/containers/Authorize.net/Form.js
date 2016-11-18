import React from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import payform from 'payform';
import InputMask from 'react-input-mask';

import { connect } from 'react-redux';

import { requestEnableSelector, tokenSelector } from './selectors';
import { requestToken } from './actions';
import style from './styles.css';


function mapDispatchToProps (dispatch) {
  return {
    requestToken: (userId, payload) => dispatch(requestToken(userId, payload)),
  };
}


@connect(state => ({
  requesting: requestEnableSelector(state),
  token: tokenSelector(state),
}), mapDispatchToProps)
export default class Form extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    requestToken: React.PropTypes.func.isRequired,
    status: React.PropTypes.string,
    token: React.PropTypes.string,
    requesting: React.PropTypes.bool,
    user: React.PropTypes.shape({
      id: React.PropTypes.number,
      authorizeId: React.PropTypes.number,
    }),
  }

  constructor (props) {
    super(props);

    this.state = {
      open: false,
      cardNumber: {
        value: '',
        mask: '9999-9999-9999-9999',
        type: '',
        error: null,
      },
      expiry: {
        value: '',
        mask: '99/99',
        error: null,
      },
    };
  }

  handleClick = () => {
    const toRequest =
      (this.state.cardNumber.value && !this.state.cardNumber.error) ||
      (this.state.expiry.value && !this.state.expiry.error);

    if (this.props.user.authorizeId || toRequest) {
      return this.props.requestToken(this.props.user.id, {
        cardNumber: this.state.cardNumber.value,
        expiry: this.state.expiry.value,
      });
    }

    return this.setState({ open: true });
  }

  handleHide = () => {
    this.setState({ open: false });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const state = { [name]: { ...this.state[name], value } };

    if (name === 'cardNumber') {
      if (/^3[47]/.test(value)) {
        state.cardNumber.mask = '9999-999999-99999';
      } else {
        state.cardNumber.mask = '9999-9999-9999-9999';
      }
      state.cardNumber.type = payform.parseCardType(value);
      state.cardNumber.error =
        !payform.validateCardNumber(value.replace(/[-_]/g, ''));
    } else {
      const parsed = payform.parseCardExpiry(value);
      state.expiry.error =
        !payform.validateCardExpiry(parsed.month, parsed.year);
    }

    this.setState(state);
  }

  render () {
    const { token } = this.props;
    const disabled = this.props.requesting || this.props.status === 'active';
    const submitDisabled =
      !(this.state.cardNumber.value && !this.state.cardNumber.error) ||
      !(this.state.expiry.value && !this.state.expiry.error);

    // NOTE: hack to submit form after render
    if (token) {
      setTimeout(() => this.form.submit(), 500);
    }

    return (
      <div className={style.root}>
        <input
          type="button"
          className="btn btn-darkest-green btn-round"
          value="Enter Payment Info"
          onClick={this.handleClick}
          disabled={disabled}
        />

        <Modal show={this.state.open} onHide={this.handleHide}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your card Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                validationState={this.state.cardNumber.error ? 'error' : null}
              >
                <ControlLabel>Card Number</ControlLabel>
                <InputMask
                  className="form-control"
                  type="tel"
                  name="cardNumber"
                  onChange={this.handleChange}
                  value={this.state.cardNumber.value}
                  mask={this.state.cardNumber.mask}
                />

                <span className="help-block">
                  Card Type: {this.state.cardNumber.type}
                </span>
              </FormGroup>
              <FormGroup
                validationState={this.state.expiry.error ? 'error' : null}
              >
                <ControlLabel>Expiration Date</ControlLabel>
                <InputMask
                  className="form-control"
                  placeholder="mm/yyyy"
                  size="7"
                  type="tel"
                  name="expiry"
                  onChange={this.handleChange}
                  value={this.state.expiry.value}
                  mask={this.state.expiry.mask}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
            <Button
              onClick={this.handleClick}
              bsStyle="primary"
              disabled={submitDisabled}
            >Pay</Button>
          </Modal.Footer>
        </Modal>

        <form
          ref={form => { this.form = form; }}
          method="post"
          action="https://test.authorize.net/profile/manage"
        >
          <input
            type="hidden"
            name="token"
            value={token}
            readOnly
          />
        </form>
      </div>
    );
  }

}
