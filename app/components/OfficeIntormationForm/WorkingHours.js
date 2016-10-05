import React from 'react';

import Well from 'react-bootstrap/lib/Well';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Input from 'components/Input';

import {
  selectDentistInfo,
} from 'containers/EditOfficeInformation/selectors';

import {
  AM_HOURS,
  PM_HOURS,
} from 'containers/EditOfficeInformation/constants';

import styles from './styles.css';


function toBoolean (value) {
  return value === 'true';
}


function mapStateToProps (state) {
  return {
    data: selectDentistInfo(state),
  };
}


@connect(mapStateToProps)
@reduxForm({ form: 'office-information' })
export default class WorkingHours extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    const { data } = this.props;

    return (
      <Well>
        <h2>Hour Details</h2>

        <br />

        <Row>
          <Col md={1} mdOffset={3}>
            Close
          </Col>
          <Col md={1}>
            Open
          </Col>
          <Col md={5}>
            Hours
          </Col>
        </Row>

        {data.workingHours && data.workingHours.map((item, index) =>
          <Row key={index} className={styles['member-item']}>
            <Col md={3} className={styles['title-case']}>
              {item.day}
            </Col>

            <Col md={1}>
              <Row>
                <Field
                  name={`workingHours[${index}].isOpen`}
                  component="input"
                  type="radio"
                  value={false}
                  className={styles.radio}
                  normalize={toBoolean}
                />
              </Row>
            </Col>

            <Col md={1}>
              <Row>
                <Field
                  name={`workingHours[${index}].isOpen`}
                  component="input"
                  type="radio"
                  className={styles.radio}
                  normalize={toBoolean}
                  value
                />
              </Row>
            </Col>

            <Col md={3}>
              <Row>
                <Field
                  name={`workingHours[${index}].startAt`}
                  type="select"
                  label="Open At"
                  component={Input}
                >
                  <option value="">AM</option>
                  {AM_HOURS.map((hour, indexHour) =>
                    (<option value={hour} key={indexHour}>
                      {hour}
                    </option>)
                  )}
                </Field>
              </Row>
            </Col>

            <Col md={3}>
              <Row>
                <Field
                  name={`workingHours[${index}].endAt`}
                  type="select"
                  label="Close At"
                  component={Input}
                >
                  <option value="">PM</option>
                  {PM_HOURS.map((hour, indexHour) =>
                    (<option value={hour} key={indexHour}>
                      {hour}
                    </option>)
                  )}
                </Field>
              </Row>
            </Col>
          </Row>
        )}
      </Well>
    );
  }

}


