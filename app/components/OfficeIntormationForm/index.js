/**
*
* OfficeIntormationForm
*
*/

import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
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
    data: selectDentistInfo(state),
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
class OfficeIntormationForm extends React.Component {

  static propTypes = {
    handleSubmit: React.PropTypes.func,
    data: React.PropTypes.object.isRequired,
  }

  render () {
    const { handleSubmit, data } = this.props;

    if (!data.id) {
      return (
        <Row className={styles['global-form']}>
          Loading...
        </Row>
      );
    }

    return (
      <Row className={styles['global-form']}>
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
