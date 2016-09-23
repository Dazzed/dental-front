import React from 'react';

import Well from 'react-bootstrap/lib/Well';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';

import { requestServices } from 'containers/App/actions';
import { selectServices } from 'containers/App/selectors';


function mapStateToProps (state) {
  return {
    services: selectServices(state),
  };
}


function mapActionsToProps (dispatch) {
  return {
    requestServices: () => dispatch(requestServices()),
  };
}


function DUCheckedComponent ({ input, label, sid }) {
  return (
    <Checkbox {...input} value={sid} checked={input.value} inline>
      {label}
    </Checkbox>
  );
}


DUCheckedComponent.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string.isRequired,
  sid: React.PropTypes.number.isRequired,
};


@connect(mapStateToProps, mapActionsToProps)
@reduxForm({ form: 'office-information' })
export default class Services extends React.Component {

  static propTypes = {
    requestServices: React.PropTypes.func.isRequired,
    services: React.PropTypes.array.isRequired,
  }

  componentWillMount () {
    this.props.requestServices();
  }

  render () {
    const { services } = this.props;

    return (
      <Well>
        <h2>Services offered</h2>

        <Row>
          {services.map(item => (
            <Col md={4} key={item.id}>
              <Field
                name={`serviceSelected['_${item.id}']`}
                sid={item.id}
                label={item.name}
                component={DUCheckedComponent}
                type="checkbox"
              />
            </Col>
          ))}
        </Row>
      </Well>
    );
  }

}
