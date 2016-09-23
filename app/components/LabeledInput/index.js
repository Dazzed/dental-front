import React from 'react';
import classnames from 'classnames';

import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


function selectComponent (type) {
  if (type === 'select' || type === 'textarea') {
    return { componentClass: type };
  }

  return { type };
}


/**
 * LabeledInput is a block of code that is most used on forms.
 *
 * Should be used with redux-forms.
 *
 */
const LabeledInput =
  ({ input, label, type, meta, width, children, className }) => {
    const rootClassName = classnames({
      'has-error': meta.touched && meta.error,
    });

    return (
      <div className={className || 'col-md-12'}>
        <FormGroup className={rootClassName}>
          <Col sm={12}>
            <ControlLabel>{label}</ControlLabel>
          </Col>
          <Col sm={width || 12}>
            <FormControl
              {...input}
              {...selectComponent(type)}
              placeholder={label}
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
};


export default LabeledInput;
