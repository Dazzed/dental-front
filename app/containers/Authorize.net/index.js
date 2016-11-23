import React from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import payform from 'payform';
import InputMask from 'react-input-mask';
import Card from 'react-credit-card';
import Loading from 'react-loading';
import ReactTooltip from 'react-tooltip';

import 'react-credit-card/source/card.css';
import 'react-credit-card/source/card-types.css';

import { connect } from 'react-redux';

import {
  canCheckoutSelector,
  isRequestingSelector,
  wasRequestedSelector,
  errorSelector,
  cardSelector,
  openSelector,
  userOpenedSelector,
} from './selectors';

import {
  requestCardInfo,
  requestCharge,
  clearData,
  openForm,
} from './actions';

import style from './styles.css';


function mapDispatchToProps (dispatch) {
  return {
    clearData: () => dispatch(clearData()),
    openForm: (userId) => dispatch(openForm(userId)),
    requestCardInfo: userId => dispatch(requestCardInfo(userId)),
    requestCharge: (userId, data) => dispatch(requestCharge(userId, data)),
  };
}


@connect(state => ({
  canCheckout: canCheckoutSelector(state),
  isRequesting: isRequestingSelector(state),
  wasRequested: wasRequestedSelector(state),
  open: openSelector(state),
  error: errorSelector(state),
  card: cardSelector(state),
  userOpened: userOpenedSelector(state),
}), mapDispatchToProps)
export default class Form extends React.Component {

  static propTypes = {
    status: React.PropTypes.string,
    canCheckout: React.PropTypes.bool,
    isRequesting: React.PropTypes.bool,
    wasRequested: React.PropTypes.bool,
    open: React.PropTypes.bool,
    error: React.PropTypes.string,
    userOpened: React.PropTypes.number,
    requestCardInfo: React.PropTypes.func.isRequired,
    requestCharge: React.PropTypes.func.isRequired,
    clearData: React.PropTypes.func.isRequired,
    openForm: React.PropTypes.func.isRequired,
    card: React.PropTypes.shape({}),
    user: React.PropTypes.shape({
      id: React.PropTypes.number,
      authorizeId: React.PropTypes.number,
    }),
  }

  constructor (props) {
    super(props);

    this.state = {
      checked: [ false, false, false ],
      allChecked: false,
      focused: null,
      editing: false,
      cardNumber: {
        value: '',
        mask: '9999-9999-9999-9999',
        display: '',
        error: false,
      },
      expiry: {
        value: '',
        display: '',
        mask: '99/99',
        error: false,
      },
      cvc: {
        value: '',
        display: '',
        mask: '999',
        error: false,
      },
      address: {
        value: '',
        display: '',
        error: false,
      },
      zip: {
        value: '',
        display: '',
        mask: '99999',
        error: false,
      },
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.card && !this.setCard) {
      const state = { ...this.state };
      state.cardNumber.value = nextProps.card.number;
      state.expiry.value = nextProps.card.expiry;
      state.zip.value = nextProps.card.zip;
      state.address.value = nextProps.card.address;
      state.cvc.value = nextProps.card.cvc;
      state.cardNumber.display = nextProps.card.number.replace(/[-_]/g, '');
      state.expiry.display = nextProps.card.expiry;
      state.cvc.display = nextProps.card.cvc;
      state.cardNumber.error = false;
      state.expiry.error = false;
      state.cvc.error = false;
      this.setState(state);
      this.setCard = true;
    }
  }

  handleOpen = () => {
    const state = { ...this.state };
    state.cardNumber.value = '';
    state.expiry.value = '';
    state.cvc.value = '';
    state.zip.value = '';
    state.address.value = '';

    state.cardNumber.display = '';
    state.expiry.display = '';
    state.cvc.display = '';

    state.cardNumber.error = false;
    state.expiry.error = false;
    state.cvc.error = false;
    state.zip.error = false;
    state.address.error = false;
    state.focused = null;

    this.setCard = false;
    this.setState(state);

    this.props.openForm(this.props.user.id);

    if (!this.props.wasRequested) {
      this.props.requestCardInfo(this.props.user.id);
    }
  }

