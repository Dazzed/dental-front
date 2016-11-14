import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Image from 'react-bootstrap/lib/Image';
import FaChain from 'react-icons/lib/fa/chain';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaPhone from 'react-icons/lib/fa/phone';

// import StarRating from 'react-star-rating';

import { US_STATES } from 'common/constants';
import WriteMessageModal from 'components/WriteMessageModal';
import { selectNewMsgCount } from 'containers/Dashboard/selectors';
import { markMsgRead } from 'containers/Dashboard/actions';
import WriteReviewModal from './WriteReviewModal';
import styles from './MyDentist.css';

const defaultAvatar = 'http://www.teenink.com/images/default_face.gif';

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
class MyDentist extends Component {
  static propTypes = {
    dentist: PropTypes.object,
    newMsgCountBySender: PropTypes.object,
    markMsgRead: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      showReviewModal: false,
      showMessageModal: false,
    };

    this.openMessageModal = this.openMessageModal.bind(this);
    this.openReviewModal = this.openReviewModal.bind(this);
    this.closeMessageModal = this.closeMessageModal.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);
  }

  openMessageModal () {
    this.setState({
      ...this.state,
      showMessageModal: true,
    });

    const { dentist, newMsgCountBySender } = this.props;
    if (newMsgCountBySender[dentist.id] > 0) {
      this.props.markMsgRead(dentist.id);
    }
  }

  openReviewModal () {
    this.setState({
      ...this.state,
      showReviewModal: true,
    });
  }

  closeMessageModal () {
    this.setState({
      ...this.state,
      showMessageModal: false,
    });
  }

  closeReviewModal () {
    this.setState({
      ...this.state,
      showReviewModal: false,
    });
  }

  render () {
    const { dentist, newMsgCountBySender } = this.props;

    if (!dentist) {
      return null;
    }

    const {
      id,
      firstName,
      lastName,
      avatar,
      dentistInfo,
    } = dentist;

    const newMsgCount = newMsgCountBySender[id];

    return (
      <Well>
        <Row styleName="my-dentist-container">
          <Col md={2}>
            <div styleName="avatar">
              <Image src={avatar || defaultAvatar} />
            </div>
            {/* <div styleName="rating">5/5</div> */}
            <div>
              {/* <StarRating
                name="dentist-rating"
                totalStars={5}
                rating={4}
                size={20}
                disabled
              /> */}
            </div>
          </Col>

          <Col md={10}>
            <Row styleName="row">
              <Col md={6}>
                <div>Dental Practitioner</div>
                <div styleName="name">{firstName} {lastName}</div>
                {dentistInfo.city && dentistInfo.state &&
                  <div styleName="address">
                    {dentistInfo.address}<br />
                    {dentistInfo.city}, {US_STATES[dentistInfo.state]}
                  </div>
                }
              </Col>
              <Col md={6} styleName="membership-fee">
                <div>
                  Membership Fee: <span styleName="fee">
                    {dentistInfo.membership.monthly}
                  </span>
                </div>
                <div>
                  Kid Membership Fee: <span styleName="child-fee">
                    {dentistInfo.childMembership.monthly}
                  </span>
                </div>
              </Col>
            </Row>

            <Row styleName="row url-email-phone">
              {dentistInfo.url &&
                <div styleName="pair">
                  <FaChain size={16} />
                  <a
                    styleName="text"
                    href={dentistInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dentistInfo.url}
                  </a>
                </div>
              }
              {dentistInfo.email &&
                <div styleName="pair">
                  <FaEnvelope size={16} />
                  <a
                    styleName="text"
                    href={`mailto:${dentistInfo.email}`}
                    rel="noopener noreferrer"
                  >
                    {dentistInfo.email}
                  </a>
                </div>
              }
              {dentistInfo.phone &&
                <div styleName="pair">
                  <FaPhone size={16} />
                  <a
                    styleName="text"
                    href={`tel:${dentistInfo.phone}`}
                    rel="noopener noreferrer"
                  >
                    {dentistInfo.phone}
                  </a>
                </div>
              }
            </Row>

            <Row styleName="row">
              <Col md={12}>
                {dentistInfo.message}
              </Col>
            </Row>

            <Row styleName="row">
              <Col md={4} styleName="affordability" />

              <Col md={3} />

              <Col md={5}>
                <button
                  className="btn btn-block btn-cyan btn-round btn-shadow"
                  onClick={this.openMessageModal}
                >
                  { newMsgCount > 0
                    ? <span>{newMsgCount} New Messages</span>
                    : <span>Messages</span>
                  }
                </button>
              </Col>
            </Row>
          </Col>
        </Row>

        <WriteMessageModal
          recipientId={id}
          recipientType="Dentist"
          showModal={this.state.showMessageModal}
          onClose={this.closeMessageModal}
        />
        <WriteReviewModal
          dentistId={id}
          showModal={this.state.showReviewModal}
          onClose={this.closeReviewModal}
        />
      </Well>
    );
  }
}

function mapStateToProps (state) {
  return {
    newMsgCountBySender: selectNewMsgCount(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    markMsgRead: (senderId) => dispatch(markMsgRead({ senderId })),
  };
}

export default MyDentist;
