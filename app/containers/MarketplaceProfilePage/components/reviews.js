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
    const filteredReviews = reviews
      .filter(review => (
        moment()
          .isAfter(moment(review.updatedAt).add('7', 'days'))
      )
    );

    if (!filteredReviews.length) {
      return <h2>This dentist has no Reviews yet!</h2>;
    }
    return filteredReviews.map((review, i) => {
      const { firstName, lastName } = review.client;
      return (
        <Col xs={6} key={i}>
          <ReviewScore score={review.rating} />
          <p>"{review.message}"</p>
          <strong>{firstName} {lastName}</strong>
          <p>{moment(review.updatedAt).format('MMM YYYY')}</p>
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
