import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


function selectComponent (type) {
  if (type === 'select' || type === 'textarea') {
    return { componentClass: type };
  }

  return { type };
}


/**
 * Input is a block of code that is used on forms.
 *
 * Should be used with redux-forms.
 *
 */
const Input = (
  { input, label, type, meta, width, disabled, children, defaultValue }) => (
  <Col sm={width || 12}>
    <FormControl
      {...input}
      {...selectComponent(type)}
      placeholder={label}
      disabled={disabled}
      defaultValue={defaultValue}
    >
      {children}
    </FormControl>
    {meta.touched && meta.error && <HelpBlock>{meta.error}</HelpBlock>}
  </Col>
);


Input.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  children: React.PropTypes.array,
  defaultValue: React.PropTypes.any,
};


export default Input;
