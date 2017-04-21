/*
Date Picker
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import DatePicker from 'react-datepicker';

// lib styles
import 'react-datepicker/dist/react-datepicker.css';

// local
import './styles.css';

// NOTE: This component does not use CSS-Modules- it is just importing the
//       styles that it needs.  Read the CSS-Modules / Redux-Form-Comopnent
//       warning in /app/assets/styles/_bootstrap-overrides.css to find out
//       more.


/*
Date Picker
================================================================================
*/
export default class renderDatePicker extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    meta: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  render () {
    const {
      input,
      label,
      className,
      meta: { touched, error }
    } = this.props;

    return (
      <div className={className || 'col-md-12'}>
        <FormGroup className={touched && error ? 'has-error' : ''}>
          <Col sm={12}>
            <ControlLabel>{label}:</ControlLabel>
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
  }
}
