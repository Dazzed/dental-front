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
import { connect } from 'react-redux';
import Select from 'react-select/dist/react-select.js';

// app
import {
  SEX_TYPES,
  PREFERRED_CONTACT_METHODS,
  MEMBER_RELATIONSHIP_TYPES,
} from 'common/constants';
import renderDatePicker from 'components/DatePicker';
import LabeledInput from 'components/LabeledInput';
import Checkbox from 'components/Checkbox';
// local
import styles from './styles.css';
import MemberValidator from './validator';


function formatPhoneNumber(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

function mapStateToProps(state) {
  if (state.adminDentistsPage.selectedDentist) {
    const { selectedDentist } = state.adminDentistsPage;
    const {
      firstName,
      lastName,
      email,
      dentistInfo,
      verified,
      links,
    } = selectedDentist;

    let phone = '';
    if (state.adminDentistsPage.selectedDentist.phoneNumbers.length) {
      phone = state.adminDentistsPage.selectedDentist.phoneNumbers[0].number;
    }
    const { affordabilityScore, marketplaceOptIn } = dentistInfo;

    const { dentists } = state.adminDentistsPage;

    return {
      initialValues: {
        firstName,
        lastName,
        email,
        phone: phone ? formatPhoneNumber(phone) : phone,
        managerId: dentistInfo.managerId,
        verified,
        affordabilityScore: affordabilityScore ? String(affordabilityScore) : undefined,
        marketplaceOptIn,
        links: links.map(l => {
          const { dentistInfo: { address } } = dentists.find(d => d.dentistInfo.userId == l.id);
          return {
            value: l.id,
            label: `${l.officeName} (${address})`
          };
        })
      },
      dentists,
      selectedDentist
    };
  }
  return {};
}

@connect(mapStateToProps, null)
@reduxForm({
  form: 'adminEditDentist',
  enableReinitialize: true,
  validate: MemberValidator,
})
@CSSModules(styles, { allowMultiple: true })
export default class AdminEditDentistFormModal extends React.Component {

  static propTypes = {
    // form related
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // modal related
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  componentWillMount () {
    const { initialValues: { links } } = this.props;
    this.state = {
      alteredLinks: links
    };
  }

  handleFormSubmit = (values) => {
    this.props.onSubmit(values);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  getCheckbox(props) {
    return new Checkbox(props);
  }

  onSelectLink = dentists => {
    this.setState({
      alteredLinks: dentists
    });
    this.props.change('links', dentists);
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
      valid,
      dirty,
      managers,
      dentists,
      selectedDentist
    } = this.props;

    const optionsForLinking = dentists
      .map(d => ({ value: d.id, label: `${d.dentistInfo.officeName} (${d.dentistInfo.address})` }))
      .filter(d => d.value !== selectedDentist.id);

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
          <Modal.Title>Edit Dentist</Modal.Title>

          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={submitting || !valid || !dirty}
              onClick={handleSubmit(this.handleFormSubmit)}
              value="Save"
            />
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
                name="email"
                type="text"
                component={this.getLabeledInput}
                label="Email"
                placeholder=""
                className="col-sm-6"
              />
            </Row>

            <Row>
              <Field
                name="phone"
                type="text"
                mask="(999) 999-9999"
                maskChar=" "
                component={this.getLabeledInput}
                label="Contact Phone Number"
                placeholder=""
                className="col-sm-6"
              />
            </Row>

            <Row>
              <Field
                name="managerId"
                type="select"
                label="Account Manager (Select One)"
                component={this.getLabeledInput}
                className="col-sm-6"
                selectedValue={initialValues.managerId ? String(initialValues.managerId) : 0}
              >
                <option value={0} key={Math.random()}>
                  Select Account Manager
                </option>
                {managers.map(manager =>
                  <option value={manager.id} key={manager.id}>
                    {manager.firstName + ' ' + manager.lastName}
                  </option>
                )}
              </Field>
            </Row>

            <Row>
              <Field
                name="affordabilityScore"
                type="number"
                component={this.getLabeledInput}
                label="Affordability Score (1-4)"
                placeholder=""
                className="col-sm-6"
              />
            </Row>

            <Row>
              <h4 style={{ paddingLeft: '2%' }}><strong>Link Offices: </strong></h4>
              <p style={{ paddingLeft: '2%' }}>Select Offices you wish to link.</p>
              <Select
                className="col-sm-6"
                name="links"
                value={this.state.alteredLinks}
                options={optionsForLinking}
                multi
                onChange={this.onSelectLink}
                clearable={false}
                placeholder="Select the offices to link..."
              />
            </Row>
            <br />
            <Row>
              <Field
                name="marketplaceOptIn"
                component={this.getCheckbox}
                value="marketplaceOptIn"
                className="col-sm-6"
              >
                <strong>Marketplace Access Denial:</strong>
                <p style={{paddingLeft: '5%'}}>Check if an access to marketplace should be denied.</p>
              </Field>
            </Row>

            <Row>
              <Field
                name="verified"
                component={this.getCheckbox}
                value="verified"
                className="col-sm-6"
              >
                <strong>Active Membership:</strong>
                <p style={{paddingLeft: '5%'}}>If an active membership is inactivated, all members will be cancelled.</p>
              </Field>
            </Row>
          </form>
        </Modal.Body>

      </Modal>
    );
  }
}
