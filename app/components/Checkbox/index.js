/*
Checkbox Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


/*
Checkbox
================================================================================
*/
export default class Checkbox extends React.Component {

  static propTypes = {
    input: React.PropTypes.object.isRequired,
    meta: React.PropTypes.object.isRequired,
    children: React.PropTypes.any,
  };

  render () {
    const {
      input,
      meta: { touched, error },
      children
    } = this.props;

    // Hack to get this working with the "Services Offered" checkbox list. 
    if (this.props.serviceEnabled) {
      input.value = this.props.serviceEnabled;
    }

    return (
      <FormGroup className={touched && error ? 'has-error' : ''}>
        <Col sm={12}>
          <label className="input-checkbox-label" htmlFor={input.name}>
            <FormControl
              {...input}
              checked={input.value}
              type="checkbox"
              className="input-checkbox"
            />
            <span>
              {children}
            </span>
            {touched && error && <HelpBlock>{error}</HelpBlock>}
          </label>
        </Col>
      </FormGroup>
    );
  }
}
