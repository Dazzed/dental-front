/*
Member Form Modal Component
================================================================================
TODO: add a membership type field
*/

/*
Import
------------------------------------------------------------
*/
// libs
import moment from 'moment';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import FaClose from 'react-icons/lib/fa/close';
import { Field, reduxForm, } from 'redux-form';

// app
import {
  SEX_TYPES,
  PREFERRED_CONTACT_METHODS,
  MEMBER_RELATIONSHIP_TYPES,
} from 'common/constants';
import renderDatePicker from 'components/DatePicker';
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import MemberValidator from './validator';


/*
Member Form Modal
================================================================================
*/
@reduxForm({
  form: 'familyMember',
  enableReinitialize: true,
  validate: MemberValidator,
})
@CSSModules(styles, { allowMultiple: true })
export default class MemberFormModal extends React.Component {

  static propTypes = {
    // passed in data
    dentistInfo: React.PropTypes.object.isRequired,

    // form related
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // modal related
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      childWarning: false,
    }
  }

  handleFormSubmit = (values) => {
    const {
      acceptsChildren,
      childStartingAge,
    } = this.props.dentistInfo;

    const {
      childWarning,
    } = this.state;

    const {
      birthDate,
      firstName,
      lastName,
    } = values;

    const age = moment().diff(moment(birthDate, "MM/DD/YYYY"), 'years');

    if (acceptsChildren === false
      && childWarning === false
    ) {
      this.setChildWarning(`Your dentist does not usually accept children as patients.  Would you still like to add ${firstName} ${lastName} (age ${age}) as a member of your plan?`);
    }

    else if (
      age < childStartingAge
      && childWarning === false
    ) {
      this.setChildWarning(`${firstName} ${lastName} is age ${age}, but your dentist usually only accepts children that are age ${childStartingAge} or older.  Would you still like to add them as a member of your plan?`);
    }

    else {
      this.props.onFormSubmit(values);

      if (childWarning !== false) {
        this.clearChildWarning();
      }
    }
  }

  getDatePicker(props) {
    return new renderDatePicker(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  setChildWarning = (msg) => {
    this.setState({
      ...this.state,
      childWarning: msg,
    });
  }

  clearChildWarning = () => {
    this.setState({
      ...this.state,
      childWarning: false,
    });
  }

  processPrice(price, discount) {
    return discount ? (Number(price) * (1 - (Number(discount) / 100))).toFixed(2) : price;
  }

  renderMembershipType = () => {
    const { dentistInfo: { childMembership, membership, acceptsChildren } } = this.props;
    let membershipTypes = [];
    let price = 0;
    if (acceptsChildren) {
      price = this.processPrice(childMembership.monthly, childMembership.discount);
      membershipTypes.push({
        price,
        name: `Child Monthly Recurring — $${price}`
      });

      price = this.processPrice(childMembership.yearly, childMembership.discount);
      membershipTypes.push({
        price,
        name: `Child Yearly Nonrecurring — $${price}`
      });
    }

    price = this.processPrice(membership.monthly, membership.discount);
    membershipTypes.push({
      price,
      name: `Adult Monthly Recurring — $${price}`
    });

    price = this.processPrice(membership.yearly, membership.discount);
    membershipTypes.push({
      price,
      name: `Adult Yearly Nonrecurring — $${price}`
    });

    return (<Field
      name="membershipType"
      type="select"
      component={this.getLabeledInput}
      label="Membership Type"
      className="col-md-6"
    >
      <option>Membership Type</option>
      {membershipTypes.map((value, index) =>
        <option value={JSON.stringify(value)} key={index} label={value.name}>
          {value.name}
        </option>
      )}
    </Field>);
  };

  render() {
    const {
      // form related
      initialValues,
      handleSubmit,
      submitting,

      // modal related
      show,
      onCancel,
    } = this.props;

    const {
      childWarning,
    } = this.state;

    let title = "Edit Member";
    let saveText = "Save Member";
    if (initialValues === null || initialValues.id === undefined) {
      title = "Add Member";
      saveText = "Save and Checkout";
    } else if (initialValues.isEnrolling || initialValues.fromDentist) {
      title = 'Edit Membership'
      saveText = 'Update';
    }

    const childWarningPopover = childWarning === false
      ? null
      : (<Popover
        className="popover--large"
        id="child-warning-popover"
        placement="bottom"
        positionLeft={-84}
        positionTop={40}
        title="Are you sure?"
      >
        <p>{childWarning}</p>
        <div styleName="popover__controls">
          <span
            styleName="popover__control popover__control--close"
            onClick={this.clearChildWarning}
          >
            <FaClose />
          </span>

          <input
            type="button"
            styleName="popover__control button--short"
            disabled={submitting}
            onClick={handleSubmit(this.handleFormSubmit)}
            value="Yes"
          />
        </div>
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
          <Modal.Title>{title}</Modal.Title>

          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={submitting || childWarning !== false}
              onClick={handleSubmit(this.handleFormSubmit)}
              value={saveText}
            />
            {childWarningPopover}
          </div>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          <form className="form-horizontal">
            {initialValues && (initialValues.isEnrolling || initialValues.fromDentist) ?
              (<Row>
                {this.renderMembershipType()}
              </Row>) :
              (<div>
                <Row>
                  <Field
                    name="firstName"
                    type="text"
                    component={this.getLabeledInput}
                    label="First Name"
                    className="col-md-6"
                  />

                  <Field
                    name="lastName"
                    type="text"
                    component={this.getLabeledInput}
                    label="Last Name"
                    className="col-md-6"
                  />
                </Row>

                <Row>
                  <Field
                    name="sex"
                    type="select"
                    label="Sex"
                    component={this.getLabeledInput}
                    className="col-md-6"
                  >
                    <option value="">Select sex</option>
                    {Object.keys(SEX_TYPES).map(key =>
                      <option value={key} key={key}>
                        {SEX_TYPES[key]}
                      </option>
                    )}
                  </Field>

                  <Field
                    name="birthDate"
                    type="date"
                    component={this.getDatePicker}
                    label="Birthdate"
                    className="col-md-6"
                  />
                </Row>

                <Row>
                  <Field
                    name="familyRelationship"
                    type="select"
                    component={this.getLabeledInput}
                    label="Family Relationship"
                    className="col-md-6"
                  >
                    <option value="">Select a relationship type</option>
                    {Object.keys(MEMBER_RELATIONSHIP_TYPES).map((key, index) =>
                      <option value={key} key={index}>
                        {MEMBER_RELATIONSHIP_TYPES[key]}
                      </option>
                    )}
                  </Field>

                  {this.renderMembershipType()}
                </Row>
              </div>)}
          </form>
        </Modal.Body>

      </Modal>
    );
  }
}
