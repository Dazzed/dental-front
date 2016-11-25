import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import get from 'lodash/get';

import { selectMyDentist } from 'containers/Dashboard/selectors';
import styles from './Offerings.css';

@connect(mapStateToProps, null)
@CSSModules(styles, { allowMultiple: true })
export default class Offerings extends Component {

  static propTypes = {
    myDentist: PropTypes.object,
  };

  render () {
    const { myDentist } = this.props;
    // TODO: better here to use selector!
    let childMonthly = get(myDentist, 'dentistInfo.childMembership.monthly', 0);
    let adultMonthly = get(myDentist, 'dentistInfo.membership.monthly', 0);

    return (
      <div>
        <Row>
          <Col md={12}>
            <div>Adult Membership ${adultMonthly}/month</div>
            <ul>
              <li>2 cleanings/year</li>
              <li>2 exams with necessary xrays/year</li>
              <li>Panorex xray once every 3 years</li>
              <li>1 emergency exam and xray/year</li>
              <li>10% of any needed treatment</li>
            </ul>
            <h4 styleName="savings-dollar">Total Savings/year=$118</h4>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <div>Child Membership ${childMonthly}/month</div>
            <ul>
              <li>2 cleanings/year</li>
              <li>2 exams with necessary xrays/year</li>
              <li>Panorex xray once every 3 years</li>
              <li>1 emergency exam with xray/year</li>
              <li>1 Fluoride treatment/year</li>
              <li>10% off any needed treatment</li>
            </ul>
            <h4 styleName="savings-dollar">Total Savings=$151/year</h4>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    myDentist: selectMyDentist(state),
  };
}
