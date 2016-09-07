import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


/**
 * Input is a block of code that is used on forms.
 *
 * Should be used with redux-forms.
 *
 */
const Input = ({ input, label, type, meta, width }) => (
  <Col sm={width || 12}>
    <FormControl {...input} placeholder={label} type={type} />
    {meta.touched && meta.error && <HelpBlock>{meta.error}</HelpBlock>}
  </Col>
);


Input.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
};


export default Input;
