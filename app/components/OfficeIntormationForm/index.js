/**
*
* OfficeIntormationForm
*
*/

import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';

import OfficeIntormation from './OfficeInformation';
import styles from './styles.css';


@CSSModules(styles)
class OfficeIntormationForm extends React.Component {

  render () {
    return (
      <Row styleName="global-form">
        <form className="form-horizontal">
          <OfficeIntormation />
        </form>
      </Row>
    );
  }
}

export default OfficeIntormationForm;
