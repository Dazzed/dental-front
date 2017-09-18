import moment from "moment";
import React, { PropTypes } from "react";
import Modal from "react-bootstrap/lib/Modal";
import CSSModules from "react-css-modules";
import FaUser from "react-icons/lib/fa/user";
import { connect } from "react-redux";
import { reset as resetForm } from "redux-form";
// app
import Avatar from "components/Avatar";
import LoadingSpinner from "components/LoadingSpinner";
import GoogleMaps from "components/GoogleMaps";
import MarketplaceTabs from "components/MarketplaceTabs";
import PageHeader from "components/PageHeader";
import ReviewFormModal from "components/ReviewFormModal";
import ReviewScore from "components/ReviewScore";
import { changePageTitle } from "containers/App/actions";

// local
import styles from "./styles.css";

import { dentistProfileRequest } from "./actions";

function mapStateToProps({ marketPlaceProfile }) {
  const { dentist, isLoading, errorLoading } = marketPlaceProfile;
  return {
    dentist,
    isLoading,
    errorLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // app
    changePageTitle: title => dispatch(changePageTitle(title)),
    dentistProfileRequest: officeId => dispatch(dentistProfileRequest(officeId))
  };
}

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class MarketplaceProfilePage extends React.Component {

  static propTypes = {
    location: React.PropTypes.object.isRequired,
    changePageTitle: React.PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    dentistProfileRequest: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorLoading: PropTypes.bool.isRequired
  };

  componentWillMount() {
    this.props.changePageTitle("Dental Marketplace");
    const { params } = this.props;
    const { dentistId } = params;
    this.props.dentistProfileRequest(dentistId);
  }

  // componentDidMount() {
  //   this.props.changePageTitle("Dental Marketplace");
  // }

  render() {
    const {
      dentist,
      isLoading,
      errorLoading
    } = this.props;

    if (isLoading) {
      return (
        <div styleName="container-wrapper">
          <PageHeader title="Dental Marketplace" />
          <div className="container">
            <LoadingSpinner />
          </div>
        </div>
      );
    }

    const { dentistInfo } = dentist;
    const { workingHours } = dentistInfo;

    return (
      <div styleName="container-wrapper">
        <PageHeader title="Dental Marketplace" />

        <div className="container">
          <div className="col-md-12">
            <div styleName="content-wrapper">
              <MarketplaceTabs
                active="profile"
                dentistId={this.props.routeParams.dentistId}
              />

              <div styleName="content">
                <div className="row">
                  {/*
                  Dentist Profile
                  ------------------------------------------------------------
                  */}
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
                        markers={[
                          {
                            id: dentistInfo.id,
                            active: true,
                            lat: dentistInfo.location.coordinates[0],
                            lng: dentistInfo.location.coordinates[1]
                          }
                        ]}
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
                          Cleanings &amp; Prevention
                          <br />
                          Dental Exams and Cleanings
                          <br />
                          Digital X-Rays
                          <br />
                          Fluoride Treatment
                          <br />
                          Sealants
                        </div>

                        <div className="col-md-3">
                          Cosmetic Dentistry
                          <br />
                          CEREC® One Day Crowns
                          <br />
                          Composite Fillings
                          <br />
                          Dental Implants
                          <br />
                          Invisalign
                        </div>

                        <div className="col-md-3">
                          Lumineers
                          <br />
                          Porcelain Crowns (Caps)
                          <br />
                          Porcelain Fixed Bridges
                          <br />
                          Porcelain Onlays
                          <br />
                          Porcelain Veneers
                        </div>

                        <div className="col-md-3">
                          Procera Crowns
                          <br />
                          Tooth Whitening
                          <br />
                          Sedation / Sleep Dentistry
                          <br />
                          Oral Cancer Screenings
                          <br />
                          Periodontal Disease
                          <br />
                          Emergency Care
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* End Last Row */}
                </div>

                {/* End Content */}
              </div>
            </div>
          </div>
        </div>
        {/* End Wrapper Div */}
      </div>
    );
  }
}

export default MarketplaceProfilePage;
