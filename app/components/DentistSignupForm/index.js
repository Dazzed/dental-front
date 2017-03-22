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
import {
  Field,
  FormSection,
  formValueSelector,
  reduxForm
} from 'redux-form';

// app
import { US_STATES } from 'common/constants';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
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
  return value !== undefined
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

const mapStateToProps = (state) => {
  const {
    marketplace,
    pricing,
    workingHours,
  } = valueSelector(state, 'marketplace', 'pricing', 'workingHours');

  // precondition: Redux-form hasn't initialized yet.  Note that the
  // `intitialValues` prop is also unavailable, so just provide a sane guess
  // while the page loads.
  if ( marketplace === undefined
    && pricing === undefined
    && workingHours === undefined
  ) {
    return {
      // marketplace
      optedIntoMarketplace: true,

      // pricing
      yearlyFeeActivated: {
        adult: false,
        child: false,
      },

      recommendedFees: {
        monthly: {
          adult: "",
          child: "",
        },
        yearly: {
          adult: "",
          child: "",
        },
      },

      // working hours
      officeClosed: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      }
    };
  }

  const baseRecommendedFee = {
    adult: null,
    child: null,
  };

  if (pricing.codes) {
    const D0120 = parseFloat(pricing.codes.D0120);
    const D0140 = parseFloat(pricing.codes.D0140);
    const D0220 = parseFloat(pricing.codes.D0220);
    const D0272 = parseFloat(pricing.codes.D0272);
    const D0274 = parseFloat(pricing.codes.D0274);
    const D0330 = parseFloat(pricing.codes.D0330);
    const D1110 = parseFloat(pricing.codes.D1110);
    const D1120 = parseFloat(pricing.codes.D1120);
    const D1206 = parseFloat(pricing.codes.D1206);

    if ( isNaN(D0120) === false
      && isNaN(D0140) === false
      && isNaN(D0220) === false
      && isNaN(D0274) === false
      && isNaN(D0330) === false
      && isNaN(D1110) === false
    ) {
      baseRecommendedFee.adult = (
          (D0120 * 2)
        + D0140
        + D0220
        + D0274
        + (D0330 * 0.3)
        + (D1110 * 2)
      );
    }

    if ( isNaN(D0120) === false
      && isNaN(D0140) === false
      && isNaN(D0220) === false
      && isNaN(D0272) === false
      && isNaN(D0330) === false
      && isNaN(D1120) === false
      && isNaN(D1206) === false
    ) {
      baseRecommendedFee.child = (
          (D0120 * 2)
        + D0140
        + D0220
        + D0272
        + (D0330 * 0.3)
        + (D1120 * 2)
        + D1206
      );
    }
  }

  return {
    // marketplace
    optedIntoMarketplace: marketplace.optIn === true,

    // pricing
    yearlyFeeActivated: {
      adult: pricing.adultYearlyFeeActivated === true,
      child: pricing.childYearlyFeeActivated === true,
    },

    recommendedFees: {
      monthly: {
        adult: baseRecommendedFee.adult !== null
                 ? (baseRecommendedFee.adult * 0.75 / 12).toFixed(2)
                 : null,
        child: baseRecommendedFee.child !== null
                 ? (baseRecommendedFee.child * 0.7 / 12).toFixed(2)
                 : null,
      },
      yearly: {
        adult: baseRecommendedFee.adult !== null
                 ? (baseRecommendedFee.adult * 0.7).toFixed(2)
                 : null,
        child: baseRecommendedFee.child !== null
                 ? (baseRecommendedFee.child * 0.65).toFixed(2)
                 : null,
      },
    },

    // working hours
    officeClosed: {
      monday:    workingHours.monday === undefined    || workingHours.monday.open === false,
      tuesday:   workingHours.tuesday === undefined   || workingHours.tuesday.open === false,
      wednesday: workingHours.wednesday === undefined || workingHours.wednesday.open === false,
      thursday:  workingHours.thursday === undefined  || workingHours.thursday.open === false,
      friday:    workingHours.friday === undefined    || workingHours.friday.open === false,
      saturday:  workingHours.saturday === undefined  || workingHours.saturday.open === false,
      sunday:    workingHours.sunday === undefined    || workingHours.sunday.open === false,
    }
  };
};


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
    officeClosed: React.PropTypes.object.isRequired,
    optedIntoMarketplace: React.PropTypes.bool.isRequired,
    yearlyFeeActivated: React.PropTypes.object.isRequired,

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

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // passed in - state
      dentistSpecialties,
      pricingCodes,
      services,

      // mapped - state
      recommendedFees,
      officeClosed,
      optedIntoMarketplace,
      yearlyFeeActivated,

      // redux form
      error,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">

        {/*
        User Info
        ------------------------------------------------------------
        */}
        <FormSection name="user">
          <FormGroup>
            <div className="col-sm-12">
              <ControlLabel>Your Name:</ControlLabel>
            </div>

            <Field
              name="firstName"
              type="text"
              component={Input}
              label="First Name"
              width={4}
            />

            <Field
              name="middleName"
              type="text"
              component={Input}
              label="Middle Name (optional)"
              width={4}
            />

            <Field
              name="lastName"
              type="text"
              component={Input}
              label="Last Name"
              width={4}
            />
          </FormGroup>

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
              name="specialtyId"
              type="select"
              label="Specialty"
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
              name="email"
              type="text"
              component={LabeledInput}
              label="Email Address"
              placeholder=""
              className="col-sm-6"
            />

            <Field
              name="confirmEmail"
              type="text"
              component={LabeledInput}
              label="Confirm Email Address"
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

          <hr styleName="spacer" />
        </FormSection>

        {/*
        Office Info
        ------------------------------------------------------------
        */}
        <FormSection name="officeInfo">
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
        </FormSection>

        {/*
        Image Uploaders
        ------------------------------------------------------------
        */}
        <FormSection name="images">
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
        </FormSection>

        {/*
        Pricing
        ------------------------------------------------------------
        */}
        <FormSection name="pricing">

          <FormSection name="codes">
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

                {pricingCodes.map((pricingCode) => {
                  const pricingCodeName = "D" + pricingCode;

                  return (
                    <div className="row" styleName="pricing-codes__entry" key={pricingCodeName}>
                      <div className="col-sm-6">
                        <div styleName="pricing-codes__entry__code">
                          {pricingCodeName}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <Row>
                          <Field
                            name={pricingCodeName}
                            type="number"
                            component={InputGroup}
                            leftAddon="$"
                            validate={[
                              requiredValidator('Price Code Amount'),
                              minValidator(0)
                            ]}
                          />
                        </Row>
                      </div>
                    </div>
                  );
                })}

              {/* End Pricing Codes Wrapper Column*/}
              </div>
            {/* End Pricing Codes Wrapper Row*/}
            </div>
          </FormSection>

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

            <div className="col-sm-4">
              {recommendedFees.monthly.adult && (
                <p styleName="fees__recommended">
                  Our Recommendation:
                  {' '}
                  <span styleName="fees__recommended__amount">
                    ${recommendedFees.monthly.adult}
                  </span>
                </p>
              )}
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

            <div className="col-sm-4">
              {recommendedFees.monthly.child && (
                <p styleName="fees__recommended">
                  Our Recommendation:
                  {' '}
                  <span styleName="fees__recommended__amount">
                    ${recommendedFees.monthly.child}
                  </span>
                </p>
              )}
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
                  disabled={!yearlyFeeActivated.adult}
                />
              </Row>
            </div>

            <div className="col-sm-4">
              {recommendedFees.yearly.adult && (
                <p styleName="fees__recommended">
                  Our Recommendation:
                  {' '}
                  <span styleName="fees__recommended__amount">
                    ${recommendedFees.yearly.adult}
                  </span>
                </p>
              )}

              <div styleName="fees__activation-checkbox">
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
                  disabled={!yearlyFeeActivated.child}
                />
              </Row>
            </div>

            <div className="col-sm-4">
              {recommendedFees.yearly.child && (
                <p styleName="fees__recommended">
                  Our Recommendation:
                  {' '}
                  <span styleName="fees__recommended__amount">
                    ${recommendedFees.yearly.child}
                  </span>
                </p>
              )}

              <div styleName="fees__activation-checkbox">
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
        </FormSection>

        {/*
        Marketplace Opt In
        ------------------------------------------------------------
        */}
        <FormSection name="marketplace">
          <FormGroup>
            <div className="col-sm-12">
              <ControlLabel>
                Include Office On Our Public Marketplace Listings?
              </ControlLabel>
              <Field
                name="optIn"
                component={Checkbox}
              >
                Yes, please include my office on the Dental HQ Marketplace listing.
              </Field>
            </div>
          </FormGroup>

          <hr styleName="spacer" />
        </FormSection>

        {/*
        Services
        ------------------------------------------------------------
        */}
        <FormSection name="services">
          <ControlLabel>Services Offered:</ControlLabel>

          <p styleName="field-instructions">
            *Specialties are only used in the Public Marketplace to help match new patients to the best dentist for their needs.   You can opt in or out of the Public Marketplace above.
          </p>

          {optedIntoMarketplace && (
            <Row>
              {services.map((service) => {
                const serviceKey = "service-" + service.id;

                return (
                  <div className="col-sm-4" key={serviceKey}>
                    <Field
                      name={serviceKey}
                      component={Checkbox}
                    >
                      <span>{service.name}</span>
                    </Field>
                  </div>
                );
              })}
            </Row>
          )}

          <FormGroup>
            <div className="col-sm-12">
              <ControlLabel>
                Children:
              </ControlLabel>

              <Row>
                <div className="col-sm-4">
                  <Field
                    name="acceptsChildren"
                    component={Checkbox}
                  >
                    Accepts Children
                  </Field>
                </div>
                <div className="col-sm-4">
                  <Row>
                    <Field
                      name="childStartingAge"
                      type="number"
                      component={Input}
                      label="Starting Age"
                      width={12}
                    />
                  </Row>
                </div>
              </Row>

            </div>
          </FormGroup>

          <hr styleName="spacer" />
        </FormSection>

        {/*
        Working Hours
        ------------------------------------------------------------
        */}
        <FormSection name="workingHours">
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

              <FormSection name="monday">
                <Row>
                  <div className="col-sm-4">
                    <Field
                      name="isOpen"
                      component={Checkbox}
                    >
                      <span>Monday</span>
                    </Field>
                  </div>

                  <Field
                    name="startAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToAM={true}
                    disabled={officeClosed.monday}
                  />

                  <Field
                    name="endAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToPM={true}
                    disabled={officeClosed.monday}
                  />
                </Row>
              </FormSection>

              <FormSection name="tuesday">
                <Row>
                  <div className="col-sm-4">
                    <Field
                      name="isOpen"
                      component={Checkbox}
                    >
                      <span>Tuesday</span>
                    </Field>
                  </div>

                  <Field
                    name="startAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToAM={true}
                    disabled={officeClosed.tuesday}
                  />

                  <Field
                    name="endAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToPM={true}
                    disabled={officeClosed.tuesday}
                  />
                </Row>
              </FormSection>

              <FormSection name="wednesday">
                <Row>
                  <div className="col-sm-4">
                    <Field
                      name="isOpen"
                      component={Checkbox}
                    >
                      <span>Wednesday</span>
                    </Field>
                  </div>

                  <Field
                    name="startAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToAM={true}
                    disabled={officeClosed.wednesday}
                  />

                  <Field
                    name="endAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToPM={true}
                    disabled={officeClosed.wednesday}
                  />
                </Row>
              </FormSection>

              <FormSection name="thursday">
                <Row>
                  <div className="col-sm-4">
                    <Field
                      name="isOpen"
                      component={Checkbox}
                    >
                      <span>Thursday</span>
                    </Field>
                  </div>

                  <Field
                    name="startAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToAM={true}
                    disabled={officeClosed.thursday}
                  />

                  <Field
                    name="endAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToPM={true}
                    disabled={officeClosed.thursday}
                  />
                </Row>
              </FormSection>

              <FormSection name="friday">
                <Row>
                  <div className="col-sm-4">
                    <Field
                      name="isOpen"
                      component={Checkbox}
                    >
                      <span>Friday</span>
                    </Field>
                  </div>

                  <Field
                    name="startAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToAM={true}
                    disabled={officeClosed.friday}
                  />

                  <Field
                    name="endAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToPM={true}
                    disabled={officeClosed.friday}
                  />
                </Row>
              </FormSection>

              <FormSection name="saturday">
                <Row>
                  <div className="col-sm-4">
                    <Field
                      name="isOpen"
                      component={Checkbox}
                    >
                      <span>Saturday</span>
                    </Field>
                  </div>

                  <Field
                    name="startAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToAM={true}
                    disabled={officeClosed.saturday}
                  />

                  <Field
                    name="endAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToPM={true}
                    disabled={officeClosed.saturday}
                  />
                </Row>
              </FormSection>

              <FormSection name="sunday">
                <Row>
                  <div className="col-sm-4">
                    <Field
                      name="isOpen"
                      component={Checkbox}
                    >
                      <span>Sunday</span>
                    </Field>
                  </div>

                  <Field
                    name="startAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToAM={true}
                    disabled={officeClosed.sunday}
                  />

                  <Field
                    name="endAt"
                    component={InputTime}
                    className="col-sm-4"
                    defaultToPM={true}
                    disabled={officeClosed.sunday}
                  />
                </Row>
              </FormSection>

            </div>
          )}

          <hr styleName="spacer" />
        </FormSection>

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
