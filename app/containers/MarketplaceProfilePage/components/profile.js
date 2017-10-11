import React, { Component } from 'react';
import CSSModules from "react-css-modules";
import moment from 'moment';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import FaQuestion from 'react-icons/lib/fa/question';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import Button from 'react-bootstrap/lib/Button';

import Avatar from "components/Avatar";
import GoogleMaps from "components/GoogleMaps";
import ReviewScore from "components/ReviewScore";
import PriceScore from "components/PriceScore";

import styles from "./styles.css";

const renderPopover = () => {
  return (
    <Popover
      id="affordability-score-popover"
      className="popover--large"
      placement="bottom"
    >
    <p>
      The affordability index rates each dentist treatment fees against other dentist in their zip code,
      a lower score shows more affordable pricing while a higher score shows less affordable pricing
    </p>
    </Popover>
  );
};

const renderAffordabilityScore = score => {
  return (
    <span className={styles['margin-0']}>
      <PriceScore affordabilityScore={score} />
      <OverlayTrigger
        overlay={renderPopover()}
        placement="bottom"
        rootClose
        trigger={['click', 'focus', 'hover']}
      >
        <span className={styles['popover-trigger']}>
          <span> (<FaQuestion />) </span>
        </span>
      </OverlayTrigger>
    </span>
  );
};

function calculateReviewScore (dentist) {
  if (dentist.dentistReviews.length) {
    const rating = dentist.dentistReviews.reduce((acc, r) => {
      acc += r.rating;
      return acc;
    }, 0);
    return Math.round(rating / dentist.dentistReviews.length);
  }
  return 0;
}

@CSSModules(styles)
export default class Profile extends Component {

  componentWillMount () {
    const { officeImages } = this.props.dentistInfo;
    if (officeImages.length) {
      this.state = {
        officeImagesPresent: true,
        officeImages,
        activeIndex: 0
      };
    } else {
      this.state = {
        officeImagesPresent: false
      };
    }
  }

  togglePrevImage = () => {
    const { activeIndex, officeImages } = this.state;
    if (activeIndex === 0) {
      return this.setState({ activeIndex: officeImages.length - 1 });
    }
    return this.setState({ activeIndex: activeIndex - 1 });
  }

  toggleNextImage = () => {
    const { activeIndex, officeImages } = this.state;
    if (activeIndex === officeImages.length - 1) {
      return this.setState({ activeIndex: 0 });
    }
    return this.setState({ activeIndex: activeIndex + 1 });
  }

  renderPhotos = () => {
    const {
      officeImagesPresent,
      officeImages,
      activeIndex
    } = this.state;
    if (this.props.dentistInfo.officeImages.length) {
      return (
        <span>
          <span className={styles['chevron-left']} onClick={this.togglePrevImage}>
            <FaChevronLeft />
          </span>
          <span>
            <img src={officeImages[activeIndex].url} className={styles['office-image']} />
          </span>
          <span className={styles['chevron-right']} onClick={this.toggleNextImage}>
            <FaChevronRight />
          </span>
        </span>
      );
    } else {
      return '';
    }
  }

