/*
Checkout Form Modal Component
================================================================================
TODO: optionally show patients list- perhaps pass it in as a prop, or a child?
*/

/*
Import
------------------------------------------------------------
*/
// libs
import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import FaAmex from 'react-icons/lib/fa/cc-amex';
import FaDiscover from 'react-icons/lib/fa/cc-discover';
import FaMastercard from 'react-icons/lib/fa/cc-mastercard';
import FaVisa from 'react-icons/lib/fa/cc-visa';
import { connect } from 'react-redux';
import { Field, reduxForm, submit as submitForm } from 'redux-form';

// app
import cvcVisa from 'assets/images/cvc-visa.png';
import cvcAmex from 'assets/images/cvc-amex.png';

import {
  US_STATES,
} from 'common/constants';
import Checkbox from 'components/Checkbox';
import LabeledInput from 'components/LabeledInput';
import MembersList from 'components/MembersList';

// local
import styles from './styles.css';
import CheckoutFormValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch(submitForm('checkout')),
});

const periodontalDiseaseWaiverValidator = (value) => {
  return value !== undefined
    ? undefined // all good
    : 'You must agree to all waivers in order to create an account.';
};

const feeWaiverValidator = (value) => {
  return value !== undefined
    ? undefined // all good
    : 'You must agree to all waivers in order to create an account.';
};

const termsAndConditionsValidator = (value) => {
  return value !== undefined
    ? undefined // all good
    : 'You must agree to the Terms and Conditions in order to create an account.';
};

/*
Checkout Form Modal
================================================================================
*/
@connect(null, mapDispatchToProps)
@reduxForm({
  form: 'checkout',
  enableReinitialize: true,
  validate: CheckoutFormValidator,
})
@CSSModules(styles)
export default class CheckoutFormModal extends React.Component {

  
  componentWillMount() {
    this.state = {
      card_type: null
    };
  }
  

  static propTypes = {
    // settings - passed in
    listMembers: React.PropTypes.bool,
    user: React.PropTypes.object,

    // form related - passed in
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // modal related - passed in
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    showWaiverCheckboxes: React.PropTypes.bool,
  };

  getCheckbox(props) {
    return new Checkbox(props);
  }

