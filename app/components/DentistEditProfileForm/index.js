/*
Dentist Edit Profile Form Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Row from 'react-bootstrap/lib/Row';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import CSSModules from 'react-css-modules';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
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
import DropzoneDisplay from 'components/DropzoneDisplay';
import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import InputTime from 'components/InputTime';
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import dentistEditProfileFormValidator from './validator';

/*
Field Validators
------------------------------------------------------------
*/
const priceCodeRequiredValidator = (value) => {
  return value !== undefined
    ? undefined // all good
    : 'Please enter a Price Code Amount.';
}

const priceCodeMinValidator = (value) => {
  value = parseFloat(value);
  return isFinite(value) === true && value > 0
    ? undefined // all good
    : 'Please enter an amount above $0.00.';
}

/*
Redux
------------------------------------------------------------
*/
const valueSelector = formValueSelector('dentist-edit-profile');

const mapStateToProps = (state) => {
  const {
    pricing,
    workingHours,
  } = valueSelector(state, 'pricing', 'workingHours');

  // precondition: Redux-form hasn't initialized yet.  Note that the
  // `intitialValues` prop is also unavailable, so just provide a sane guess
  // while the page loads.
  if ( pricing === undefined
    && workingHours === undefined
  ) {
    return {
      // pricing
      yearlyFeeActivated: {
        adult: false,
        child: false,
      },

      recommendedFees: {
        monthly: {
          adult: null,
          child: null,
        },
        yearly: {
          adult: null,
          child: null,
        },
      },

      // working hours
      officeClosed: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true,
        sunday: true,
      }
    };
}

  const recommendedFees = {
    monthly: {
      adult: null,
      child: null,
    },

    yearly: {
      adult: null,
      child: null,
    },
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

    if ( isNaN(D0120) === false && isNaN(D0140) === false && isNaN(D0220) === false
      && isNaN(D0274) === false && isNaN(D0330) === false && isNaN(D1110) === false
    ) {
      const adultBaseFee = (D0120 * 2) + D0140 + D0220 + D0274 + (D0330 * 0.3) + (D1110 * 2);

      recommendedFees.monthly.adult = adultBaseFee * 0.75 / 12;
      recommendedFees.yearly.adult = adultBaseFee * 0.7;

      if (recommendedFees.monthly.adult < 19.99) {
        recommendedFees.monthly.adult = 19.99;
      }

      recommendedFees.monthly.adult = recommendedFees.monthly.adult.toFixed(2);
      recommendedFees.yearly.adult = recommendedFees.yearly.adult.toFixed(2);
    }

    if ( isNaN(D0120) === false && isNaN(D0140) === false && isNaN(D0220) === false
      && isNaN(D0272) === false && isNaN(D0330) === false && isNaN(D1120) === false
      && isNaN(D1206) === false
    ) {
      const childBaseFee = (D0120 * 2) + D0140 + D0220 + D0272 + (D0330 * 0.3) + (D1120 * 2) + D1206;

      recommendedFees.monthly.child = childBaseFee * 0.7 / 12;
      recommendedFees.yearly.child = childBaseFee * 0.65;

      if (recommendedFees.monthly.child < 14.99) {
        recommendedFees.monthly.child = 14.99;
      }

      recommendedFees.monthly.child = recommendedFees.monthly.child.toFixed(2);
      recommendedFees.yearly.child = recommendedFees.yearly.child.toFixed(2);
    }
  }

  const imageLocations = {
    logo: null,
    avatar: null,
    office: [],
  };

  return {
    // pricing
    yearlyFeeActivated: {
      adult: pricing.adultYearlyFeeActivated === true,
      child: pricing.childYearlyFeeActivated === true,
    },

    recommendedFees,

    // working hours
    officeClosed: {
      monday:    workingHours.monday === undefined || workingHours.monday.isOpen === false,
      tuesday:   workingHours.tuesday === undefined || workingHours.tuesday.isOpen === false,
      wednesday: workingHours.wednesday === undefined || workingHours.wednesday.isOpen === false,
      thursday:  workingHours.thursday === undefined || workingHours.thursday.isOpen === false,
      friday:    workingHours.friday === undefined || workingHours.friday.isOpen === false,
      saturday:  workingHours.saturday === undefined || workingHours.saturday.isOpen === false,
      sunday:    workingHours.sunday === undefined || workingHours.sunday.isOpen === false,
    }
  };
};