  render () {
    const {
      dentist,
      dentistInfo,
      workingHours,
    } = this.props;

    const { services } = dentistInfo;
    let markers = [{
      id: dentistInfo.id,
      active: false,
      lat: null,
      lng: null
    }];

    if (dentistInfo.location) {
      if (dentistInfo.location.coordinates.length) {
        markers = [{
          id: dentistInfo.id,
          active: true,
          lat: dentistInfo.location.coordinates[0],
          lng: dentistInfo.location.coordinates[1]
        }];
      }
    }
    return (
      <div styleName="content">
        <div className="row">
          <div
            className="col-md-offset-3 col-md-9"
            styleName="profile-content-wrapper"
          >
            <div styleName="profile-content__avatar">
              <Avatar
                url={dentist.avatar}
                size={"9rem"}
              />
            </div>

            <div styleName="profile-content__name-and-rating">
              <h2 styleName="large-title--short">{dentistInfo.officeName}</h2>

              <ReviewScore
                score={calculateReviewScore(dentist)}
                noPadding
              />
              <br />
              <br />
              {renderAffordabilityScore(dentistInfo.affordabilityScore)}
            </div>
          </div>
        </div>

        <div className="row">
          {/*
          Dentist Details
          ------------------------------------------------------------
          */}
          <div className="col-md-6">
            <div styleName="detail">
              <p styleName="detail__content" className="text-justify">
                {dentistInfo.message}
              </p>
            </div>

            <div styleName="detail">
              <h3 styleName="detail__title">Address</h3>

              <p styleName="detail__content">
                {dentistInfo.address}
                <br />
                {dentistInfo.city}, {dentistInfo.state} {dentistInfo.zipCode}
              </p>

              <p styleName="detail__content">
                <a href={`tel:${dentistInfo.phone}`}>{dentistInfo.phone}</a>
              </p>
            </div>

            <div styleName="detail">
              <h3 styleName="detail__title">Website</h3>

              <p styleName="detail__content">
                <a target='blank' href={dentistInfo.url}>{dentistInfo.url}</a>
              </p>
            </div>

            <div styleName="detail">
              <h3 styleName="detail__title">Hours</h3>

              <p styleName="detail__content">
                {
                  workingHours.map((w, i) => (
                    <span key={i}>
                      <span styleName="work-hours__day">{w.day.toUpperCase()}:</span>
                      {w.isOpen &&
                        <span>
                          <span styleName="work-hours__hour">
                            {moment(w.startAt, ['h:m', 'H:m']).format('h A')}
                          </span>
                          {' to '}
                          <span styleName="work-hours__hour">
                            {moment(w.endAt, ['h:m', 'H:m']).format('h A')}
                          </span>
                        </span>
                      }
                      {!w.isOpen &&
                        <span>
                          <span styleName="work-hours__hour" styleName="closed">CLOSED</span>
                        </span>
                      }
                      { i !== workingHours.length - 1 && <br />}
                    </span>
                  ))
                }
              </p>
            </div>
          </div>

          <div className="col-md-6">
            {/*
            Dentist Office Photos
            ------------------------------------------------------------
            */}
            {/* Hiding mocked-up portions of the UI.  Just uncomment to enable. */}
            
            <div styleName="photos">
              {this.renderPhotos()}
            </div>
           

            {/*
            Dentist Map
            ------------------------------------------------------------
            */}
            <div styleName="map-wrapper">
              <GoogleMaps
                markers={markers}
                updateActiveId={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="row">
          {/*
          Dentist Services
          ------------------------------------------------------------
          */}
          <div className="col-md-12">
            <div styleName="detail">
              <h3 styleName="detail__title">Services</h3>

              <div className="row" styleName="detail__content">
                <div className="col-md-3">
                  {services[0] ? services[0].name : ''}
                  <br />
                  {services[1] ? services[1].name : ''}
                  <br />
                  {services[2] ? services[2].name : ''}
                  <br />
                  {services[3] ? services[3].name : ''}
                  <br />
                  {services[4] ? services[4].name : ''}
                </div>

                <div className="col-md-3">
                  {services[5] ? services[5].name : ''}
                  <br />
                  {services[6] ? services[6].name : ''}
                  <br />
                  {services[7] ? services[7].name : ''}
                  <br />
                  {services[8] ? services[8].name : ''}
                  <br />
                  {services[9] ? services[9].name : ''}
                </div>

                <div className="col-md-3">
                  {services[10] ? services[10].name : ''}
                  <br />
                  {services[11] ? services[11].name : ''}
                  <br />
                  {services[12] ? services[12].name : ''}
                  <br />
                  {services[13] ? services[13].name : ''}
                  <br />
                  {services[14] ? services[14].name : ''}
                </div>

                <div className="col-md-3">
                  {services[15] ? services[15].name : ''}
                  <br />
                  {services[16] ? services[16].name : ''}
                  <br />
                  {services[17] ? services[17].name : ''}
                  <br />
                  {services[18] ? services[18].name : ''}
                  <br />
                  {services[19] ? services[19].name : ''}
                  <br />
                  {services[20] ? services[20].name : ''}
                </div>
              </div>
            </div>
          </div>

          {/* End Last Row */}
        </div>

        <div className={`row ${styles['membership-page-signup-button-container']}`}>
          <br />
          <div className="col-sm-4 col-sm-push-8">
            <Button
              styleName="signup--button"
              className="btn-lg"
              bsStyle="success"
              onClick={() => this.props.history.push(`/accounts/signup/my-dentist/${this.props.id}?frommarketplace=true`)}>
              SIGN UP
            </Button>
          </div>
        </div>
        {/* End Content */}
      </div>
    );
  }
}
