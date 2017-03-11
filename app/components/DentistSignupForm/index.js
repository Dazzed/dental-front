/*
Dentist Signup Form Component
================================================================================
TODO: Should the dentist also select a specialty on this page? That was part of
      the old signup flow...
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import FaPlus from 'react-icons/lib/fa/plus';
import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Row from 'react-bootstrap/lib/Row';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// app
import { US_STATES } from 'common/constants';
import Checkbox from 'components/Checkbox';
import InputGroup from 'components/InputGroup';
import LabeledInput from 'components/LabeledInput';
import { isInvalidNameSelector } from 'containers/DentistSignupPage/selectors';

// local
import styles from './styles.css';
import dentistSignupFormValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    isInvalidName: isInvalidNameSelector(state),
  };
}


/*
Signup Form
================================================================================
*/
@reduxForm({
  form: 'dentist-signup',
  validate: dentistSignupFormValidator,
})
@connect(mapStateToProps, null)
@CSSModules(styles)
class DentistSignupForm extends React.Component {

  static propTypes = {
    // passed in - state
    dentistSpecialties: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })).isRequired,

    services: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })).isRequired,

    // mapped - state
    isInvalidName: React.PropTypes.bool,

    // redux form
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  /*
  Actions
  ------------------------------------------------------------
  */
  onUploadOfficeLogoClick = () => {
    // TODO
    alert("TODO: Upload Office Logo");
  }

  onUploadProfilePhotoClick = () => {
    // TODO
    alert("TODO: Upload Profile Photo");
  }

  onUploadOfficeImageClick = (index) => {
    // TODO
    alert("TODO: Upload Office Image #" + index);
  }

  render () {
    const {
      // passed in - state
      dentistSpecialties,
      services,

      // mapped - state
      isInvalidName,

      // redux form
      error,
      handleSubmit,
      submitting
    } = this.props;

    // TODO: Should the Pricing Codes and/or Services be sorted at all
    //       (alphabetically, etc)?
    //         - If so, do this in the Reducer.
    const servicesContent = services.map((service) => {
      // Remove all whitespace and "-" in the string.  `fieldName` will still
      // be unique due to the inclusion of `service.id`.
      const cleanedName = service.name.replace(/[\s-]+/g, '');
      const fieldName = `service-${cleanedName}-${service.id}`;

      return (
        <div className="col-sm-4" key={service.id}>
          <Field
            name={fieldName}
            component={Checkbox}
          >
            <span>{service.name}</span>
          </Field>
        </div>
      );
    });

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">

        {/*
        Office Info
        ------------------------------------------------------------
        */}
        <Row>
          <Field
            name="officeName"
            type="text"
            component={LabeledInput}
            label="Office Name"
            placeholder=""
            className="col-sm-6"
          />

          <Field
            name="website"
            type="text"
            component={LabeledInput}
            label="Website URL"
            placeholder=""
            className="col-sm-6"
          />
        </Row>

        <Row>
          <Field
            name="email"
            type="text"
            component={LabeledInput}
            label="Office Email Address"
            placeholder=""
            className="col-sm-6"
          />

          <Field
            name="phone"
            type="text"
            mask="(999) 999-9999"
            maskChar=" "
            component={LabeledInput}
            label="Office Phone Number"
            placeholder=""
            className="col-sm-6"
          />
        </Row>

        <Row>
          <Field
            name="password"
            type="password"
            component={LabeledInput}
            label="Create Password"
            placeholder=""
            className="col-sm-6"
          />

          <Field
            name="confirmPassword"
            type="password"
            component={LabeledInput}
            label="Re-enter Password"
            placeholder=""
            className="col-sm-6"
          />
        </Row>

        <p styleName="field-instructions">
          *Password must be at least 8 characters and include one (1) special character and one (1) capital letter.
        </p>

        <Row>
          <Field
            name="profileMessage"
            type="textarea"
            component={LabeledInput}
            label="Office Profile Message"
            placeholder=""
            className="col-sm-12"
            rows={5}
          />
        </Row>

        <Row>
          <Field
            name="address"
            type="text"
            component={LabeledInput}
            label="Address"
            placeholder=""
            className="col-sm-12"
          />
        </Row>

        <Row>
          <Field
            name="city"
            type="text"
            component={LabeledInput}
            label="City"
            placeholder=""
            className="col-sm-4"
          />

          <Field
            name="state"
            type="select"
            component={LabeledInput}
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
            name="zipCode"
            type="text"
            mask="99999"
            maskChar=" "
            component={LabeledInput}
            label="Zip Code"
            placeholder=""
            className="col-sm-4"
          />
        </Row>

        <hr styleName="spacer" />

        {/*
        Marketplace Opt In
        ------------------------------------------------------------
        TODO: Automatically show / hide the services & office hours if the
              opt-in checkbox is checked / unchecked (respectively)?
                - If so, it'd be best to default the opt-in checkbox to checked
                  so that the services & office hours are shown by default.
        TODO: Move down the form so it's right above services / office hours?
        */}
        <FormGroup>
          <div className="col-sm-12">
            <ControlLabel>
              Include Office On Our Public Marketplace Listings?
            </ControlLabel>
            <Field
              name="marketplaceOptIn"
              component={Checkbox}
            >
              <span>Yes, please include my office on the Dental HQ Marketplace listing.</span>
            </Field>
          </div>
        </FormGroup>

        <hr styleName="spacer" />

        {/*
        Image Uploaders
        ------------------------------------------------------------
        TODO
        */}
        <p>TODO: Currently this is only mocked up on the frontend, and is not hooked up to the backend.</p>

        <Row>
          <div className="col-sm-4">
            <FormGroup>
              <div className="col-sm-12">
                <ControlLabel>Upload Office Logo:</ControlLabel>
                <div styleName="image-uploader" onClick={this.onUploadOfficeLogoClick}>
                  <span styleName="image-uploader__plus-icon">
                    <FaPlus size={48} />
                  </span>
                </div>
              </div>
            </FormGroup>
          </div>

          <div className="col-sm-4">
            <FormGroup>
              <div className="col-sm-12">
                <ControlLabel>Upload Profile Picture:</ControlLabel>
                <div styleName="image-uploader" onClick={this.onUploadProfilePhotoClick}>
                  <span styleName="image-uploader__plus-icon">
                    <FaPlus size={48} />
                  </span>
                </div>
              </div>
            </FormGroup>
          </div>
        </Row>

        <FormGroup>
          <div className="col-sm-12">
            <ControlLabel>Upload Office Images:</ControlLabel>

            <Row>
              <div className="col-sm-4">
                <div styleName="image-uploader" onClick={this.onUploadOfficeImageClick.bind(this, 0)}>
                  <span styleName="image-uploader__plus-icon">
                    <FaPlus size={48} />
                  </span>
                </div>
              </div>

              <div className="col-sm-4">
                <div styleName="image-uploader" onClick={this.onUploadOfficeImageClick.bind(this, 1)}>
                  <span styleName="image-uploader__plus-icon">
                    <FaPlus size={48} />
                  </span>
                </div>
              </div>

              <div className="col-sm-4">
                <div styleName="image-uploader" onClick={this.onUploadOfficeImageClick.bind(this, 2)}>
                  <span styleName="image-uploader__plus-icon">
                    <FaPlus size={48} />
                  </span>
                </div>
              </div>
            </Row>

          </div>
        </FormGroup>

        <hr styleName="spacer" />

        {/*
        Pricing
        ------------------------------------------------------------
        TODO

        TODO: Are pricing code names editable / customizable on a per-dentist
              or per-office basis?  If so, do dentists need the ability to
              add / edit pricing codes?
        */}
        <p>TODO: Currently this is only mocked up on the frontend, and is not hooked up to the backend.</p>

        <ControlLabel>Membership Pricing / Affordability:</ControlLabel>

        <div className="row" styleName="pricing-codes">
          <div className="col-sm-offset-2 col-sm-8">

            <div className="row" styleName="pricing-codes__titles">
              <div className="col-sm-6">
                Pricing Code
              </div>
              <div className="col-sm-6">
                Price
              </div>
            </div>

            <div className="row" styleName="pricing-codes__entry">
              <div className="col-sm-6">
                <div styleName="pricing-codes__entry__code">
                  D0120 (Example)
                </div>
              </div>
              <div className="col-sm-6">
                <Row>
                  <Field
                    name="priceCode-0"
                    type="number"
                    component={InputGroup}
                    leftAddon="$"
                  />
                </Row>
              </div>
            </div>

            <div className="row" styleName="pricing-codes__entry">
              <div className="col-sm-6">
                <div styleName="pricing-codes__entry__code">
                  D0140 (Example)
                </div>
              </div>
              <div className="col-sm-6">
                <Row>
                  <Field
                    name="priceCode-1"
                    type="number"
                    component={InputGroup}
                    leftAddon="$"
                  />
                </Row>
              </div>
            </div>

            <div className="row" styleName="pricing-codes__entry">
              <div className="col-sm-6">
                <div styleName="pricing-codes__entry__code">
                  D0150 (Example)
                </div>
              </div>
              <div className="col-sm-6">
                <Row>
                  <Field
                    name="priceCode-2"
                    type="number"
                    component={InputGroup}
                    leftAddon="$"
                  />
                </Row>
              </div>
            </div>

            <div className="row" styleName="pricing-codes__entry">
              <div className="col-sm-6">
                <div styleName="pricing-codes__entry__code">
                  D0220 (Example)
                </div>
              </div>
              <div className="col-sm-6">
                <Row>
                  <Field
                    name="priceCode-3"
                    type="number"
                    component={InputGroup}
                    leftAddon="$"
                  />
                </Row>
              </div>
            </div>

          {/* End Pricing Codes Wrapper Column*/}
          </div>
        {/* End Pricing Codes Wrapper Row*/}
        </div>

        <div styleName="field-instructions">
          <p>
            *This pricing is used to create your recommended membership pricing and your affordability index.  These fees will NOT be published.
          </p>

          <p>
            *Once your membership is set, a 30 day notice to your current members must be given prior to changing their monthly membership fee.
          </p>
        </div>

        <Row>
          <Field
            name="adultMonthlyFee"
            type="text"
            component={LabeledInput}
            label="Recommended Adult Monthly Membership Fee"
            placeholder=""
            className="col-sm-8"
            width={6}
          />
        </Row>

        <Row>
          <Field
            name="childMonthlyFee"
            type="text"
            component={LabeledInput}
            label="Recommended Child Monthly Membership Fee"
            placeholder=""
            className="col-sm-8"
            width={6}
          />
        </Row>

        <Row>
          <Field
            name="adultYearlyFee"
            type="text"
            component={LabeledInput}
            label="Recommended Adult Annual Membership Fee"
            placeholder=""
            className="col-sm-8"
            width={6}
          />

          <div className="col-sm-4">
            <div styleName="activation-checkbox--align">
              <Field
                name="adultYearlyFeeActivated"
                component={Checkbox}
              >
                <span>Activate this offer.</span>
              </Field>
            </div>
          </div>
        </Row>

        <Row>
          <Field
            name="childYearlyFee"
            type="text"
            component={LabeledInput}
            label="Recommended Child Annual Membership Fee"
            placeholder=""
            className="col-sm-8"
            width={6}
          />

          <div className="col-sm-4">
            <div styleName="activation-checkbox--align">
              <Field
                name="childYearlyFeeActivated"
                component={Checkbox}
              >
                <span>Activate this offer.</span>
              </Field>
            </div>
          </div>
        </Row>

        <FormGroup>
          <div className="col-sm-8">
            <ControlLabel>Treatment Discount Percent:</ControlLabel>
            <Row>
              <Field
                name="treatmentDiscount"
                type="number"
                component={InputGroup}
                leftAddon="$"
                width={6}
              />
            </Row>
          </div>
        </FormGroup>

        <p styleName="field-instructions">
          *This is the discount you will offer your members off an additional treatment not included in their membership.
        </p>

        <hr styleName="spacer" />

        {/*
        Services
        ------------------------------------------------------------
        */}
        <div>
          <ControlLabel>Services Offered:</ControlLabel>

          <p styleName="field-instructions">
            *Leave blank if not participating in Public Marketplace.
          </p>

          <Row>
            {servicesContent}
          </Row>
        </div>

        <hr styleName="spacer" />

        {/*
        Hours
        ------------------------------------------------------------
        // TODO: Create TimeInput, and possibly a DayTimeInput to wrap it (and
        //       handle things like disabling the start / end TimeInputs if the
        //       day isn't checked).
        */}
        <div>
          <p>TODO: Create custom time input controls.</p>

          <ControlLabel>Office Operating Hours:</ControlLabel>

          <p styleName="field-instructions">
            *Leave blank if not participating in Public Marketplace.
          </p>

          <Row>
            <div className="col-sm-offset-5 col-sm-3">
              <ControlLabel>Open:</ControlLabel>
            </div>
            <div className="col-sm-3">
              <ControlLabel>Close:</ControlLabel>
            </div>
          </Row>

          <Row>
            <div className="col-sm-offset-1 col-sm-4">
              <Field
                name="hours-Monday"
                component={Checkbox}
              >
                <span>Monday</span>
              </Field>
            </div>

            <div className="col-sm-3">
              TODO
            </div>

            <div className="col-sm-3">
              TODO
            </div>
          </Row>

          <Row>
            <div className="col-sm-offset-1 col-sm-4">
              <Field
                name="hours-Tuesday"
                component={Checkbox}
              >
                <span>Tuesday</span>
              </Field>
            </div>

            <div className="col-sm-3">
              TODO
            </div>

            <div className="col-sm-3">
              TODO
            </div>
          </Row>

          <Row>
            <div className="col-sm-offset-1 col-sm-4">
              <Field
                name="hours-Wednesday"
                component={Checkbox}
              >
                <span>Wednesday</span>
              </Field>
            </div>

            <div className="col-sm-3">
              TODO
            </div>

            <div className="col-sm-3">
              TODO
            </div>
          </Row>

          <Row>
            <div className="col-sm-offset-1 col-sm-4">
              <Field
                name="hours-Thursday"
                component={Checkbox}
              >
                <span>Thursday</span>
              </Field>
            </div>

            <div className="col-sm-3">
              TODO
            </div>

            <div className="col-sm-3">
              TODO
            </div>
          </Row>

          <Row>
            <div className="col-sm-offset-1 col-sm-4">
              <Field
                name="hours-Friday"
                component={Checkbox}
              >
                <span>Friday</span>
              </Field>
            </div>

            <div className="col-sm-3">
              TODO
            </div>

            <div className="col-sm-3">
              TODO
            </div>
          </Row>

          <Row>
            <div className="col-sm-offset-1 col-sm-4">
              <Field
                name="hours-Saturday"
                component={Checkbox}
              >
                <span>Saturday</span>
              </Field>
            </div>

            <div className="col-sm-3">
              TODO
            </div>

            <div className="col-sm-3">
              TODO
            </div>
          </Row>

          <Row>
            <div className="col-sm-offset-1 col-sm-4">
              <Field
                name="hours-Sunday"
                component={Checkbox}
              >
                <span>Sunday</span>
              </Field>
            </div>

            <div className="col-sm-3">
              TODO
            </div>

            <div className="col-sm-3">
              TODO
            </div>
          </Row>

        {/* End Hours */}
        </div>

        <hr styleName="spacer" />

        {/*
        Errors & Submit
        ------------------------------------------------------------
        */}
        <FormGroup className="has-error">
          <div className="col-sm-12">
            {error && <HelpBlock>{error}</HelpBlock>}
          </div>
        </FormGroup>

        <FormGroup className="text-center">
          <div className="col-sm-12">
            <input
              type="submit"
              disabled={submitting}
              value="CREATE MY ACCOUNT &gt;"
              styleName="large-button--secondary"
            />
          </div>
        </FormGroup>
      </form>
    );
  }
}

export default DentistSignupForm;


/*
          <Field
            name="specialtyId"
            type="select"
            label="Specialty"
            component={LabeledInput}
            className="col-sm-4"
          >
            <option value="">Select an Specialty</option>
            {dentistSpecialties.map((specialty, index) => (
              <option value={specialty.id} key={index}>
                {specialty.name}
              </option>
            ))}
          </Field>
*/
