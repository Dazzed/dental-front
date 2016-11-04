import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Well from 'react-bootstrap/lib/Well';

import ContactSupportForm from 'components/ContactSupportForm';

import { changePageTitle } from 'containers/App/actions';
import {
  submitContactSupportForm
} from 'containers/ContactSupportPage/actions';


@connect(mapStateToProps, mapDispatchToProps)
class ContactSupportPage extends Component {
  static propTypes = {
    isSubmitting: PropTypes.bool,
    dispatchSubmit: PropTypes.func,
    changePageTitle: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentWillMount () {
    this.props.changePageTitle('Contact Support');
  }

  onSubmitForm (values) {
    this.props.dispatchSubmit({
      ...values,
    });
  }

  render () {
    return (
      <Well>
        <ContactSupportForm
          isSubmitting={this.props.isSubmitting}
          onSubmit={this.onSubmitForm}
        />
      </Well>
    );
  }
}

function mapStateToProps (state) {
  return {
    isSubmitting: state.contactSupportPage.submitting,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSubmit: (values) => dispatch(submitContactSupportForm(values)),
    changePageTitle: (title) => dispatch(changePageTitle(title)),
  };
}

export default ContactSupportPage;
