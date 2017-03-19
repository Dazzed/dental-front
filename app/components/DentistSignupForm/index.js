/*
Dentist Signup Form Component
================================================================================
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
import { Field, formValueSelector, reduxForm } from 'redux-form';

// app
import { US_STATES } from 'common/constants';
import Checkbox from 'components/Checkbox';
import InputGroup from 'components/InputGroup';
import InputTime from 'components/InputTime';
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import dentistSignupFormValidator from './validator';

/*
Field Validators
------------------------------------------------------------
*/
const requiredValidator = (name) => (value) => {
  return value !== null && value !== undefined
    ? undefined // all good
    : `Please enter a(n) ${name}.`;
}

const minValidator = (min) => (value) => {
  return isFinite(value) === true && value >= min
    ? undefined // all good
    : `Please enter an amount above ${min}.`;
}

/*
Redux
------------------------------------------------------------
*/
const valueSelector = formValueSelector('dentist-signup');

const mapStateToProps = (state) => ({
  officeClosed: {
    monday: valueSelector(state, 'hours-monday') === false,
    tuesday: valueSelector(state, 'hours-tuesday') === false,
    wednesday: valueSelector(state, 'hours-wednesday') === false,
    thursday: valueSelector(state, 'hours-thursday') === false,
    friday: valueSelector(state, 'hours-friday') === false,
    saturday: valueSelector(state, 'hours-saturday') === false,
    sunday: valueSelector(state, 'hours-sunday') === false,
  },
  optedIntoMarketplace: valueSelector(state, 'marketplaceOptIn'),
});


