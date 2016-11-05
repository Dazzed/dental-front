import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import CSSModules from 'react-css-modules';

import styles from './index.css';


const Checkbox = ({ input, meta: { touched, error }, children }) => (
  <FormGroup className={touched && error ? 'has-error' : ''}>
    <Col sm={12}>
      <label styleName="checkbox-label" htmlFor={input.name}>
        <FormControl
          {...input}
          checked={input.value}
          type="checkbox"
          styleName="checkbox"
        />
        <span>
          {children}
        </span>
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </label>
    </Col>
  </FormGroup>
);


Checkbox.propTypes = {
  input: React.PropTypes.object.isRequired,
  meta: React.PropTypes.object.isRequired,
  children: React.PropTypes.any,
};

export default CSSModules(styles)(Checkbox);
