import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Image from 'react-bootstrap/lib/Image';

import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';
import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import { selectEditingMember } from 'containers/MyFamilyMembers/selectors';
import FamilyMemberValidator from './validator';


@reduxForm({
  form: 'familyMember',
  enableReinitialize: true,
  validate: FamilyMemberValidator,
})
class AddFamilyMemberForm extends React.Component {

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render () {
    const { handleSubmit, submitting } = this.props;
    const defaultAvatar = 'http://www.teenink.com/images/default_face.gif';

    return (
      <form
        onSubmit={handleSubmit}
        className="form-horizontal"
      >
        <Col md={12}>
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
              component={Input}
            />
          </Col>
        </Col>

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

        <Field
          name="birthDate"
          type="date"
          component={LabeledInput}
          label="Birthdate"
          className="col-md-6"
        />

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

        <Col sm={12}>
          <FormGroup>
            <Col sm={12}>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-padding btn-cyan btn-round"
              >
                Save
              </button>
            </Col>
          </FormGroup>
        </Col>

      </form>
    );
  }
}

function mapStateToProps (state) {
  return {
    initialValues: selectEditingMember(state),
  };
}

export default connect(mapStateToProps)(AddFamilyMemberForm);
