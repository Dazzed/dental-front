import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';
import FaChain from 'react-icons/lib/fa/chain';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaPhone from 'react-icons/lib/fa/phone';

// import StarRating from 'react-star-rating';

import WriteMessageModal from './WriteMessageModal';
import WriteReviewModal from './WriteReviewModal';
import styles from './MyDentist.css';

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
      name,
      address,
      description,
      membershipFee,
      childMembershipFee,
      url,
      email,
      phone,
      avatar,
    } = dentist;

    return (
      <Well>
        <Row styleName="my-dentist-container">
          <Col md={2}>
            <div styleName="avatar">
              <Image src={avatar} />
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
                <div styleName="name">{name}</div>
                <div styleName="address">{address}</div>
              </Col>
              <Col md={6} styleName="membership-fee">
                <div>
                  Membership Fee: <span styleName="fee">{membershipFee}</span>
                </div>
                <div>
                  Kids Membership Fee: <span styleName="child-fee">
                    {childMembershipFee}
                  </span>
                </div>
              </Col>
            </Row>

            <Row styleName="row url-email-phone">
              <div styleName="pair">
                <FaChain size={16} />
                <a
                  styleName="text"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url}
                </a>
              </div>
              <div styleName="pair">
                <FaEnvelope size={16} />
                <span styleName="text">{email}</span>
              </div>
              <div styleName="pair">
                <FaPhone size={16} />
                <span styleName="text">{phone}</span>
              </div>
            </Row>

            <Row styleName="row">
              <Col md={12}>
                {description}
              </Col>
            </Row>

            <Row styleName="row">
              <Col md={4} styleName="affordability">
                Affordability: 5/5
              </Col>
              <Col md={4}>
                <Button
                  bsStyle="primary"
                  block
                  styleName="btn"
                  className={classNames('btn-cyan', 'btn-shadow')}
                  onClick={this.openMessageModal}
                >
                  Write Message
                </Button>
              </Col>
              <Col md={4}>
                <Button
                  bsStyle="primary"
                  block
                  styleName="btn"
                  className={classNames('btn-cyan', 'btn-shadow')}
                  onClick={this.openReviewModal}
                >
                  Write Review
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <WriteMessageModal
          showModal={this.state.showMessageModal}
          onClose={this.closeMessageModal}
        />
        <WriteReviewModal
          showModal={this.state.showReviewModal}
          onClose={this.closeReviewModal}
        />
      </Well>
    );
  }
}

export default CSSModules(styles, { allowMultiple: true })(MyDentist);
