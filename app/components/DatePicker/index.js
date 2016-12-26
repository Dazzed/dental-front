import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const renderDatePicker = ({
  input, label, className, meta: { touched, error }
}) => (
  <div className={className || 'col-md-12'}>
    <FormGroup className={touched && error ? 'has-error' : ''}>
      <Col sm={12}>
        <ControlLabel>{label}</ControlLabel>
      </Col>
      <Col sm={12}>
        <DatePicker
          {...input}
          isClearable
          dateForm="MM/DD/YYYY"
          selected={input.value ? moment(input.value) : null}
          className="form-control"
          placeholderText="MM/DD/YYYY"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </Col>
    </FormGroup>
  </div>
);

renderDatePicker.propTypes = {
  input: React.PropTypes.object.isRequired,
  meta: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default renderDatePicker;
