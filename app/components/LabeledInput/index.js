import React from 'react';
import classnames from 'classnames';

import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import InputMask from 'react-input-mask';


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


/**
 * LabeledInput is a block of code that is most used on forms.
 *
 * Should be used with redux-forms.
 *
 */
const LabeledInput = ({
  input, label, type, meta, width, children, className, mask, maskChar, placeholder, rows,
}) => {
  const rootClassName = classnames({
    'has-error': meta.touched && meta.error,
  });

  const placeholderText = placeholder !== undefined
                       ? placeholder
                       : label;

  const rowsAttr = type === 'textarea'
                 ? { rows: `${rows}` }
                 : {};

  return (
    <div className={className || 'col-md-12'}>
      <FormGroup className={rootClassName}>
        <Col sm={12}>
          <ControlLabel>{label}:</ControlLabel>
        </Col>
        <Col sm={width || 12}>
          <FormControl
            {...input}
            {...selectComponent(type, mask, maskChar)}
            placeholder={placeholderText}
            {...rowsAttr}
          >
            {children}
          </FormControl>
          {meta.touched && meta.error &&
            <HelpBlock>{meta.error}</HelpBlock>}
        </Col>
      </FormGroup>
    </div>
  );
};


LabeledInput.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  children: React.PropTypes.array,
  className: React.PropTypes.string,
  mask: React.PropTypes.string,
  maskChar: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  rows: React.PropTypes.number,
};


export default LabeledInput;
