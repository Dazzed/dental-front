/*
Input Time Component
================================================================================
For use with the `redux-forms` library.

NOTE: The input / output values are on 24hr time string w/ hours, minutes, and
      seconds: `HH:MM:SS`.  The seconds portion is always ":00" on time values
      coming in or going out of the component, and is always truncated away
      on time values within the component.
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Row from 'react-bootstrap/lib/Row';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


/*
Input Time
================================================================================
*/
class InputTime extends React.Component {

  static propTypes = {
    input: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    meta: React.PropTypes.object.isRequired,
    width: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    defaultToAM: React.PropTypes.bool,
    defaultToPM: React.PropTypes.bool,
  };

  constructor (props) {
    super(props);

    let timeComponents = {
      time: null,
      am: this.props.defaultToAM === true && this.props.defaultToPM !== true,
      pm: this.props.defaultToAM !== true && this.props.defaultToPM === true,
    };

    if (this.props.input.value) {
      const dateTime = moment(this.props.input.value, "HH:mm:ss");
      const amORpm = dateTime.format("A");

      timeComponents = {
        time: dateTime.format("h:mm"),
        am: amORpm === "AM",
        pm: amORpm === "PM",
      };
    }

    this.state = {
      timeComponents
    };
  }

  onAnyChange = (timeComponents) => {
    this.setState({
      timeComponents
    });

    if ( timeComponents.time !== null
      && (timeComponents.am === true || timeComponents.pm === true)
    ) {
      let timeString = timeComponents.time + " ";
      timeString +=   timeComponents.am
                    ? "AM"
                    : "PM";
      const dateTime = moment(timeString, "h:mm A");


      this.props.input.onChange(dateTime.format("HH:mm:ss"));
    }
  }

  onTimeChange = (evt) => {
    let { timeComponents } = this.state;
    timeComponents.time = evt.target.value;

    this.onAnyChange(timeComponents);
  }

  onAMClick = (evt) => {
    let { timeComponents } = this.state;

    if (timeComponents.am === false) {
      timeComponents.am = true;
      timeComponents.pm = false;

      this.onAnyChange(timeComponents);
    }
  }

  onPMClick = (evt) => {
    let { timeComponents } = this.state;

    if (timeComponents.pm === false) {
      timeComponents.am = false;
      timeComponents.pm = true;

      this.onAnyChange(timeComponents);
    }
  }

  render () {
    const { input, label, className, meta, disabled, placeholder, defaultToPM, } = this.props;
    const { timeComponents } = this.state;    

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

    let placeholderText;
    if (disabled) {
      placeholderText = null;
    }
    else if (placeholder !== undefined) {
      placeholderText = placeholder;
    }
    else {
      placeholderText = label;
    }

    return (
      <div className={(className || 'col-sm-12') + ' input-time'}>
        <FormGroup className={rootClassName}>
          {labelContent}

          <Col sm={12}>
            <div className="input-time__time">
              <FormControl
                onChange={this.onTimeChange}
                type="text"
                placeholder={placeholderText}
                value={timeComponents.time || ''}
                disabled={disabled}
              />
            </div>

            <div className="input-time__am-pm">
              <Checkbox
                onClick={this.onAMClick}
                checked={timeComponents.am}
                disabled={disabled}
              >
                AM
              </Checkbox>
              <Checkbox
                onClick={this.onPMClick}
                checked={timeComponents.pm}
                disabled={disabled}
              >
                PM
              </Checkbox>
            </div>
          </Col>

        </FormGroup>
      </div>
    );
  }

}

export default InputTime;
