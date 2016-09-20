import React from 'react';

import Well from 'react-bootstrap/lib/Well';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';


function mapStateToProps (state) {
  return {
    state,
  };
}


function mapActionsToProps (dispatch) {
  return {
    dispatch,
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
  }

  componentWillMount () {
  }

  render () {
    return (
      <Well>
        <h2>Membership pricing/affordability</h2>

        <Row>

        </Row>
      </Well>
    );
  }

}

