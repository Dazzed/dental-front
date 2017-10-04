import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  FieldArray,
  reduxForm,
  submit as submitForm
} from 'redux-form';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Select from 'react-select/dist/react-select.min.js';
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';

import styles from './styles.css';
import validate from './validator';
import {
  validatePriceCode,
  validatePrice,
  validateFrequency
} from './customValidators';
import {
  selectTotal,
  selectPriceCodes,
  selectRecommendedFee
} from './selectors';
import LoadingSpinner from 'components/LoadingSpinner';

function mapStateToProps (state) {
  return {
    updatedTotal: selectTotal(state),
    // selectedCodes: selectPriceCodes(state),
    recommendedFee: selectRecommendedFee(state),
    initialValues: {
      codes: [ {} ]
    }
  };
}

@connect(mapStateToProps, null)
@reduxForm({
  form: 'createPlan',
  enableReinitialize: true,
  validate
})
@CSSModules(styles)
export default class CreatePlanForm extends Component {

  componentWillMount () {
    // const priceCodes = this.props.priceCodes
    //   .map(c => ({ label: c.code, value: String(c.id) }));
    // this.state = {
    //   priceCodes
    // };
  }

  getInput (props) {
    return new Input(props);
  }

  getLabeledInput (props) {
    return new LabeledInput(props);
  }

  getAutoSelect (props) {
    const { value, onChange } = props.input;
    return (
      <Select
        {...props}
        value={value}
        onChange={onChange}
      />
    );
  }

  filteredOptionsForSelect = (index) => {
    const { selectedCodes } = this.props;
    const { priceCodes } = this.state;
    // Do not display a price code if it's already selected in another form group.
    const filteredOptions = priceCodes.filter(pc => {
      if (!selectedCodes.map(sc => sc.priceCodeId).includes(pc.value)) {
        return true;
      }

      if (selectedCodes[index].priceCodeId) {
        return true;
      }

      return false;
    });
    return filteredOptions;
  }

  renderCodes = ({ fields }) => {
    const { selectedCodes, change } = this.props;
    return (
      <div>
        {fields.map((code, index) =>
          <Row key={index}>
            <br />
            {/*<Field
              name={`${code}.priceCodeId`}
              component={this.getAutoSelect}
              options={this.filteredOptionsForSelect(index)}
              placeholder="Enter Pricing Code"
              className="col-sm-6 select-field"
              clearable={false}
              validate={validatePriceCode}
              input={{ value: selectedCodes[index].priceCodeId, onChange: c => change(`${code}.priceCodeId`, c.value) }}
            />*/}
            <Field
              name={`${code}.priceCodeName`}
              type="text"
              component={this.getLabeledInput}
              label="Enter Price Code Name"
              placeholder=""
              className="col-sm-6"
              validate={validatePriceCode}
            />
            <Field
              name={`${code}.price`}
              type="number"
              component={this.getLabeledInput}
              label="Enter Price ($)"
              placeholder=""
              className="col-sm-2"
              validate={validatePrice}
            />
            <Field
              name={`${code}.frequency`}
              type="number"
              component={this.getLabeledInput}
              label="Frequency/per year"
              placeholder=""
              className="col-sm-3"
              validate={validateFrequency}
            />
            {index !== 0 &&

              <div className="col-sm-1 remove-plan-icon" onClick={() => fields.remove(index)}>
                <div className="raw-height" />
                <FaTimesCircleO />
              </div>
            }
          </Row>
        )}
        <Row>
          <div className="col-sm-12">
            <input
              type="button"
              className="col-sm-2 col-sm-push-8 button--full-width"
              value="+ ADD CODE"
              onClick={() => fields.push({})}
            />
          </div>
        </Row>
      </div>
    );
  }

  renderRecommendedFee (fee) {
    return (
      <span>
        Recommended Membership Fee <span className="recommended-fee">{fee}</span>$
      </span>
    )
  }

  render () {
    const {
      onSubmit,
      handleSubmit,
      updatedTotal,
      loading,
      valid,
    } = this.props;
    return (
      <div>
        <hr />
        <p styleName="create-plan-header">Create Your Own Plan</p>
        <br />
        <form>
          <Row>
            <Field
              name="planName"
              type="text"
              component={this.getLabeledInput}
              label="Enter Plan Name"
              placeholder=""
              width={6}
              className="col-sm-6"
            />
          </Row>
          <FieldArray name="codes" component={this.renderCodes} />
          <Row>
            <Field
              name="total"
              type="number"
              component={this.getLabeledInput}
              label="Total"
              placeholder=""
              width={6}
              className="col-sm-6"
              input={{ disabled: true, value: updatedTotal }}
            />
          </Row>
          <br />
          <br />
          <Row>
            <Field
              name="fee"
              type="number"
              component={this.getLabeledInput}
              label={this.renderRecommendedFee(this.props.recommendedFee)}
              placeholder=""
              width={10}
              className="col-sm-4"
            />
            <div>
              <p>Once your membership is set, a 30 day notice to your</p>
              <p>current members must be given prior to changing</p>
              <p>their monthly membership fee.</p>
            </div>
          </Row>
          <br />
          <input
            type="button"
            className="modal-control save-plan-btn"
            value="SAVE PLAN"
            onClick={() => handleSubmit()}
            disabled={loading}
          />
          {
            loading &&
              <LoadingSpinner showOnlyIcon={false} />
          }
        </form>
      </div>
    );
  }
}
