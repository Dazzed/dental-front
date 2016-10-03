import React from 'react';

import Well from 'react-bootstrap/lib/Well';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Input from 'components/Input';

import {
  selectDentistInfo,
} from 'containers/EditOfficeInformation/selectors';

import styles from './styles.css';


function mapStateToProps (state) {
  return {
    data: selectDentistInfo(state),
  };
}


function DUCheckedComponent ({ input, id }) {
  return (
    <Checkbox
      {...input}
      className="pull-right"
      id={id}
      checked={input.value}
    />
  );
}


DUCheckedComponent.propTypes = {
  input: React.PropTypes.object,
  id: React.PropTypes.string,
};


@connect(mapStateToProps)
@reduxForm({ form: 'office-information' })
export default class Membership extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    const { data } = this.props;

    return (
      <Well>
        <h2>Membership pricing/affordability</h2>

        <br />

        <Row>
          <Col md={5}>
            Pricing Codes
          </Col>
          <Col md={3}>
            Price
          </Col>
        </Row>

        {data.membership && data.membership.items.map((item, index) =>
          <Row key={index} className={styles['member-item']}>
            <Col md={5}>
              <Row>
                <Field
                  name={`membership.items[${index}].pricingCode`}
                  type="text"
                  component={Input}
                  label="Pricing code"
                  disabled
                />
              </Row>
            </Col>

            <Col md={3}>
              <Row>
                <Field
                  name={`membership.items[${index}].price`}
                  type="number"
                  component={Input}
                  label="Price"
                />
              </Row>
            </Col>
          </Row>
        )}

        <br />

        <Row>
          <Col md={3}>
            <Field
              name="membership.recommendedFee"
              component={DUCheckedComponent}
              id="recommended-fee"
            />
          </Col>
          <Col md={8} className={styles['recommended-fee']}>
            <label htmlFor="recommended-fee">
              Recommended membership fee
            </label>
            <p>
              Once your membership fee is set, a 90 day notice to your
              current members must be given prior to changing their monthly
              membership fee.
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <Row>
              <Field
                name="membership.activationCode"
                component={Input}
                label="Activation Code"
                type="text"
              />
            </Row>
          </Col>
          <Col md={8}>
            <label htmlFor="activationCode">
              Enter their activation fee
            </label>
            <p>
              The activation fee should be what cost on the top of the first
              months membership fee that you need to receive to cover the
              OVERHEAD of that first new patient appointment. This protects
              your bottom line from patients ending their membership after
              only one month of payments.
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <Row>
              <Field
                name="membership.discount"
                component={Input}
                label="Enter discount code"
                type="number"
              />
            </Row>
          </Col>
          <Col md={8}>
            <label htmlFor="discount">
              Treatment discount percent
            </label>
            <p>
              this is the treatment discount that your office will be
              offering the members of your practice.
            </p>
          </Col>
        </Row>
      </Well>
    );
  }
}

