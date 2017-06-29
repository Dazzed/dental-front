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
import { connect } from 'react-redux';
import { Field, reduxForm, submit as submitForm } from 'redux-form';

// app
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
                name="number"
                type="text"
                component={this.getLabeledInput}
                label="Card Number"
                mask="9999 9999 9999 9999"
                id="card_number"
                maskChar=" "
                placeholder=""
                className="col-sm-8"
              />

              <Field
                name="cvc"
                type="text"
                component={this.getLabeledInput}
                label="CVV2"
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

            <FormGroup>
              <div className="col-sm-12">
                <Field
                  name="periodontalDiseaseWaiver"
                  component={this.getCheckbox}
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
                    <span styleName="info-trigger">(?)</span>
                  </OverlayTrigger>
                  {' '}
                  is present additional treatment may be necessary prior to my cleaning.
                </Field>
              </div>

              <div className="col-sm-12">
                <Field
                  name="feeWaiver"
                  component={this.getCheckbox}
                >
                  I understand that a $20 cancellation fee will be charged if I cancel a recurring monthly membership in the first 3 months, and that a $99 re-enrollment fee will be charged anytime a canceled member is re-enrolled.
                </Field>
              </div>

              <div className="col-sm-12">
                <Field
                  name="termsAndConditions"
                  component={this.getCheckbox}
                >
                  I agree with the <a href="/terms" target="_blank">Terms and Conditions</a>.
                </Field>
              </div>
            </FormGroup>

          </form>
        </Modal.Body>

        {/*
        Modal Footer
        ------------------------------------------------------------
        */}
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
      </Modal>
    );
  }
}
