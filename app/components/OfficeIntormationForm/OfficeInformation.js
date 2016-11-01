import React from 'react';

import { Field, reduxForm } from 'redux-form';
import Well from 'react-bootstrap/lib/Well';
import Row from 'react-bootstrap/lib/Row';

import LabeledInput from 'components/LabeledInput';


@reduxForm({
  form: 'office-information',
})
export default class OfficeInformation extends React.Component {

  render () {
    return (
      <Well>
        <h2>Office Information</h2>

        <Row>
          <Field
            name="officeName"
            type="text"
            component={LabeledInput}
            label="Office Name"
            width={12}
            className="col-md-6"
          />

          <Field
            name="url"
            type="text"
            component={LabeledInput}
            label="Website URL"
            width={12}
            className="col-md-6"
          />
        </Row>

        <Row>
          <Field
            name="email"
            type="text"
            component={LabeledInput}
            label="Email Address"
            width={12}
            className="col-md-6"
          />

          <Field
            name="phone"
            type="text"
            mask="(999) 999-9999"
            maskChar=" "
            component={LabeledInput}
            label="Office Phone Number"
            width={12}
            className="col-md-6"
          />
        </Row>

        <Row>
          <Field
            name="message"
            type="textarea"
            component={LabeledInput}
            label="Office Profile Message"
            width={12}
            className="col-md-12"
          />
        </Row>

        <Row>
          <Field
            name="address"
            type="text"
            component={LabeledInput}
            label="Address"
            width={12}
            className="col-md-12"
          />
        </Row>

        <Row>
          <Field
            name="city"
            type="text"
            component={LabeledInput}
            label="city"
            width={12}
            className="col-md-6"
          />

          <Field
            name="state"
            type="text"
            component={LabeledInput}
            label="State"
            width={12}
            className="col-md-6"
          />
        </Row>

        <Row>
          <Field
            name="zipCode"
            type="text"
            component={LabeledInput}
            label="Zip code"
            className="col-md-6"
          />
        </Row>
      </Well>
    );
  }

}
