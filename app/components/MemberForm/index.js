import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// import Image from 'react-bootstrap/lib/Image';

import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';
import LabeledInput from 'components/LabeledInput';
import renderDatePicker from 'components/DatePicker';
import { editingMemberSelector } from 'containers/Dashboard/selectors';
import MemberValidator from './validator';


const mapStateToProps = (state) => ({
  initialValues: editingMemberSelector(state),
});


@connect(mapStateToProps)
@reduxForm({
  form: 'familyMember',
  enableReinitialize: true,
  validate: MemberValidator,
})
export default class MemberForm extends React.Component {

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render () {
    const { handleSubmit, submitting } = this.props;
    // const defaultAvatar = 'http://www.teenink.com/images/default_face.gif';

    return (
      <Col md={12}>
        <form
          onSubmit={handleSubmit}
          className="form-horizontal"
        >
          {/* <Col md={12}>
            <Col sm={2}>
              <Image
                src={defaultAvatar}
                rounded
                responsive
                style={{ height: '100px' }}
              />
            </Col>
            <Col sm={10} style={{ marginTop: '70px', marginLeft: '-30px' }}>
              <Field
                name="avatar"
                type="file"
                label="avatar"
                component={Input}
              />
            </Col>
          </Col> */}

          <Row>
            <Field
              name="firstName"
              type="text"
              component={LabeledInput}
              label="First Name"
              className="col-md-6"
            />

            <Field
              name="lastName"
              type="text"
              component={LabeledInput}
              label="Last Name"
              className="col-md-6"
            />
          </Row>

          <Row>
            <Field
              name="familyRelationship"
              type="select"
              component={LabeledInput}
              label="Family Relationship"
              className="col-md-6"
            >
              <option value="">Select a relationship type</option>
              {Object.keys(MEMBER_RELATIONSHIP_TYPES).map((key, index) =>
                <option value={key} key={index}>
                  {MEMBER_RELATIONSHIP_TYPES[key]}
                </option>
              )}
            </Field>
          </Row>

          <Row>
            <Field
              name="birthDate"
              type="date"
              component={renderDatePicker}
              label="Birthdate"
              className="col-md-6"
            />
          </Row>

          <Row className="form-group">
            <Field
              name="phone"
              type="text"
              mask="(999) 999-9999"
              maskChar=" "
              component={LabeledInput}
              label="Phone Number"
              className="col-md-6"
            />

            <Field
              name="email"
              type="text"
              component={LabeledInput}
              label="Email"
              className="col-md-6"
            />
          </Row>

          <Row>
            <Col sm={12}>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-padding btn-cyan btn-round"
              >
                Save
              </button>
            </Col>
          </Row>

        </form>
      </Col>
    );
  }
}