  handleClick = () => {
    const toRequest =
      (this.state.cardNumber.value && !this.state.cardNumber.error) ||
      (this.state.cvc.value && !this.state.cvc.error) ||
      (this.state.zip.value && !this.state.zip.error) ||
      (this.state.address.value && !this.state.address.error) ||
      (this.state.expiry.value && !this.state.expiry.error);

    if (toRequest) {
      let data;

      if ((this.props.card && this.state.editing) ||
        (!this.props.card && this.props.wasRequested)) {
        // If not card and was requested we need to send card info to
        // create the card
        data = {
          number: this.state.cardNumber.value,
          cvc: this.state.cvc.value,
          expiry: this.state.expiry.value,
          address: this.state.address.value,
          zip: this.state.zip.value,
        };
      }

      this.props.requestCharge(this.props.user.id, data);
    }
  }

  handleHide = () => {
    this.props.clearData();
  }

  handleEdit = () => {
    const state = { ...this.state, editing: true };
    state.cardNumber.error =
      !payform.validateCardNumber(state.cardNumber.display);
    state.cvc.error = !payform.validateCardCVC(state.cvc.value);
    const parsed = payform.parseCardExpiry(state.expiry.value);
    state.expiry.error =
      !payform.validateCardExpiry(parsed.month, parsed.year);

    this.setState(state);
  }

  handleChange = (event) => {
    if (this.props.card && !this.state.editing) {
      return;
    }

    const name = event.target.name;
    const value = event.target.value;

    const state = { [name]: { ...this.state[name], value } };

    if (name === 'cardNumber') {
      state.focused = 'number';
      if (/^3[47]/.test(value)) {
        state.cardNumber.mask = '9999-999999-99999';
      } else {
        state.cardNumber.mask = '9999-9999-9999-9999';
      }
      state.cardNumber.display = value.replace(/[-_]/g, '');
      state.cardNumber.error =
        !payform.validateCardNumber(state.cardNumber.display);
    } else if (name === 'cvc') {
      state.focused = 'cvc';
      state.cvc.display = value;
      state.cvc.error = !payform.validateCardCVC(value);
    } else if (name === 'expiry') {
      state.focused = 'expiry';
      const parsed = payform.parseCardExpiry(value);
      state.expiry.display = value;
      state.expiry.error =
        !payform.validateCardExpiry(parsed.month, parsed.year);
    } else if (name === 'zip') {
      state.zip.error = !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value);
    }

