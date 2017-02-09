/*
Segmented Date Picker Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

// app
import {
  DAYS, MONTHS, YEARS
} from 'common/constants';

// local
import './styles.css';


/*
Segmented Date Picker
================================================================================
*/
class SegmentedDatePicker extends React.Component {

  static propTypes = {
    input: React.PropTypes.object.isRequired,
    meta: React.PropTypes.object,
    label: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  constructor (props) {
    super(props);

    let dateComponents = {
      day: null,
      month: null,
      year: null
    };

    if (this.props.input.value) {
      const date = moment(this.props.input.value);

      dateComponents = {
        day: date.format("D"),
        month: date.format("M"),
        year: date.format("YYYY"),
      };
    }

    this.state = {
      dateComponents
    };
  }

  onAnyChange = (dateComponents) => {
    this.setState({
      dateComponents
    });

    if ( dateComponents.day !== null
      && dateComponents.month !== null
      && dateComponents.year !== null
    ) {
      const dateString = dateComponents.month
                       + "/" + dateComponents.day
                       + "/" + dateComponents.year;
      const date = moment(dateString, "M/D/YYYY");
      this.props.input.onChange(date.toISOString());
    }
  }

  onDayChange = (evt) => {
    let { dateComponents } = this.state;
    dateComponents.day = evt.target.value;

    this.onAnyChange(dateComponents);
  }

  onMonthChange = (evt) => {
    let { dateComponents } = this.state;
    dateComponents.month = evt.target.value;

    this.onAnyChange(dateComponents);
  }

  onYearChange = (evt) => {
    let { dateComponents } = this.state;
    dateComponents.year = evt.target.value;

    this.onAnyChange(dateComponents);
  }

  render () {
    const { input, label, className, meta } = this.props;

    const rootClassName = classnames({
      'has-error': meta.touched && meta.error,
    });

    let labelContent = null;
    if (this.props.label) {
      labelContent = (
        <Col sm={12}>
          <ControlLabel>{label}:</ControlLabel>
        </Col>
      );
    }

    return (
      <div className={className || 'col-sm-12'}>
        <FormGroup className={rootClassName}>
          {labelContent}

          <Col sm={4}>
            <FormControl
              onChange={this.onMonthChange}
              componentClass="select"
              selected={this.state.dateComponents.month}
            >
              <option value="">Month</option>
              {Object.keys(MONTHS).map(key => 
                <option value={key} key={key}>
                  {MONTHS[key]}
                </option>
              )}
            </FormControl>
          </Col>

          <Col sm={4}>
            <FormControl
              onChange={this.onDayChange}
              componentClass="select"
              selected={this.state.dateComponents.day}
            >
              <option value="">Day</option>
              {Object.keys(DAYS).map(key => 
                <option value={key} key={key}>
                  {DAYS[key]}
                </option>
              )}
            </FormControl>
          </Col>

          <Col sm={4}>
            <FormControl
              onChange={this.onYearChange}
              componentClass="select"
              selected={this.state.dateComponents.year}
            >
              <option value="">Year</option>
              {Object.keys(YEARS).map(key => 
                <option value={key} key={key}>
                  {YEARS[key]}
                </option>
              )}
            </FormControl>
          </Col>

          <Col sm={12}>
            {meta.touched && meta.error &&
              <HelpBlock>{meta.error}</HelpBlock>}
          </Col>
        </FormGroup>
      </div>
    );
  }

};

export default SegmentedDatePicker;
