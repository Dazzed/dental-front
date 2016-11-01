import React, { PropTypes, Component } from 'react';
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
import WriteReviewModal from './WriteReviewModal';
import styles from './MyDentist.css';

const defaultAvatar = 'http://www.teenink.com/images/default_face.gif';

class MyDentist extends Component {
  static propTypes = {
    dentist: PropTypes.object,
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
    const { dentist } = this.props;

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

    return (
      <Well>
        <Row styleName="my-dentist-container">
          <Col md={2}>
            <div styleName="avatar">
              <Image src={avatar || defaultAvatar} />
            </div>
            <div styleName="rating">5/5</div>
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
              <Col md={4} styleName="affordability">
                Affordability: 5/5
              </Col>

              <Col md={4} />

              <Col md={4}>
                <button
                  className="btn btn-block btn-cyan btn-round btn-shadow"
                  onClick={this.openMessageModal}
                >
                  Write Message
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

export default CSSModules(styles, { allowMultiple: true })(MyDentist);
