// This component handle's the Four default custom plans,
// Which can be saved or ignored by the dentist.

/*
  Trello:
    The dentist should enter the membership price and press
    Save/activate to make the preloaded plans active.
    They need to individually activate the preloaded plans that they want to
    offer their patients.
*/
import React, { Component } from 'react'
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import { connect } from 'react-redux';
import {
  Field,
  FieldArray,
  reduxForm,
  submit as submitForm
} from 'redux-form';
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import LoadingSpinner from 'components/LoadingSpinner';
import {
  validatePriceCode,
  validatePrice,
  validateFrequency
} from '../createPlan/customValidators';
import {
  selectTotal,
  selectRecommendedFee
} from './selectors';

import styles from './styles.css';
import validate from './validator';

function mapStateToProps (state, componentProps) {
  const { plan: { codes } } = componentProps;

  return {
    updatedTotal: selectTotal(state, codes),
    initialValues: {
      codes,
    },
    recommendedFee: selectRecommendedFee(state)
  };
}

@connect(mapStateToProps, null)
@reduxForm({
  form: 'seedPlan',
  enableReinitialize: true,
  validate
})
@CSSModules(styles)
export default class SeedPlanForm extends Component {
  componentWillMount () {
    this.state = {
      didMount: false
    };
  }

  componentDidMount () {
    this.setState({ didMount: true });
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.anyTouched && !nextProps.anyTouched) {
      if (nextProps.recommendedFee && nextProps.recommendedFee !== '') {
        this.props.change('fee', nextProps.recommendedFee);
      }
    }
  }

  getInput (props) {
    return new Input(props);
  }

  getLabeledInput (props) {
    return new LabeledInput(props);
  }

  renderRecommendedFee (fee) {
    return (
      <span>
        Recommended Membership Fee $<span className="recommended-fee">{fee}</span>
      </span>
    )
  }

  renderCodes = ({ fields }) => {
    return (
      <div>
        {fields.map((code, index) =>
          <Row key={index} className="col-sm-12">
            <br />
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

  renderTotalAndPrice = () => {
    return (
      <div>
        <Row>
          <Field
            name="total"
            type="number"
            component={this.getLabeledInput}
            label="Total"
            placeholder=""
            width={6}
            className="col-sm-6 total-field"
            input={{ disabled: true, value: this.props.updatedTotal }}
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
      </div>
    );
  }

  renderSubmitButton = () => {
    const {
      pristine,
      dirty,
      handleSubmit,
      loading
    } = this.props;
    if (!pristine && dirty) {
      return (
        <Row>
          <div className="col-sm-12">
            <input
              type="button"
              className="modal-control save-plan-btn col-sm-2 col-sm-push-8"
              value="ACTIVATE PLAN"
              onClick={() => handleSubmit()}
              disabled={loading}
            />
          </div>
          {
            loading &&
              <LoadingSpinner showOnlyIcon={false} />
          }
        </Row>
      );
    }
    return '';
  }

  render () {
    const { didMount } = this.state;
    if (didMount) {
      const submitButton = this.renderSubmitButton();
      const totalAndPrice = this.renderTotalAndPrice();
      return (
        <div>
          <FieldArray name="codes" component={this.renderCodes} />
          {totalAndPrice}
          <br />
          {submitButton}
        </div>
      );
    }
    return <LoadingSpinner showOnlyIcon={false} />;
  }
}
