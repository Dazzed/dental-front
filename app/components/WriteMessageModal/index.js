import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import Modal from 'react-bootstrap/lib/Modal';

import {
  fetchConversation,
  submitMessageForm
} from 'containers/Dashboard/actions';
import { selectConversation } from 'containers/Dashboard/selectors';
import WriteMessageForm from './WriteMessageForm';

import styles from './styles.css';

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class WriteMessageModal extends Component {
  static propTypes = {
    recipientId: PropTypes.number,
    recipientType: PropTypes.string,
    showModal: PropTypes.bool,
    messages: PropTypes.array,
    onClose: PropTypes.func,
    fetchConversation: PropTypes.func,
    dispatchSubmit: PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onModalEnter = this.onModalEnter.bind(this);
  }

  onModalEnter () {
    this.props.fetchConversation({
      recipientId: this.props.recipientId,
    });
  }

  onSubmitForm (values) {
    this.props.dispatchSubmit({
      recipientId: this.props.recipientId,
      body: {
        ...values,
      },
    });
  }

  render () {
    const { showModal, onClose, messages,
      recipientId, recipientType } = this.props;

    return (
      <Modal show={showModal} onHide={onClose} onEnter={this.onModalEnter}>
        <Modal.Header closeButton>
          <Modal.Title>Write A Message</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-md-12" styleName="messages">
            {!messages.length &&
              <span>- No messages so far -</span>
            }
            {messages.map((message, index) => (
              <div key={index} styleName="item">

                <div styleName="header">
                  <div styleName="sender">
                    {
                      message.userId === recipientId
                        ? recipientType
                        : 'You'
                    }
                  </div>
                  <div styleName="time">
                    {moment(message.createdAt).format('MMM D, HH:MM A')}
                  </div>
                </div>

                <div className="clearfix" />

                <div styleName="text" key={index}>{message.body}</div>

              </div>
            ))}
          </div>
          <WriteMessageForm
            onSubmit={this.onSubmitForm}
          />
        </Modal.Body>

      </Modal>
    );
  }
}

function mapStateToProps (state) {
  return {
    messages: selectConversation(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchConversation: (payload) => dispatch(fetchConversation(payload)),
    dispatchSubmit: (values) => dispatch(submitMessageForm(values)),
  };
}

export default WriteMessageModal;