/*
Signup Form
================================================================================
*/
@connect(mapStateToProps, null)
@reduxForm({
  form: 'dentist-signup',
  validate: dentistSignupFormValidator,
})
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

    initialValues: React.PropTypes.object.isRequired,
    pricingCodes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,

    services: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })).isRequired,

    // mapped - state
    officeClosed: React.PropTypes.object,
    optedIntoMarketplace: React.PropTypes.bool,

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
      pricingCodes,
      services,

      // mapped - state
      officeClosed,
      optedIntoMarketplace,

      // redux form
      error,
      handleSubmit,
      submitting
    } = this.props;

    const pricingCodesContent = pricingCodes.map((pricingCode) => {
      return (
        <div className="row" styleName="pricing-codes__entry" key={pricingCode}>
          <div className="col-sm-6">
            <div styleName="pricing-codes__entry__code">
              {pricingCode}
            </div>
          </div>
          <div className="col-sm-6">
            <Row>
              <Field
                name={`priceCode-${pricingCode}`}
                type="number"
                component={InputGroup}
                leftAddon="$"
                validate={[
                  requiredValidator('Amount'),
                  minValidator(0)
                ]}
              />
            </Row>
          </div>
        </div>
      );
    });

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
            name="specialtyId"
            type="select"
            label="Office Specialty"
            component={LabeledInput}
            className="col-sm-6"
          >
            <option value="">Select a Specialty</option>
            {dentistSpecialties.map((specialty, index) => (
              <option value={specialty.id} key={index}>
                {specialty.name}
              </option>
            ))}
          </Field>
        </Row>

        <Row>
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

          <Field
            name="url"
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
            name="confirmEmail"
            type="text"
            component={LabeledInput}
            label="Confirm the Email Address"
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
            name="message"
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
        Image Uploaders
        ------------------------------------------------------------
        */}
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
        TODO: Pull pricing codes from the backend.  See `app/containers/DentistSignupPage/sagas.js`.
        */}
        <ControlLabel>Membership Pricing / Affordability:</ControlLabel>

        <div className="row" styleName="pricing-codes">
          <div className="col-sm-offset-2 col-sm-8">

            <div className="row" styleName="pricing-codes__titles">
              <div className="col-sm-6">
                Pricing Codes
              </div>
              <div className="col-sm-6">
                Price
              </div>
            </div>

            {pricingCodesContent}

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

        <FormGroup>
          <div className="col-sm-8">
            <ControlLabel>Recommended Adult Monthly Membership Fee:</ControlLabel>
            <Row>
              <Field
                name="adultMonthlyFee"
                type="number"
                component={InputGroup}
                leftAddon="$"
                width={6}
              />
            </Row>
          </div>
        </FormGroup>

        <FormGroup>
          <div className="col-sm-8">
            <ControlLabel>Recommended Child Monthly Membership Fee:</ControlLabel>
            <Row>
              <Field
                name="childMonthlyFee"
                type="number"
                component={InputGroup}
                leftAddon="$"
                width={6}
              />
            </Row>
          </div>
        </FormGroup>

        <FormGroup>
          <div className="col-sm-8">
            <ControlLabel>Recommended Adult Annual Membership Fee:</ControlLabel>
            <Row>
              <Field
                name="adultYearlyFee"
                type="number"
                component={InputGroup}
                leftAddon="$"
                width={6}
              />
            </Row>
          </div>

          <div className="col-sm-4">
            <div styleName="activation-checkbox--align">
              <Field
                name="adultYearlyFeeActivated"
                component={Checkbox}
              >
                Activate this offer.
              </Field>
            </div>
          </div>
        </FormGroup>

        <FormGroup>
          <div className="col-sm-8">
            <ControlLabel>Recommended Child Annual Membership Fee:</ControlLabel>
            <Row>
              <Field
                name="childYearlyFee"
                type="number"
                component={InputGroup}
                leftAddon="$"
                width={6}
              />
            </Row>
          </div>

          <div className="col-sm-4">
            <div styleName="activation-checkbox--align">
              <Field
                name="childYearlyFeeActivated"
                component={Checkbox}
              >
                Activate this offer.
              </Field>
            </div>
          </div>
        </FormGroup>

        <FormGroup>
          <div className="col-sm-8">
            <ControlLabel>Treatment Discount Percent:</ControlLabel>
            <Row>
              <Field
                name="treatmentDiscount"
                type="number"
                component={InputGroup}
                leftAddon="%"
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
        Marketplace Opt In
        ------------------------------------------------------------
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
              Yes, please include my office on the Dental HQ Marketplace listing.
            </Field>
          </div>
        </FormGroup>

        <hr styleName="spacer" />

        {/*
        Services
        ------------------------------------------------------------
        */}
        <div>
          <ControlLabel>Services Offered:</ControlLabel>

          <p styleName="field-instructions">
            *Specialties are only used in the Public Marketplace to help match new patients to the best dentist for their needs.   You can opt in or out of the Public Marketplace above.
          </p>                

          {optedIntoMarketplace && (
            <Row>
              {servicesContent}
            </Row>
          )}
        </div>

        <hr styleName="spacer" />

        {/*
        Hours
        ------------------------------------------------------------
        */}
        <div>
          <ControlLabel>Office Operating Hours:</ControlLabel>

          <p styleName="field-instructions">
            *Office Hours are only used in the Public Marketplace to help match new patients to the best dentist for their needs.   You can opt in or out of the Public Marketplace above.
          </p>

          {optedIntoMarketplace && (
            <div>
              <Row>
                <div className="col-sm-offset-4 col-sm-4">
                  <ControlLabel>Open:</ControlLabel>
                </div>
                <div className="col-sm-4">
                  <ControlLabel>Close:</ControlLabel>
                </div>
              </Row>

              <Row>
                <div className="col-sm-4">
                  <Field
                    name="hours-monday-open"
                    component={Checkbox}
                  >
                    <span>Monday</span>
                  </Field>
                </div>

                <Field
                  name="hours-monday-start"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="9:00"
                  defaultToAM={true}
                  disabled={officeClosed.monday}
                />

                <Field
                  name="hours-monday-end"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="5:00"
                  defaultToPM={true}
                  disabled={officeClosed.monday}
                />
              </Row>

              <Row>
                <div className="col-sm-4">
                  <Field
                    name="hours-tuesday-open"
                    component={Checkbox}
                  >
                    <span>Tuesday</span>
                  </Field>
                </div>

                <Field
                  name="hours-tuesday-start"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="9:00"
                  defaultToAM={true}
                  disabled={officeClosed.tuesday}
                />

                <Field
                  name="hours-tuesday-end"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="5:00"
                  defaultToPM={true}
                  disabled={officeClosed.tuesday}
                />
              </Row>

              <Row>
                <div className="col-sm-4">
                  <Field
                    name="hours-wednesday-open"
                    component={Checkbox}
                  >
                    <span>Wednesday</span>
                  </Field>
                </div>

                <Field
                  name="hours-wednesday-start"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="9:00"
                  defaultToAM={true}
                  disabled={officeClosed.wednesday}
                />

                <Field
                  name="hours-wednesday-end"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="5:00"
                  defaultToPM={true}
                  disabled={officeClosed.wednesday}
                />
              </Row>

              <Row>
                <div className="col-sm-4">
                  <Field
                    name="hours-thursday-open"
                    component={Checkbox}
                  >
                    <span>Thursday</span>
                  </Field>
                </div>

                <Field
                  name="hours-thursday-start"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="9:00"
                  defaultToAM={true}
                  disabled={officeClosed.thursday}
                />

                <Field
                  name="hours-thursday-end"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="5:00"
                  defaultToPM={true}
                  disabled={officeClosed.thursday}
                />
              </Row>

              <Row>
                <div className="col-sm-4">
                  <Field
                    name="hours-friday-open"
                    component={Checkbox}
                  >
                    <span>Friday</span>
                  </Field>
                </div>

                <Field
                  name="hours-friday-start"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="9:00"
                  defaultToAM={true}
                  disabled={officeClosed.friday}
                />

                <Field
                  name="hours-friday-end"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="3:00"
                  defaultToPM={true}
                  disabled={officeClosed.friday}
                />
              </Row>

              <Row>
                <div className="col-sm-4">
                  <Field
                    name="hours-saturday-open"
                    component={Checkbox}
                  >
                    <span>Saturday</span>
                  </Field>
                </div>

                <Field
                  name="hours-saturday-start"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="9:00"
                  defaultToAM={true}
                  disabled={officeClosed.saturday}
                />

                <Field
                  name="hours-saturday-end"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="3:00"
                  defaultToPM={true}
                  disabled={officeClosed.saturday}
                />
              </Row>

              <Row>
                <div className="col-sm-4">
                  <Field
                    name="hours-sunday-open"
                    component={Checkbox}
                  >
                    <span>Sunday</span>
                  </Field>
                </div>

                <Field
                  name="hours-sunday-start"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="9:00"
                  defaultToAM={true}
                  disabled={officeClosed.sunday}
                />

                <Field
                  name="hours-sunday-end"
                  component={InputTime}
                  className="col-sm-4"
                  placeholder="3:00"
                  defaultToPM={true}
                  disabled={officeClosed.sunday}
                />
              </Row>
            </div>
          )}

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
