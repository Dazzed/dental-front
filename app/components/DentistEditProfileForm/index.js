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
import { isEmpty, sortBy } from 'lodash';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Row from 'react-bootstrap/lib/Row';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import CSSModules from 'react-css-modules';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader-with-remove';
import { connect } from 'react-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import {
  Field,
  FieldArray,
  FormSection,
  formValueSelector,
  reduxForm
} from 'redux-form';
import { bindActionCreators } from 'redux';

// app
import { US_STATES } from 'common/constants';
import Checkbox from 'components/Checkbox';
import DropzoneDisplay from 'components/DropzoneDisplay';
import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import InputTime from 'components/InputTime';
import LabeledInput from 'components/LabeledInput';

// TODO: enable images
// images deletion actions
/*
import {
  deleteOfficeLogo,
  deleteDentistAvatar,
  deleteDentistOfficeImage,
} from 'containers/DentistMembersPage/actions';
*/

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
const mapDispatchToProps = (dispatch) => ({
  toastError: (message) => dispatch(toastrActions.error(message)),
  ...bindActionCreators({

// TODO: enable images
/*
    deleteOfficeLogo,
    deleteDentistAvatar,
    deleteDentistOfficeImage
*/
  }, dispatch)
});
const mapStateToProps = (state) => {
  const {
    pricing,
    workingHours
  } = valueSelector(state, 'pricing', 'workingHours');

  // precondition: Redux-form hasn't initialized yet.  Note that the
  // `intitialValues` prop is also unavailable, so just provide a sane guess
  // while the page loads.
  if (pricing === undefined
    && workingHours === undefined
  ) {
    return {
      // pricing
      feeActivated: {
        monthly: {
          adult: true,
          child: true,
        },
        yearly: {
          adult: true,
          child: true,
        },
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

    if (isNaN(D0120) === false && isNaN(D0140) === false && isNaN(D0220) === false
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

    if (isNaN(D0120) === false && isNaN(D0140) === false && isNaN(D0220) === false
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

// TODO: enable images
/*
  const imageLocations = {
    logo: null,
    avatar: null,
    office: [],
  };
*/

  return {
    // pricing
    feeActivated: {
      monthly: {
        adult: !isEmpty(pricing.adultMonthlyFee),
        child: !isEmpty(pricing.childMonthlyFee),
      },
      yearly: {
        adult: !isEmpty(pricing.adultYearlyFee),
        child: !isEmpty(pricing.childYearlyFee),
      },
    },

    recommendedFees,

    // working hours
    officeClosed: {
      monday: workingHours.monday === undefined || workingHours.monday.isOpen === false,
      tuesday: workingHours.tuesday === undefined || workingHours.tuesday.isOpen === false,
      wednesday: workingHours.wednesday === undefined || workingHours.wednesday.isOpen === false,
      thursday: workingHours.thursday === undefined || workingHours.thursday.isOpen === false,
      friday: workingHours.friday === undefined || workingHours.friday.isOpen === false,
      saturday: workingHours.saturday === undefined || workingHours.saturday.isOpen === false,
      sunday: workingHours.sunday === undefined || workingHours.sunday.isOpen === false,
    }
  };
};

/*
Edit Profile Form
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: 'dentist-edit-profile',
  validate: dentistEditProfileFormValidator,
})
@CSSModules(styles)
class DentistEditProfileForm extends React.Component {
  static propTypes = {
    // passed in - state
    initialValues: React.PropTypes.object.isRequired,
// TODO: enable services
//    allServices: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    dentistSpecialties: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })).isRequired,

    pricingCodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    /*
    services: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })).isRequired,
    */

    // passed in - events
// TODO: enable images
//    onImageUpload: React.PropTypes.func.isRequired,

    // mapped - state
    officeClosed: React.PropTypes.object.isRequired,
    recommendedFees: React.PropTypes.object.isRequired,
    feeActivated: React.PropTypes.object.isRequired,

    // redux form
    change: React.PropTypes.func.isRequired,
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // image deleting funcs.
// TODO: enable images
/*
    deleteOfficeLogo: React.PropTypes.func.isRequired,
    deleteDentistAvatar: React.PropTypes.func.isRequired,
    deleteDentistOfficeImage: React.PropTypes.func.isRequired,
*/
  };

  constructor (props) {
    super(props);
    const { initialValues } = this.props;
    const { id: dentistInfoId } = initialValues.officeInfo;
    const { id: dentistId } = initialValues.user;
    this.state = {
// TODO: enable services
//      currentServices: initialValues.officeInfo.services,
//      serviceList: this.props.allServices,
// TODO: enable images
/*
      officeImage0: initialValues.officeInfo.officeImages0,
      officeImage1: initialValues.officeInfo.officeImages1,
      officeImage2: initialValues.officeInfo.officeImages2,
      officeLogoUrl: initialValues.officeInfo.logo,
      officeAvatarUrl: initialValues.user.avatar,
*/
      dentistId,
      dentistInfoId
    };
  }
// TODO: enable images
//  acceptedFormats = 'image/jpg,image/jpeg,image/png,image/gif';

  /*
  Actions
  ------------------------------------------------------------
  */

// TODO: enable images
/*
  setOfficeLogo = (info) => {
    this.setState({ officeLogoUrl: info.fileUrl });
    this.props.change('officeInfo.logo', info.fileUrl);
  }

  removeOfficeLogo = () => {
    this.setState({ officeLogoUrl: null });
    this.props.change('officeInfo.logo', null);
    const { dentistId, dentistInfoId } = this.state;
    this.props.deleteOfficeLogo(dentistId, dentistInfoId);
  }

  setProfilePicture = (info) => {
    this.setState({ officeAvatarUrl: info.fileUrl });
    this.props.change('user.avatar', info.fileUrl);
  }

  removeProfilePicture = () => {
    this.setState({ officeAvatarUrl: null });
    this.props.change('user.avatar', null);
    const { dentistId } = this.state;
    this.props.deleteDentistAvatar(dentistId);
  }

  // NOTE: You can't bind functions in render in highly rendered components
  //       (like redux-forms).  For every normal render, it creates a new
  //       function which is not equal to the old one, forcing a re-render.
  //
  //       See https://github.com/erikras/redux-form/issues/1609
  setOfficeImage0 = (info) => {
    this.setState({ officeImages0: {url: info.fileUrl} });
    this.props.change('officeInfo.officeImages0', { url: info.fileUrl });
  }

  removeOfficeImage0 = () => {
    this.setState({ officeImages0: null });
    this.props.change('officeInfo.officeImages0', null);
    const { dentistId, dentistInfoId, officeImage0 } = this.state;
    if ('id' in officeImage0) {
      this.props.deleteDentistOfficeImage(dentistId, dentistInfoId, officeImage0.id);
    }
  }

  setOfficeImage1 = (info) => {
    this.setState({ officeImages1: {url: info.fileUrl} });
    this.props.change('officeInfo.officeImages1', { url: info.fileUrl });
  }

  removeOfficeImage1 = () => {
    this.setState({ officeImages1: null });
    this.props.change('officeInfo.officeImages1', null);
    const { dentistId, dentistInfoId, officeImage1 } = this.state;
    if ('id' in officeImage1) {
      this.props.deleteDentistOfficeImage(dentistId, dentistInfoId, officeImage1.id);
    }
  }

  setOfficeImage2 = (info) => {
    this.setState({ officeImages2: {url: info.fileUrl} });
    this.props.change('officeInfo.officeImages2', { url: info.fileUrl });
  }

  removeOfficeImage2 = () => {
    this.setState({ officeImages2: null });
    this.props.change('officeInfo.officeImages2', null);
    const { dentistId, dentistInfoId, officeImage2 } = this.state;
    if ('id' in officeImage2) {
      this.props.deleteDentistOfficeImage(dentistId, dentistInfoId, officeImage2.id);
    }
  }
*/

// TODO: enable services
/*
  setServices = (info) => {
    const serviceId = Number.parseInt(info.target.name.split(".")[1]);

    const allServices = this.state.serviceList;
    const serviceInfo = allServices.find(service => service.id === serviceId);
    serviceInfo.enabled = info.target.checked;
    if (info.target.checked) {
      if (!this.state.currentServices.find(service => service.id === serviceId)) {
        // Turning on the value.
        const { currentServices } = this.state;
        currentServices.push({
          id: serviceId,
          name: serviceInfo.name
        });
        this.setState({ currentServices },
          () => this.props.change('officeInfo.services', currentServices));
      }
    } else {
      // Turning off the value.
      const { currentServices } = this.state;
      this.setState({ currentServices: currentServices.filter(service => service.id !== serviceId) },
        () => this.props.change('officeInfo.services', currentServices.filter(service => service.id !== serviceId)));
      // this.state.currentServices = this.state.currentServices.filter(service => service.id !== serviceId);
    }
    // this.forceUpdate();
  }
  */

// TODO: enable membership activation / deactivation
/*
  setAdultMonthlyMembership = (info) => {
    this.setState({ adultMonthlyFeeActivated: info.target.checked, adultMonthlyFeeChecked: true });
  }

  setChildMonthlyMembership = (info) => {
    this.setState({ childMonthlyFeeActivated: info.target.checked, adultMonthlyFeeChecked: true });
  }

  setAdultAnnualMembership = (info) => {
    this.setState({ adultYearlyFeeActivated: info.target.checked, adultYearlyFeeChecked: true });
  }

  setChildAnnualMembership = (info) => {
    this.setState({ childYearlyFeeActivated: info.target.checked, childYearlyFeeChecked: true });
  }
*/

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

// TODO: enable images
/*
  onUploadStart = (file, next) => {
    const { toastError } = this.props;
    if (!/image\/png|image\/jpg|image\/jpeg|image\/gif/.test(file.type)) {
      toastError(`File format not supported ${file.type}.\nPlease upload JPEG, PNG or GIF images.`);
    } else {
      next(file);
    }
  };

  getS3FilenameFromURL(url) {
    if (url) {
      const pieces = url.split('amazonaws.com/');
      if (pieces.length === 2) {
        return pieces[1];
      }
    }
    return '';
  }
*/

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // passed in - state
      initialValues,
      dentistSpecialties,
      pricing,
// TODO: enable services
//      allServices,

      pricingCodes,
      //      services,


      // mapped - state
      officeClosed,
      recommendedFees,
      feeActivated,

      // redux form
      error,
      handleSubmit,
      submitting
    } = this.props;

    // const adultYearlyFeeActivated = this.state.adultYearlyFeeChecked ? this.state.adultYearlyFeeActivated : !!this.props.initialValues.pricing.adultYearlyFee;
    // const childYearlyFeeActivated = this.state.childYearlyFeeChecked ? this.state.childYearlyFeeActivated : !!this.props.initialValues.pricing.childYearlyFee;

    // For now, it's not possible to deactivate a membership.
// TODO: enable membership activation / deactivation
/*
    const adultMonthlyFeeActivated = !!this.props.initialValues.pricing.adultMonthlyFee;
    const childMonthlyFeeActivated = !!this.props.initialValues.pricing.childMonthlyFee;
    const adultYearlyFeeActivated = !!this.props.initialValues.pricing.adultYearlyFee;
    const childYearlyFeeActivated = !!this.props.initialValues.pricing.childYearlyFee;
*/

// TODO: enable images
/*
    // Get office logo and profile picture names.
    const logoFilename = this.getS3FilenameFromURL(this.state.officeLogoUrl);
    const avatarFilename = this.getS3FilenameFromURL(this.state.officeAvatarUrl);

    const officePicUrl0 = this.state.officeImage0 ? this.state.officeImage0.url : '';
    const officePicUrl1 = this.state.officeImage1 ? this.state.officeImage1.url : '';
    const officePicUrl2 = this.state.officeImage2 ? this.state.officeImage2.url : '';

    const office0Filename = this.getS3FilenameFromURL(officePicUrl0);
    const office1Filename = this.getS3FilenameFromURL(officePicUrl1);
    const office2Filename = this.getS3FilenameFromURL(officePicUrl2);
*/

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
            <Field
              name="dentistSpecialtyId"
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
              label="Website URL (http://)"
              placeholder="e.g mydentistrysite.com"
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

        TODO: enable images
        */}
        {/*
        <div>
          <Row>
            <div className="col-sm-4">
              <FormGroup>
                <div className="col-sm-12">
                  <ControlLabel>Upload Office Logo:</ControlLabel>

                  <DropzoneS3Uploader
                    onFinish={this.setOfficeLogo}
                    onRemove={this.removeOfficeLogo}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    filename={logoFilename}
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: this.acceptedFormats,
                      preprocess: this.onUploadStart,
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
                    onRemove={this.removeProfilePicture}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    filename={avatarFilename}
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: this.acceptedFormats,
                      preprocess: this.onUploadStart,
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
          <p styleName="field-instructions">
            *Supported image formats are <em>JPEG</em>, <em>PNG</em> and <em>GIF</em>.
          </p>

          <FormGroup>
            <div className="col-sm-12">
              <ControlLabel>Upload Office Images:</ControlLabel>

              <Row>
                <div className="col-sm-4">
                  <DropzoneS3Uploader
                    onFinish={this.setOfficeImage0}
                    onRemove={this.removeOfficeImage0}
                    filename={office0Filename}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: this.acceptedFormats,
                      preprocess: this.onUploadStart,
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
                    onRemove={this.removeOfficeImage1}
                    filename={office1Filename}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: this.acceptedFormats,
                      preprocess: this.onUploadStart,
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
                    onRemove={this.removeOfficeImage2}
                    filename={office2Filename}
                    s3Url='https://dentalman_uploads.s3.amazonaws.com'
                    upload={{
                      signingUrl: "/s3/sign",
                      signingUrlMethod: "GET",
                      accept: this.acceptedFormats,
                      preprocess: this.onUploadStart,
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
        */}

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

                {sortBy(pricingCodes, 'code').map((pricingCode) => {
                  const pricingCodeName = "D" + pricingCode.code;

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
              *Once your membership is set, existing members will be notified and given 90 days prior to any changes in their membership pricing.
            </p>
          </div>

          <FormSection name="adultMonthlyFee">
            <FormGroup>
              <div className="col-sm-8">
                <ControlLabel>Recommended Adult Monthly Membership Fee:</ControlLabel>            
                <Row>
                  <Field
                    name="price"
                    type="number"
                    component={this.getInputGroup}
                    leftAddon="$"
                    width={8}
                    disabled={!feeActivated.monthly.adult}
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

{/* TODO: enable membership activation / deactivation */}
{/*
                <div styleName="fees__activation-checkbox">
                  <Field
                    name="adultMonthlyFeeActivated"
                    component={this.getCheckbox}
                    adultYearlyFeeActivated={feeActivated.monthly.adult}
                    onChange={this.setAdultMonthlyMembership}
                  >
                    Activate this offer.
                  </Field>
                </div>
*/}
              </div>
            </FormGroup>
          </FormSection>

          <p styleName="field-instructions">
            *The miminum price for an adult monthly membership is $19.99.
          </p>
          <FormSection name="childMonthlyFee">
            <FormGroup>
              <div className="col-sm-8">
                <ControlLabel>Recommended Child Monthly Membership Fee:</ControlLabel>
                <Row>
                  <Field
                    name="price"
                    type="number"
                    component={this.getInputGroup}
                    leftAddon="$"
                    width={8}
                    disabled={!feeActivated.monthly.child}
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

{/* TODO: enable membership activation / deactivation */}
{/*
                <div styleName="fees__activation-checkbox">
                  <Field
                    name="childMonthlyFeeActivated"
                    component={this.getCheckbox}
                    adultYearlyFeeActivated={feeActivated.monthly.child}
                    onChange={this.setChildMonthlyMembership}
                  >
                    Activate this offer.
                  </Field>
                </div>
*/}
              </div>
            </FormGroup>
          </FormSection>

          <p styleName="field-instructions">
            *The miminum price for an child monthly membership is $14.99.
          </p>

          <FormSection name="adultYearlyFee">
            <FormGroup>
              <div className="col-sm-8">
                <ControlLabel>Recommended Adult Annual Membership Fee:</ControlLabel>
                <Row>
                  <Field
                    name="price"
                    type="number"
                    component={this.getInputGroup}
                    leftAddon="$"
                    width={8}
                    disabled={!feeActivated.yearly.adult}
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

{/* TODO: enable membership activation / deactivation */}
{/*
                <div styleName="fees__activation-checkbox">
                  <Field
                    name="adultYearlyFeeActivated"
                    component={this.getCheckbox}
                    adultYearlyFeeActivated={feeActivated.yearly.adult}
                    onChange={this.setAdultAnnualMembership}
                  >
                    Activate this offer.
                  </Field>
                </div>
*/}
              </div>
            </FormGroup>
          </FormSection>

          <FormSection name="childYearlyFee">
            <FormGroup>
              <div className="col-sm-8">
                <ControlLabel>Recommended Child Annual Membership Fee:</ControlLabel>
                <Row>
                  <Field
                    name="price"
                    type="number"
                    component={this.getInputGroup}
                    leftAddon="$"
                    width={8}
                    disabled={!feeActivated.yearly.child}
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

{/* TODO: enable membership activation / deactivation */}
{/*
                <div styleName="fees__activation-checkbox">
                  <Field
                    name="childYearlyFeeActivated"
                    childYearlyFeeActivated={feeActivated.yearly.child}
                    component={this.getCheckbox}
                    onChange={this.setChildAnnualMembership}
                  >
                    Activate this offer.
                  </Field>
                </div>
*/}
              </div>
            </FormGroup>
          </FormSection>

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
        TODO: enable services
        */}
        {/*
        <FormSection name="services">
          <ControlLabel>Services Offered:</ControlLabel>


          <Row>
            {allServices.map((service, index) => {

              return (
                <div className="col-sm-4" key={index}>
                  <Field
                    name={`${service.id}`}
                    component={this.getCheckbox}
                    props={ {serviceEnabled: service.enabled }}
                    onChange={this.setServices}
                  >
                    <span>{service.name}</span>
                  </Field>
                </div>
              );
            })}
          </Row>

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
        */}

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
