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
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
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
@CSSModules(styles)
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

  constructor (props) {
    super(props);

    this.state = {
      childWarning: false,
    }
  }

  handleFormSubmit = (values) => {
    console.log("MemberFormModal.handleFormSubmit");
    console.log("-----");
    console.log(this.props.dentistInfo);
    console.log(this.props.dentistInfo.acceptsChildren);
    console.log(this.props.dentistInfo.childStartingAge);
    console.log("-----");
    console.log(this.state);
    console.log(this.state.childWarning);
    console.log("-----");
    console.log(values);
    console.log(values.birthDate);
    console.log(values.firstName);
    console.log(values.lastName);
    console.log("-----");

    // TODO: also call this after the submit confirm button is pressed
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

    console.log(age);

    /*
    if ( acceptsChildren === false
      && childWarning === false
    ) {
      console.log("  - Option 1: Doesn't accept children.");

      this.setChildWarning(`Your dentist does not usually accept children as patients.  Would you still like to add ${firstName} ${lastName} (age ${age}) as a member of your plan?`);
    }

    else if (
         age < childStartingAge
      && childWarning === false
    ) {
      console.log("  - Option 2: Child member too young.");

      this.setChildWarning(`${firstName} ${lastName} is age ${age}, but your dentist usually only accepts children that are age ${childStartingAge} or older.  Would you still like to add them as a member of your plan?`);
    }

    else {
      console.log("  - Option 3: Submit!");

      this.props.onFormSubmit(values);

      if (childWarning !== false) {
        this.clearChildWarning();
      }
    }
    */

    console.log("========================================");
  }

  setChildWarning = (msg) => {
    console.log("  - set child warning");

    this.setState({
      ...this.state,
      childWarning: msg,
    });
  }

  clearChildWarning = () => {
    console.log("  - clear child warning");

    this.setState({
      ...this.state,
      childWarning: false,
    });
  }

  render () {
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
    }

    let childWarningPopover = null;
    let submitButton = (
      <input
        type="button"
        className="modal-control"
        disabled={submitting}
        onClick={handleSubmit(this.handleFormSubmit)}
        value={saveText}
      />
    );
    if (childWarning !== false) {
      childWarningPopover = (
        <Popover id="child-warning-popover" title="Are you sure?">
          <p>{childWarning}</p>

          <div className="text-center">
            <span
              onClick={this.clearChildWarning}
            >X</span>

            <input
              type="button"
              className={styles["button--short--lowlight"]}
              disabled={submitting}
              onClick={handleSubmit(this.handleFormSubmit)}
              value="Yes"
            />
          </div>
        </Popover>
      );

      submitButton = (
        <OverlayTrigger trigger="click" placement="bottom" overlay={childWarningPopover}>
          <input
            type="button"
            className="modal-control"
            disabled={true}
            value={saveText}
          />
        </OverlayTrigger>
      );
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
          <Modal.Title>{title}</Modal.Title>

          <div className="modal-controls">
            {submitButton}
          </div>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          <form className="form-horizontal">
            <Row>
              <Field
                name="firstName"
                type="text"
                component={LabeledInput}
                label="First Name"
                className="col-md-6"
              />

              <Field
                name="lastName"
                type="text"
                component={LabeledInput}
                label="Last Name"
                className="col-md-6"
              />
            </Row>

            <Row>
              <Field
                name="sex"
                type="select"
                label="Sex"
                component={LabeledInput}
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
                component={renderDatePicker}
                label="Birthdate"
                className="col-md-6"
              />
            </Row>

            <Row>
              <Field
                name="familyRelationship"
                type="select"
                component={LabeledInput}
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

              {/* TODO: add membership type */}
            </Row>
          </form>
        </Modal.Body>

      </Modal>
    );
  }
}
