/*
Account Security Form Modal Component
================================================================================
*/

/*
Import
------------------------------------------------------------
*/
// libs
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm, submit as submitForm } from 'redux-form';

// app
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import AccountSecurityFormValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch(submitForm('accountSecurity')),
});


/*
Member Form Modal
================================================================================
*/
@connect(null, mapDispatchToProps)
@reduxForm({
  form: 'accountSecurity',
  enableReinitialize: true,
  validate: AccountSecurityFormValidator,
})
@CSSModules(styles)
export default class AccountSecurityFormModal extends React.Component {

  static propTypes = {
    // event handlers - passed in
    goToProfileForm: React.PropTypes.func,

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
  Event Handlers
  ------------------------------------------------------------
  */
  profileFormLinkClick = (e) => {
    e.preventDefault();
    this.props.goToProfileForm();
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // event handlers
      goToProfileForm,

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
          <Modal.Title>Edit Login &amp; Security Settings</Modal.Title>
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
                name="newEmail"
                type="text"
                component={LabeledInput}
                label="New Email Address"
                placeholder=""
                className="col-sm-6"
              />

              <Field
                name="confirmNewEmail"
                type="text"
                component={LabeledInput}
                label="Confirm New Email Address"
                placeholder=""
                className="col-sm-6"
              />
            </Row>

            <Row>
              <Field
                name="newPassword"
                type="password"
                component={LabeledInput}
                label="New Password"
                placeholder=""
                className="col-sm-6"
              />

              <Field
                name="confirmNewPassword"
                type="password"
                component={LabeledInput}
                label="Confirm New Password"
                placeholder=""
                className="col-sm-6"
              />

              <div className="col-sm-12">
                <h5 styleName="field-instructions">
                  *Password must be at least 8 characters and include one (1) special character and one (1) capital letter.
                </h5>
              </div>
            </Row>

            <Row>
              <Field
                name="oldPassword"
                type="password"
                component={LabeledInput}
                label="Current Password"
                placeholder=""
                className="col-sm-6"
              />
            </Row>

            <p styleName="field-instructions">
              For security, you must enter your current password to change your account's email and password.  You may leave both "New Password" fields blank if you only wish to change your email, or leave both email fields blank if you only wish to change your password.
            </p>

            {goToProfileForm && (
              <p styleName="field-instructions">
                You can update your account address, phone number, and preferred contact method in the
                {' '}
                <a href="#" onClick={this.profileFormLinkClick}>Login and Security Settings</a>
                {' '}
                form.
              </p>
            )}

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
              value="Update Profile"
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
