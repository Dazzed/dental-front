/**
*
* OfficeIntormationForm
*
*/

import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { reduxForm } from 'redux-form';

import OfficeIntormation from './OfficeInformation';
import UploadPhotos from './UploadPhotos';
import Services from './Services';
import Membership from './Membership';

import styles from './styles.css';


@reduxForm({ form: 'office-information' })
@CSSModules(styles)
class OfficeIntormationForm extends React.Component {

  render () {
    return (
      <Row styleName="global-form">
        <form className="form-horizontal">
          <OfficeIntormation />
          <UploadPhotos />
          <Services />
          <Membership />
        </form>
      </Row>
    );
  }
}

export default OfficeIntormationForm;