    this.setState(state);
  }

  handleCheckbox = (index) => {
    const checkList = this.state.checked;
    let allChecked = false;

    checkList[index] = !checkList[index];
    allChecked = checkList.filter((c) => !!c).length === checkList.length;

    this.setState({
      checked: checkList,
      allChecked,
    });
  }

  handleFocus = (event) => {
    if (this.props.card && !this.state.editing) {
      return;
    }

    const name = event.target.name;
    let focused = null;

    if (name === 'cardNumber') {
      focused = 'number';
    } else if (name === 'cvc') {
      focused = 'cvc';
    } else if (name === 'expiry') {
      focused = 'expiry';
    }

    this.setState({ focused });
  }

  render () {
    const { isRequesting } = this.props;
    const isPayed = this.props.status === 'active';
    const noAmount = parseFloat(this.props.total) === 0;
    const state = this.state;
    const readOnly = this.props.card && !this.state.editing;
    const formatChars = { 9: '[0-9X]' };
    const open =
      this.props.open && this.props.userOpened === this.props.user.id;
    let canCheckout = this.props.canCheckout && !noAmount &&
      this.state.allChecked;

    // if was paid or over due enable button by default
    if (this.props.status !== 'inactive') {
      canCheckout = true;
    }

    const submitDisabled =
      !(state.cardNumber.value && !state.cardNumber.error) ||
      !(state.zip.value && !state.zip.error) ||
      !(state.address.value && !state.address.error) ||
      !(state.cvc.value && !state.cvc.error) ||
      !(state.expiry.value && !state.expiry.error);

    let checkoutButtonText = this.props.status === 'inactive' ?
      'Pay' : 'Update Card';

    if (this.props.wasRequested && !this.props.card) {
      checkoutButtonText = 'Save Card and Pay';
    } else if (this.props.card && this.state.editing) {
      checkoutButtonText = this.props.status === 'inactive' ?
        'Update Card and Pay' : 'Update Card';
    }

    return (
      <div className={style.root}>
        <input
          type="button"
          className="btn btn-darkest-green btn-round"
          value="Enter Payment Info"
          onClick={this.handleOpen}
          disabled={!canCheckout}
        />

        { !isPayed && !noAmount &&
          <div className={style['checklist-container']}>
            <p>To proceed with payment, please read and check the following.</p>
            <div>
              <label htmlFor="check-0">
                <input
                  type="checkbox"
                  name="check-0"
                  checked={this.state.checked[0]}
                  onChange={this.handleCheckbox.bind(this, 0)}
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
                  onChange={this.handleCheckbox.bind(this, 1)}
                />
                I acknowledge that
                <ul>
                  <li>
                    If membership is cancelled in under 3 months a $20 early
                    cancellation fee will be charged.
                  </li>
                  <li>
                    If this account becomes inactive, a $99 re-enrollment fee
                    will be applied to re-activate your account.
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
                  onChange={this.handleCheckbox.bind(this, 2)}
                />
                If{' '}
                <a
                  href="https://www.perio.org/consumer/types-gum-disease.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tip
                  data-for="disease-definition"
                >
                  Periodontal Disease
                </a>
                {' '}is present additional treatment and fees will be
                necessary prior to your basic cleaning.
              </label>
            </div>
          </div>
        }

        <ReactTooltip
          id="disease-definition"
          place="bottom"
          type="info"
          effect="solid"
          offset={{ top: '-15px', right: '70px' }}
        >
          <p>
            Periodontal disease or Gum disease is an infection of the tissues
            that surround and support your teeth. <br /> It is present in
            roughly 10 percent of adults. It is a major cause of tooth loss in
            adults. <br /> Because gum disease is usually painless, you may
            not know you have it.
          </p>
        </ReactTooltip>

        <Modal show={open} onHide={this.handleHide}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your card Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isRequesting ?
              <Loading type="spin" /> :
              <div>
                <Card
                  name={'Working'}
                  expiry={state.expiry.display}
                  number={state.cardNumber.display}
                  cvc={state.cvc.display}
                  focused={state.focused}
                />

                <br />

                {readOnly &&
                  <Row>
                    <Col>
                      <Button
                        bsStyle="link"
                        onClick={this.handleEdit}
                      >
                        Edit
                      </Button>
                    </Col>
                  </Row>}

                <form>
                  <FormGroup
                    validationState={state.cardNumber.error ? 'error' : null}
                  >
                    <ControlLabel>Card Number</ControlLabel>
                    <InputMask
                      className="form-control"
                      type="tel"
                      name="cardNumber"
                      onChange={this.handleChange}
                      value={state.cardNumber.value}
                      mask={state.cardNumber.mask}
                      onFocus={this.handleFocus}
                      readOnly={readOnly}
                      formatChars={formatChars}
                    />
                  </FormGroup>
                  <Row>
                    <Col md={6}>
                      <FormGroup
                        validationState={state.expiry.error ? 'error' : null}
                      >
                        <ControlLabel>Expiration Date</ControlLabel>
                        <InputMask
                          className="form-control"
                          placeholder="mm/yyyy"
                          size="7"
                          type="tel"
                          name="expiry"
                          onChange={this.handleChange}
                          value={state.expiry.value}
                          mask={state.expiry.mask}
                          readOnly={readOnly}
                          formatChars={formatChars}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup
                        validationState={state.cvc.error ? 'error' : null}
                      >
                        <ControlLabel>CVC</ControlLabel>
                        <InputMask
                          className="form-control"
                          size="3"
                          type="tel"
                          name="cvc"
                          onChange={this.handleChange}
                          value={state.cvc.value}
                          mask={state.cvc.mask}
                          readOnly={readOnly}
                          formatChars={formatChars}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup
                        validationState={state.address.error ? 'error' : null}
                      >
                        <ControlLabel>Address</ControlLabel>
                        <input
                          className="form-control"
                          type="text"
                          name="address"
                          onChange={this.handleChange}
                          value={state.address.value}
                          mask={state.address.mask}
                          readOnly={readOnly}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup
                        validationState={state.zip.error ? 'error' : null}
                      >
                        <ControlLabel>Zip Code</ControlLabel>
                        <InputMask
                          className="form-control"
                          type="tel"
                          name="zip"
                          onChange={this.handleChange}
                          value={state.zip.value}
                          mask={state.zip.mask}
                          readOnly={readOnly}
                          formatChars={formatChars}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </div>}
              {this.props.error &&
                <Alert bsStyle="danger">
                  <p>{this.props.error}</p>
                </Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
            <Button
              onClick={this.handleClick}
              bsStyle="primary"
              disabled={submitDisabled}
            >{checkoutButtonText}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

