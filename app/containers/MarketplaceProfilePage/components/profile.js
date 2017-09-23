import React, { Component } from 'react';
import CSSModules from "react-css-modules";
import Avatar from "components/Avatar";
import GoogleMaps from "components/GoogleMaps";
import ReviewScore from "components/ReviewScore";

import styles from "./styles.css";

@CSSModules(styles)
export default class Profile extends Component {

  render () {

    const {
      dentist,
      dentistInfo,
      workingHours
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
            className="col-md-offset-3 col-md-8"
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

              <ReviewScore score={10} />
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
                <a target='blank' href={'https://www.'+dentistInfo.url.replace('https://www.', '')}>{dentistInfo.url}</a>
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
                          <span styleName="work-hours__hour">{w.startAt.slice(0, 5)}</span>
                          {' to '}
                          <span styleName="work-hours__hour">{w.endAt.slice(0, 5)}</span>
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
            {/*
            <div styleName="photos">
              TODO: Photos goes here...
            </div>
            */}

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

        {/* End Content */}
      </div>
    );
  }
}
