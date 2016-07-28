import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import lodash from 'lodash';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import { change } from 'redux-form';


const MIN_YEAR = 1926;
const MAX_YEAR = 2016;
const YEARS = lodash.range(MIN_YEAR, MAX_YEAR);


function getMonthDays(year, month) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // If evenly divisible by 4 and not evenly divisible by 100,
  // or is evenly divisible by 400, then a leap year
  if ( (!(year % 4) && year % 100) || !(year % 400)) {
    daysInMonth[1] = 29;
  }

  return lodash.range(1, daysInMonth[month - 1] || 1);
}


function isValidDate(year, month, day) {
  // Assume not leap year by default (note zero index for Jan)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // If evenly divisible by 4 and not evenly divisible by 100,
  // or is evenly divisible by 400, then a leap year
  if ( (!(year % 4) && year % 100) || !(year % 400)) {
    daysInMonth[1] = 29;
  }

  return day > 0 && day <= daysInMonth[month - 1] && year >= MIN_YEAR;
}


const mapDispatchToProps = (dispatch) => ({
  update: (form, field, data) => {
    const action = change(form, field, data);
    dispatch(action);
  },
});


@connect(() => ({}), mapDispatchToProps)
export default class DatePicker extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    update: React.PropTypes.func.isRequired,
    form: React.PropTypes.string.isRequired,
  };

  constructor(props, context, updater) {
    super(props, context, updater);

    this.state = {
      day: 0,
      month: 0,
      year: 0,
    };
  }

  handleChange = (event) => {
    const field = event.target.name.split('-')[0];
    const nextState = {
      ...this.state,
      [field]: event.target.value,
    };

    this.setState(nextState);

    // if valid date fire change event
    if (isValidDate(nextState.year, nextState.month, nextState.day)) {
      const date = `${nextState.month}/${nextState.day}/${nextState.year}`;
      this.props.update(this.props.form, this.props.name, date);
    } else {
      this.props.update(this.props.form, this.props.name, '');
    }
  }

  render() {
    const { name } = this.props;
    const { month, year } = this.state;
    const days = getMonthDays(year, month);

    return (
      <Row>
        <Col md={4}>
          <FormControl
            name={`month-${name}`}
            onChange={this.handleChange}
            componentClass="select"
          >
            <option value="0">Month</option>
            {moment.months().map((_month, index) =>
            <option value={index + 1} key={index}>{_month}</option>
            )}
          </FormControl>
        </Col>
        <Col md={4}>
          <FormControl
            name={`day-${name}`}
            onChange={this.handleChange}
            componentClass="select"
          >
            <option value="0">Day</option>
            {days.map((value) =>
            <option value={value} key={value}>{value}</option>
            )}
          </FormControl>
        </Col>
        <Col md={4}>
          <FormControl
            name={`year-${name}`}
            onChange={this.handleChange}
            componentClass="select"
          >
            <option value="0">Year</option>
            {YEARS.map((value) =>
            <option value={value} key={value}>{value}</option>
            )}
          </FormControl>
        </Col>
      </Row>
    );
  }
}
