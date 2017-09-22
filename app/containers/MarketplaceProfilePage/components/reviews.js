import React, { Component } from 'react';
import CSSModules from "react-css-modules";
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';

import ReviewScore from "components/ReviewScore";
import styles from "./styles.css";

@CSSModules(styles)
export default class Reviews extends Component {

  renderReviews = () => {
    const { reviews } = this.props;
    return reviews.map((review, i) => {
      const { firstName, lastName } = review.client;
      return (
        <Col xs={6} key={i}>
          <ReviewScore score={review.rating} />
          <p>"{review.message}"</p>
          <strong>{firstName} {lastName}</strong>
          <p>{moment(review.createdAt).format('MMM YYYY')}</p>
        </Col>
      );
    });
  }

  render () {
    return (
      <div styleName="content">
        <Row>
          {this.renderReviews()}
        </Row>
      </div>
    );
  }
}
