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
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm, submit as submitForm } from 'redux-form';

// app
import { // TODO: use these instead of freeform input, but also use some for years?
  MONTHS,
  MONTH_NUMBERS,
} from 'common/constants';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import LabeledInput from 'components/LabeledInput';

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
    // form related - passed in
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // modal related - passed in
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // form related
      initialValues,
      handleSubmit,
      submit,
      submitting,

      // modal related
      show,
      onCancel,
    } = this.props;

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
          <form
            onSubmit={handleSubmit}
            className="form-horizontal"
          >
            <Row>
              <Field
                name="cardNumber"
                type="text"
                component={LabeledInput}
                label="Card Number"
                placeholder=""
                className="col-sm-6"
              />

              <Field
                name="fullName"
                type="text"
                component={LabeledInput}
                label="Name On Card"
                placeholder=""
                className="col-sm-6"
              />
            </Row>

            <Row>
              <Field
                name="month"
                type="text"
                component={LabeledInput}
                label="Expiration Month"
                placeholder="06"
                className="col-sm-3"
              />

              <Field
                name="year"
                type="text"
                component={LabeledInput}
                label="Expiration Year"
                placeholder="20"
                className="col-sm-3"
              />

              <Field
                name="cardCode"
                type="text"
                component={LabeledInput}
                label="CVV2"
                placeholder=""
                className="col-sm-3"
              />

              <Field
                name="zip"
                type="text"
                component={LabeledInput}
                label="Card Zip Code"
                placeholder=""
                className="col-sm-3"
              />
            </Row>

            <FormGroup>
              <div className="col-sm-12">
                <Field
                  name="periodontalDiseaseWaiver"
                  component={Checkbox}
                >
                  I understand that if
                  {' '}
                  <strong>Periodontal Disease</strong>
                  {' '}
                  {/*
                    TODO: Add in the (?) after "Periodontal Disease" w/ a link to somewhere...
                          https://trello.com/c/OCFprpSC/132-patient-edit-payment-info
                  */}
                  {/*
                  <a href="" target="_blank">(?)</a>
                  {' '}
                  */}
                  is present additional treatment may be necessary prior to my cleaning.
                </Field>
              </div>

              <div className="col-sm-12">
                <Field
                  name="cancellationFeeWaiver"
                  component={Checkbox}
                >
                  I understand that if I cancel my recurring monthly membership in less that 3 payments that a $20 cancellation fee will be charged.
                </Field>
              </div>

              <div className="col-sm-12">
                <Field
                  name="reEnrollmentFeeWaiver"
                  component={Checkbox}
                >
                  I understand that if I cancel my recurring monthly membership, a re-enrollment fee will be charged if I choose to re-enter the membership.
                </Field>
              </div>

              <div className="col-sm-12">
                <Field
                  name="termsAndConditions"
                  component={Checkbox}
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
              value="CHECKOUT"
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
