/*
Inline Input Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import classnames from 'classnames';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import InputMask from 'react-input-mask';


/*
Helpers
------------------------------------------------------------
*/
function selectComponent (type, mask, maskChar) {
  if (mask) {
    return { componentClass: InputMask, mask, maskChar };
  }

  switch (type) {
    case 'select':
    case 'textarea':
      return { componentClass: type };
    default:
      return { type };
  }
}


/*
Inline Input
================================================================================
InlineInput is a block of code that is most used on forms.

It should be used with redux-forms.
*/
const InlineInput = ({
  input, label, type, meta, width, children, className, mask, maskChar,
}) => {
  const rootClassName = classnames({
    'has-error': meta.touched && meta.error,
  });

  return (
    <span className={rootClassName}>
      <FormControl
        {...input}
        {...selectComponent(type, mask, maskChar)}
        placeholder={label}
      >
        {children}
      </FormControl>
    </span>
  );
};

InlineInput.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  children: React.PropTypes.array,
  className: React.PropTypes.string,
  mask: React.PropTypes.string,
  maskChar: React.PropTypes.string,
};

export default InlineInput;
