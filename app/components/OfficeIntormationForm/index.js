/**
*
* OfficeIntormationForm
*
*/

import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import {
  selectDentistInfo,
} from 'containers/EditOfficeInformation/selectors';

import { officeInformationValidator } from './validators';

import OfficeIntormation from './OfficeInformation';
import UploadPhotos from './UploadPhotos';
import Services from './Services';
import Membership from './Membership';
import WorkingHours from './WorkingHours';

import styles from './styles.css';


function mapStateToProps (state) {
  return {
    initialValues: selectDentistInfo(state),
  };
}


function mapActionsToProps (dispatch) {
  return {
    dispatch,
  };
}


@connect(mapStateToProps, mapActionsToProps)
@reduxForm({
  form: 'office-information',
  validate: officeInformationValidator,
})
@CSSModules(styles)
class OfficeIntormationForm extends React.Component {

  static propTypes = {
    handleSubmit: React.PropTypes.func,
  }

  render () {
    const { handleSubmit } = this.props;

    return (
      <Row styleName="global-form">
        <form onSubmit={handleSubmit} className="form-horizontal">
          <OfficeIntormation />
          <UploadPhotos />
          <Services />
          <Membership />
          <WorkingHours />

          <Col md={12}>
            <button
              className="btn-cyan btn-round pull-right"
              type="submit"
            >
              Continue
            </button>
          </Col>
        </form>
      </Row>
    );
  }
}

export default OfficeIntormationForm;