/*
Edit Profile Form
================================================================================
*/
@connect(mapStateToProps, null)
@reduxForm({
  form: 'dentist-edit-profile',
  validate: dentistEditProfileFormValidator,
})
@CSSModules(styles)
class DentistEditProfileForm extends React.Component {

  static propTypes = {
    // passed in - state
    initialValues: React.PropTypes.object.isRequired,
    dentistSpecialties: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })).isRequired,

    /*
    pricingCodes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,

    services: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })).isRequired,
    */

    // passed in - events
    onImageUpload: React.PropTypes.func.isRequired,

    // mapped - state
    officeClosed: React.PropTypes.object.isRequired,
    recommendedFees: React.PropTypes.object.isRequired,
    yearlyFeeActivated: React.PropTypes.object.isRequired,

    // redux form
    change: React.PropTypes.func.isRequired,
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  /*
  Actions
  ------------------------------------------------------------
  */
  setOfficeLogo = (info) => {
    this.props.change('officeInfo.logo', info.fileUrl);
  }

  setProfilePicture = (info) => {
    this.props.change('user.avatar', info.fileUrl);
  }

  // NOTE: You can't bind functions in render in highly rendered components
  //       (like redux-forms).  For every normal render, it creates a new
  //       function which is not equal to the old one, forcing a re-render.
  //
  //       See https://github.com/erikras/redux-form/issues/1609
  setOfficeImage0 = (info) => {
    this.props.change('officeInfo.officeImages0', info.fileUrl);
  }

  setOfficeImage1 = (info) => {
    this.props.change('officeInfo.officeImages1', info.fileUrl);
  }

  setOfficeImage2 = (info) => {
    this.props.change('officeInfo.officeImages2', info.fileUrl);
  }

  getInput(props) {
    return new Input(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  getInputGroup(props) {
    return new InputGroup(props);
  }

  getCheckbox(props) {
    return new Checkbox(props);
  }

  getInputTime(props) {
    return new InputTime(props);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // passed in - state
      initialValues,
      dentistSpecialties,
//      pricingCodes,
//      services,


      // mapped - state
      officeClosed,
      recommendedFees,
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
              <ControlLabel>Contact Name:</ControlLabel>
            </div>

            <Field
              name="firstName"
              type="text"
              component={this.getInput}
              label="First Name"
              width={4}
            />

            <Field
              name="middleName"
              type="text"
              component={this.getInput}
              label="Middle Name (optional)"
              width={4}
            />

            <Field
              name="lastName"
              type="text"
              component={this.getInput}
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
              component={this.getLabeledInput}
              label="Contact Phone Number"
              placeholder=""
              className="col-sm-6"
            />
          </Row>

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
              component={this.getLabeledInput}
              label="Office Name"
              placeholder=""
              className="col-sm-6"
            />

            <Field
              name="specialtyId"
              type="select"
              label="Specialty"
              component={this.getLabeledInput}
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
              component={this.getLabeledInput}
              label="Office Email Address"
              placeholder=""
              className="col-sm-6"
            />

            <Field
              name="phone"
              type="text"
              mask="(999) 999-9999"
              maskChar=" "
              component={this.getLabeledInput}
              label="Office Phone Number"
              placeholder=""
              className="col-sm-6"
            />
          </Row>

          <Row>
            <Field
              name="url"
              type="text"
              component={this.getLabeledInput}
              label="Website URL"
              placeholder="https://mydentistrysite.com"
              className="col-sm-6"
            />
          </Row>

          <Row>
            <Field
              name="message"
              type="textarea"
              component={this.getLabeledInput}
              label="Profile Message"
              placeholder=""
              className="col-sm-12"
              rows={5}
            />
          </Row>

          <Row>
            <Field
              name="address"
              type="text"
              component={this.getLabeledInput}
              label="Address"
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
              name="zipCode"
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
        </FormSection>

        {/*
        Image Uploaders
        ------------------------------------------------------------
        NOTE: The image uploaders don't need their own `images` <FormSection>,
              because their `onFinish` handlers manually set fields in other
              sections to the S3 url.
        */}
        <div>
          <Row>
            <div className="col-sm-4">
              <FormGroup>
                <div className="col-sm-12">
                  <ControlLabel>Upload Office Logo:</ControlLabel>

                  <DropzoneS3Uploader
                    onFinish={this.setOfficeLogo}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: "image/*",

                      contentDisposition: "auto",
                      uploadRequestHeaders: {
                        'x-amz-acl': 'public-read'
                      },
                    }}
                  >
                    <DropzoneDisplay />
                  </DropzoneS3Uploader>

                </div>
              </FormGroup>
            </div>

            <div className="col-sm-6">
              <FormGroup>
                <div className="col-sm-12">
                  <ControlLabel>Upload Profile Picture:</ControlLabel>

                  <DropzoneS3Uploader
                    onFinish={this.setProfilePicture}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: "image/*",

                      contentDisposition: "auto",
                      uploadRequestHeaders: {
                        'x-amz-acl': 'public-read'
                      },
                    }}
                  >
                    <DropzoneDisplay />
                  </DropzoneS3Uploader>

                </div>
              </FormGroup>
            </div>
          </Row>

          <p styleName="field-instructions">
            *Horizontal logos look better than tall logos.
          </p>

          <FormGroup>
            <div className="col-sm-12">
              <ControlLabel>Upload Office Images:</ControlLabel>

              <Row>
                <div className="col-sm-4">
                  <DropzoneS3Uploader
                    onFinish={this.setOfficeImage0}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: "image/*",

                      contentDisposition: "auto",
                      uploadRequestHeaders: {
                        'x-amz-acl': 'public-read'
                      },
                    }}
                  >
                    <DropzoneDisplay />
                  </DropzoneS3Uploader>
                </div>

                <div className="col-sm-4">
                  <DropzoneS3Uploader
                    onFinish={this.setOfficeImage1}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: "image/*",

                      contentDisposition: "auto",
                      uploadRequestHeaders: {
                        'x-amz-acl': 'public-read'
                      },
                    }}
                  >
                    <DropzoneDisplay />
                  </DropzoneS3Uploader>
                </div>

                <div className="col-sm-4">
                  <DropzoneS3Uploader
                    onFinish={this.setOfficeImage2}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: "image/*",

                      contentDisposition: "auto",
                      uploadRequestHeaders: {
                        'x-amz-acl': 'public-read'
                      },
                    }}
                  >
                    <DropzoneDisplay />
                  </DropzoneS3Uploader>
                </div>
              </Row>

            </div>
          </FormGroup>

          <hr styleName="spacer--after-form-group" />
        </div>

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
                  <div className="col-sm-4">
                    Pricing Codes
                  </div>
                  <div className="col-sm-8">
                    Price
                  </div>
                </div>

                {initialValues.pricing.codes.map((pricingCode, priceCodeName) => {
                  return (
                    <div className="row" styleName="pricing-codes__entry" key={pricingCodeName}>
                      <div className="col-sm-4">
                        <div styleName="pricing-codes__entry__code">
                          {pricingCodeName}
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <Row>
                          <Field
                            name={pricingCodeName}
                            type="number"
                            component={this.getInputGroup}
                            leftAddon="$"
                            validate={[
                              priceCodeRequiredValidator,
                              priceCodeMinValidator,
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
                  component={this.getInputGroup}
                  leftAddon="$"
                  width={8}
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

          <p styleName="field-instructions">
            *The miminum price for an adult monthly membership is $19.99.
          </p>

          <FormGroup>
            <div className="col-sm-8">
              <ControlLabel>Recommended Child Monthly Membership Fee:</ControlLabel>
              <Row>
                <Field
                  name="childMonthlyFee"
                  type="number"
                  component={this.getInputGroup}
                  leftAddon="$"
                  width={8}
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

          <p styleName="field-instructions">
            *The miminum price for an child monthly membership is $14.99.
          </p>

          <FormGroup>
            <div className="col-sm-8">
              <ControlLabel>Recommended Adult Annual Membership Fee:</ControlLabel>
              <Row>
                <Field
                  name="adultYearlyFee"
                  type="number"
                  component={this.getInputGroup}
                  leftAddon="$"
                  width={8}
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
                  component={this.getCheckbox}
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
                  component={this.getInputGroup}
                  leftAddon="$"
                  width={8}
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
                  component={this.getCheckbox}
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
                  component={this.getInputGroup}
                  leftAddon="%"
                  width={8}
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
        Services
        ------------------------------------------------------------
        */}
        <FormSection name="services">
          <ControlLabel>Services Offered:</ControlLabel>

          {/* TODO: Need BE to send dentist services... */}
          {/*
          <Row>
            {services.map((service) => {
              const serviceKey = "service-" + service.id;

              return (
                <div className="col-sm-4" key={serviceKey}>
                  <Field
                    name={serviceKey}
                    component={this.getCheckbox}
                  >
                    <span>{service.name}</span>
                  </Field>
                </div>
              );
            })}
          </Row>
          */}

          <FormGroup>
            <div className="col-sm-12">
              <ControlLabel>
                Children:
              </ControlLabel>

              <Row>
                <div className="col-sm-4">
                  <div styleName="services__accepts-children">
                    <Field
                      name="acceptsChildren"
                      component={this.getCheckbox}
                    >
                      Accepts Children
                    </Field>
                  </div>
                </div>
                <div className="col-sm-4">
                  <Row>
                    <Field
                      name="childStartingAge"
                      type="number"
                      component={this.getInput}
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
                  component={this.getCheckbox}
                >
                  <span>Monday</span>
                </Field>
              </div>

              <Field
                name="startAt"
                component={this.getInputTime}
                className="col-sm-4"
                defaultToAM={true}
                disabled={officeClosed.monday}
              />

              <Field
                name="endAt"
                component={this.getInputTime}
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
                  component={this.getCheckbox}
                >
                  <span>Tuesday</span>
                </Field>
              </div>

              <Field
                name="startAt"
                component={this.getInputTime}
                className="col-sm-4"
                defaultToAM={true}
                disabled={officeClosed.tuesday}
              />

              <Field
                name="endAt"
                component={this.getInputTime}
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
                  component={this.getCheckbox}
                >
                  <span>Wednesday</span>
                </Field>
              </div>

              <Field
                name="startAt"
                component={this.getInputTime}
                className="col-sm-4"
                defaultToAM={true}
                disabled={officeClosed.wednesday}
              />

              <Field
                name="endAt"
                component={this.getInputTime}
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
                  component={this.getCheckbox}
                >
                  <span>Thursday</span>
                </Field>
              </div>

              <Field
                name="startAt"
                component={this.getInputTime}
                className="col-sm-4"
                defaultToAM={true}
                disabled={officeClosed.thursday}
              />

              <Field
                name="endAt"
                component={this.getInputTime}
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
                  component={this.getCheckbox}
                >
                  <span>Friday</span>
                </Field>
              </div>

              <Field
                name="startAt"
                component={this.getInputTime}
                className="col-sm-4"
                defaultToAM={true}
                disabled={officeClosed.friday}
              />

              <Field
                name="endAt"
                component={this.getInputTime}
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
                  component={this.getCheckbox}
                >
                  <span>Saturday</span>
                </Field>
              </div>

              <Field
                name="startAt"
                component={this.getInputTime}
                className="col-sm-4"
                defaultToAM={true}
                disabled={officeClosed.saturday}
              />

              <Field
                name="endAt"
                component={this.getInputTime}
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
                  component={this.getCheckbox}
                >
                  <span>Sunday</span>
                </Field>
              </div>

              <Field
                name="startAt"
                component={this.getInputTime}
                className="col-sm-4"
                defaultToAM={true}
                disabled={officeClosed.sunday}
              />

              <Field
                name="endAt"
                component={this.getInputTime}
                className="col-sm-4"
                defaultToPM={true}
                disabled={officeClosed.sunday}
              />
            </Row>
          </FormSection>

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
                component={this.getCheckbox}
              >
                Yes, please include my office on the DentalHQ Marketplace listing.
              </Field>
            </div>
          </FormGroup>

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
              value="UPDATE MY ACCOUNT &gt;"
              styleName="large-button--secondary"
            />
          </div>
        </FormGroup>
      </form>
    );
  }
}

export default DentistEditProfileForm;
