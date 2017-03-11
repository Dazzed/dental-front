/*
Input Group Component
================================================================================
NOTE: The form control must be an input type (text, password, etc).  Bootstrap
      doesn't support input groups for <select> and <textarea> elements.

NOTE: For use with the `redux-forms` library.
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import classnames from 'classnames';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


/*
Simple Input Group
================================================================================
*/
const SimpleInputGroup =
  ({ input, label, type, meta, width, disabled, defaultValue, leftAddon, rightAddon }) => {
    const rootClassName = classnames({
      'has-error': meta.touched && meta.error,
    });

    return (
      <Col sm={width || 12} className={rootClassName}>
        <InputGroup>
          {leftAddon && (
            <InputGroup.Addon>{leftAddon}</InputGroup.Addon>
          )}
          <FormControl
            {...input}
            type={type}
            placeholder={label}
            disabled={disabled}
            defaultValue={defaultValue}
          />
          {rightAddon && (
            <InputGroup.Addon>{rightAddon}</InputGroup.Addon>
          )}
        </InputGroup>

        {meta.touched && meta.error && <HelpBlock>{meta.error}</HelpBlock>}
      </Col>
    );
  };


SimpleInputGroup.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  defaultValue: React.PropTypes.any,
  leftAddon: React.PropTypes.node,
  rightAddon: React.PropTypes.node,
};


export default SimpleInputGroup;