  getInput(props) {
    return new Input(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // settings
      listMembers,
      user,

      // form related
      initialValues,
      handleSubmit,
      submit,
      submitting,
      dentist,

      // modal related
      show,
      stripe,
      onCancel,
      showWaiverCheckboxes,
    } = this.props;

    const infoPopover = (
      <Popover
        className="popover--large"
        id="periodontal-disease-info-popover"
        placement="bottom"
        title="What is Periodontal Disease?"
      >
        Periodontal Disease is the inflammation and/or infection of the tissues around your teeth. Roughly 5-10% of the population requires additional treatment for this prior to their basic cleaning included with your membership.
      </Popover>
    );

    const cvcPopover = (
      <Popover
        className="popover--large"
        id="cvc-popover"
        placement="bottom"
      >
        {this.state.card_type !== "American Express"
          ? ( <div>
                <p>
                  The card security code is located on the back of MasterCard, Visa, and Discover cards and is typically a separate group of three digits to the right of the signature strip.
                </p>

                <p className="text-center">
                  <img src={cvcVisa} alt="CVC Example: Visa" />
                </p>

                <p>
                  Content by <a href="https://en.wikipedia.org/wiki/User:Airodyssey" class="extiw" title="en:User:Airodyssey">Airodyssey</a> at the <a href="https://en.wikipedia.org/wiki/" class="extiw" title="w:">English language Wikipedia</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=5002422">Link</a>
                </p>
              </div>
            )
          : ( <div>
                <p>
                  On American Express cards, the card security code is a printed, not embossed, group of four digits on the front towards the right.
                </p>

                <p className="text-center">
                  <img src={cvcAmex} alt="CVC Example: American Express" />
                </p>

                <p>
                  Content by <a href="https://en.wikipedia.org/wiki/User:Airodyssey" class="extiw" title="en:User:Airodyssey">Airodyssey</a> at the <a href="https://en.wikipedia.org/wiki/" class="extiw" title="w:">English language Wikipedia</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=1075661">Link</a>
                </p>
              </div>
            )
        }
      </Popover>
    );

    const cvcPopoverTrigger = (
      <span>
        <OverlayTrigger
          overlay={cvcPopover}
          placement="bottom"
          rootClose
          trigger={['click', 'focus', 'hover']}
        >
          <span className={styles['popover-trigger']}>(?) </span>
        </OverlayTrigger>

        CVC
      </span>
    );

    let maskChar;
    if (this.state.card_type === "VISA") {
      maskChar = "9999 9999 9999 9999";
    }
    else if (this.state.card_type === "Mastercard") {
      maskChar = "9999999999999999";
    } else if (this.state.card_type === "American Express") {
      maskChar = "999999999999999";
    } else if (this.state.card_type === "Discover") {
      maskChar = "9999 9999 9999 9999";
    }
    
    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        onHide={onCancel}
        show={show}
      >
        {/*
        Modal Header
        ------------------------------------------------------------
        */}
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          {listMembers && user && (
            <div>
              <h5 styleName="modal-section-title">Members:</h5>

              <MembersList
                dentist={dentist}
                patient={user}
                canRemove={false}
              />

              <hr styleName="spacer--members-list" />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="form-horizontal"
            id="payment-form"
          >
            {listMembers && user && (
              <h5 styleName="modal-section-title">Enter Payment Information:</h5>
            )}

            <div id="card-element"></div>
            <Row>
              <Field
                name="card_type"
                type="select"
                component={this.getLabeledInput}
                label="Card Type"
                className="col-sm-4"
                onChange={(evt) => {this.props.reset();this.setState({card_type: evt.target.value})}}
              >
                <option value="">Select Card Type</option>
                {
                  ["VISA","Mastercard","American Express", "Discover"].map((type,i) => {
                    return <option key={i} value={type}>{type}</option>
                  })
                }
              </Field>
              <div className="col-sm-offset-2 col-sm-6" styleName="accepted-cards">
                <span styleName="accepted-cards__title">We accept:</span>
                <p styleName="accepted-cards__cards">
                  <FaVisa />
                  <FaMastercard />
                  <FaAmex />
                  <FaDiscover />
                </p>
              </div>
            </Row>
            { this.state.card_type &&
              <div className="sub-payment-details-container">
                <Row>
                  <Field
                    name="number"
                    type="text"
                    component={this.getLabeledInput}
                    label="Card Number"
                    id="card_number"
                    mask={maskChar}
                    placeholder=""
                    className="col-sm-8"
                  />
                
                  <Field
                    name="cvc"
                    type="text"
                    component={this.getLabeledInput}
                    label={cvcPopoverTrigger}
                    placeholder=""
                    className="col-sm-4"
                  />
                </Row>

                <Row>
                  <Field
                    name="fullName"
                    type="text"
                    component={this.getLabeledInput}
                    label="Name On Card"
                    placeholder=""
                    className="col-sm-8"
                  />

                  <Field
                    name="expiry"
                    type="text"
                    mask="99/99"
                    maskChar=" "
                    component={this.getLabeledInput}
                    label="Expiration Month / Year"
                    placeholder="MM/YY"
                    className="col-sm-4"
                  />
                </Row>

                <hr styleName="spacer" />

                <Row>
                  <Field
                    name="address"
                    type="text"
                    component={this.getLabeledInput}
                    label="Billing Address"
                    placeholder=""
                    className="col-sm-12"
                  />
                </Row>

                <Row>
                  <Field
                    name="city"
                    type="text"
                    component={this.getLabeledInput}
                    label="City"
                    placeholder=""
                    className="col-sm-4"
                  />

                  <Field
                    name="state"
                    type="select"
                    component={this.getLabeledInput}
                    label="State"
                    className="col-sm-4"
                  >
                    <option value="">Select state</option>
                    {US_STATES &&
                      Object.keys(US_STATES).map(key => (
                        <option value={key} key={key}>
                          {US_STATES[key]}
                        </option>
                      ))
                    }
                  </Field>

                  <Field
                    name="zip"
                    type="text"
                    mask="99999"
                    maskChar=" "
                    component={this.getLabeledInput}
                    label="Zip Code"
                    placeholder=""
                    className="col-sm-4"
                  />
                </Row>

                <hr styleName="spacer" />

                {showWaiverCheckboxes && (
                <FormGroup>
                  <div className="col-sm-12">
                    <Field
                      name="periodontalDiseaseWaiver"
                      component={this.getCheckbox}
                      validate={[periodontalDiseaseWaiverValidator]}
                    >
                      I understand that if
                      {' '}
                      <strong>Periodontal Disease</strong>
                      {' '}
                      <OverlayTrigger
                        overlay={infoPopover}
                        placement="bottom"
                        rootClose
                        trigger={['click', 'focus', 'hover']}
                      >
                        <span styleName="popover-trigger">(?)</span>
                      </OverlayTrigger>
                      {' '}
                      is present additional treatment may be necessary prior to my cleaning.
                    </Field>
                  </div>

                  <div className="col-sm-12">
                    <Field
                      name="feeWaiver"
                      component={this.getCheckbox}
                      validate={[feeWaiverValidator]}
                    >
                      I understand that a $20 cancellation fee will be charged if I cancel a recurring monthly membership in the first 3 months, and that a $99 re-enrollment fee will be charged anytime a canceled member is re-enrolled.
                    </Field>
                  </div>

                  <div className="col-sm-12">
                    <Field
                      name="termsAndConditions"
                      component={this.getCheckbox}
                      validate={[termsAndConditionsValidator]}
                    >
                      I agree with the <a href="/terms" target="_blank">Terms and Conditions</a>.
                    </Field>
                  </div>
                </FormGroup>
              )}
              </div>
            }
          </form>
        </Modal.Body>

        {/*
        Modal Footer
        ------------------------------------------------------------
        */}
        { this.state.card_type &&
          <Modal.Footer>
            <div className="modal-controls">
              <input
                type="button"
                className="modal-control"
                disabled={submitting}
                onClick={submit}
                value="SUBMIT"
              />
            </div>
          </Modal.Footer>
        }
      </Modal>
    );
  }
}
