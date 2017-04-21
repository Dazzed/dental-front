/*
Labeled Input
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import classnames from 'classnames';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import InputMask from 'react-input-mask';


/*
Labeled Input
================================================================================
*/
export default class LabeledInput extends React.Component {

  static propTypes = {
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

  selectComponent = (type, mask, maskChar) => {
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

  render () {
    const {
      input,
      label,
      type,
      meta,
      width,
      children,
      className,
      mask,
      maskChar,
      placeholder,
      rows,
    } = this.props;

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
              {...this.selectComponent(type, mask, maskChar)}
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
}
