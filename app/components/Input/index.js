/*
Input Component
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
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


/*
Input
================================================================================
*/
export default class Input extends React.Component {

  static propTypes = {
    input: React.PropTypes.object.isRequired,
    label: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    meta: React.PropTypes.object.isRequired,
    width: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    children: React.PropTypes.array,
    defaultValue: React.PropTypes.any,
  };

  selectComponent = (type) => {
    if (type === 'select' || type === 'textarea') {
      return { componentClass: type };
    }

    return { type };
  }

  render() {
    const {
      input,
      label,
      type,
      meta,
      width,
      disabled,
      children,
      defaultValue
    } = this.props;

    const rootClassName = classnames({
      'has-error': meta.touched && meta.error,
    });

    return (
      <Col sm={width || 12} className={rootClassName}>
        <FormControl
          {...input}
          {...this.selectComponent(type)}
          placeholder={label}
          disabled={disabled}
          defaultValue={defaultValue}
        >
          {children}
        </FormControl>
        {meta.touched && meta.error && <HelpBlock>{meta.error}</HelpBlock>}
      </Col>
    );
  }
}
