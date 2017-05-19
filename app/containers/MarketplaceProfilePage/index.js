/*
Marketplace Profile Page
================================================================================
Route: `/marketplace/profile/:dentistId`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import Avatar from 'components/Avatar';
import LoadingSpinner from 'components/LoadingSpinner';
import GoogleMaps from 'components/GoogleMaps';
import MarketplaceTabs from 'components/MarketplaceTabs';
import PageHeader from 'components/PageHeader';
import ReviewFormModal from 'components/ReviewFormModal';
import ReviewScore from 'components/ReviewScore';
import { changePageTitle } from 'containers/App/actions';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapDispatchToProps (dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),
  };
}


/*
Dentist
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
class MarketplaceProfilePage extends React.Component {

  static propTypes = {
    // react
    location: React.PropTypes.object.isRequired,

    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.changePageTitle('Dental Marketplace');
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // react
      location,
    } = this.props;

    return (
      <div styleName="container-wrapper">
        <PageHeader title="Dental Marketplace" />

        <div className="container">
          <div className="col-md-12">
            <div styleName="content-wrapper">

              <MarketplaceTabs active="profile" dentistId={this.props.routeParams.dentistId} />

              <div styleName="content">

                <div className="row">

                  {/*
                  Dentist Profile
                  ------------------------------------------------------------
                  */}
                  <div className="col-md-offset-3 col-md-8" styleName="profile-content-wrapper">
                    <div styleName="profile-content__avatar">
                      <Avatar url="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg" size={"9rem"} />
                    </div>

                    <div styleName="profile-content__name-and-rating">
                      <h2 styleName="large-title--short">
                        Johnnys Dentistry
                      </h2>

                      <ReviewScore score={7} />
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
                        This is a profile message: Nullam gravida, nisl eget dictum mattis, tellus purus posuere diam, at ornare justo felis sit amet ligula. Sed purus turpis, placerat a molestie vel, fermentum nec nisi. Nulla sed nibh non dolor dapibus molestie. In maximus, ligula id lobortis luctus, metus dolor tristique nisl, efficitur scelerisque ante enim malesuada ligula. Ut pellentesque ligula ut enim pellentesque, id posuere sem tincidunt.\n\nEtiam quis cursus mi: sed aliquam rhoncus ex nec fermentum!
                      </p>
                    </div>

                    <div styleName="detail">
                      <h3 styleName="detail__title">
                        Address
                      </h3>

                      <p styleName="detail__content">
                        Johnnys Dentistry
                        <br />
                        993 Tennessee St.
                        <br />
                        San Francisco, CA 94117
                      </p>

                      <p styleName="detail__content">
                        <a href={"tel:" + "(123) 456-7891"}>(123) 456-7891</a>
                      </p>
                    </div>

                    <div styleName="detail">
                      <h3 styleName="detail__title">
                        Website
                      </h3>

                      <p styleName="detail__content">
                        <a href="https://example.com">https://example.com</a>
                      </p>
                    </div>

                    <div styleName="detail">
                      <h3 styleName="detail__title">
                        Hours
                      </h3>

                      <p styleName="detail__content">
                        <span styleName="work-hours__day">Monday:</span>
                        <span>
                          <span styleName="work-hours__hour">9:00am</span>
                          {' to '}
                          <span styleName="work-hours__hour">5:00pm</span>
                        </span>
                        <br />

                        <span styleName="work-hours__day">Tuesday:</span>
                        <span>
                          <span styleName="work-hours__hour">9:00am</span>
                          {' to '}
                          <span styleName="work-hours__hour">5:00pm</span>
                        </span>
                        <br />

                        <span styleName="work-hours__day">Wednesday:</span>
                        <span>
                          <span styleName="work-hours__hour">9:00am</span>
                          {' to '}
                          <span styleName="work-hours__hour">5:00pm</span>
                        </span>
                        <br />

                        <span styleName="work-hours__day">Thursday:</span>
                        <span>
                          <span styleName="work-hours__hour">9:00am</span>
                          {' to '}
                          <span styleName="work-hours__hour">5:00pm</span>
                        </span>
                        <br />

                        <span styleName="work-hours__day">Friday:</span>
                        <span>
                          <span styleName="work-hours__hour">9:00am</span>
                          {' to '}
                          <span styleName="work-hours__hour">4:00pm</span>
                        </span>
                        <br />

                        <span styleName="work-hours__day">Saturday:</span>
                        <span styleName="work-hours__hour">Closed</span>
                        <br />

                        <span styleName="work-hours__day">Sunday:</span>
                        <span styleName="work-hours__hour">Closed</span>
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
                            id: 18,
                            active: true,
                            lat: 37.7597686,
                            lng: -122.3889486,
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
                      <h3 styleName="detail__title">
                        Services
                      </h3>

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
