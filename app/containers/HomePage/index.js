/*
Home Page
================================================================================
Route: `/`

This is the first thing users see of our App, at the '/' route.

NOTE: while this component should technically be a stateless functional
component (SFC), hot reloading does not currently support SFCs. If hot
reloading is not a neccessity for you then you can refactor it and remove
the linting exception.
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaCheck from 'react-icons/lib/fa/check';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

// app
import logo from 'assets/images/logo.png';
import calendarIcon from 'assets/images/calendar-icon.png';
import checkboardIcon from 'assets/images/checkboard-icon.png';
// import marketingVideoPoster from 'assets/images/marketing-video-poster.png';
import toothIcon from 'assets/images/tooth-icon.png';
// import marketingVideo from 'assets/videos/marketing-video.mp4';
import Footer from 'components/Footer';
import SearchForm from 'containers/SearchForm';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}


/*
Home
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class HomePage extends React.Component {

  static propTypes = {
    changeRoute: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      showMarketingVideo: false,
    };
  }

  goToFaq = () => {
    this.props.changeRoute('/faq');
  }

  goToLearnMore = () => {
    this.props.changeRoute('/learn-more');
  }

  goToLogin = () => {
    this.props.changeRoute('/accounts/login');
  }

  toggleMarketingVideo = () => {
    this.setState({
      ...this.state,
      showMarketingVideo: !this.state.showMarketingVideo
    });
  }

  render() {
    return (
      <div styleName="wrapper">

        {/*
        RHS Floating Menu
        ------------------------------------------------------------
        */}
        <div styleName="floating-menu">
          <ul styleName="login-links">
            <li styleName="login-links__link--secondary">
              <Link to="/accounts/login">Login</Link>
            </li>

            {/*<li styleName="login-links__link--primary">
              <Link to="/accounts/login">Dentist Portal</Link>
            </li>*/}
          </ul>
        </div>

        {/*
        First Block
        ------------------------------------------------------------
        */}
        <div styleName="first-block">
          <header>
            <h1>
              <img src={logo} alt="DentalHQ Logo" />
            </h1>
            <h2>Quality, Affordable Membership Plans</h2>
          </header>

          {/*<SearchForm />*/}

          <div styleName="next-section-cover">
            <h3>
              Find affordable monthly service plans from the best dentists in your area!
            </h3>
            <p>
              How DentalHQ Works
              <br />
              <FaChevronDown size={32} />
            </p>
          </div>
        </div>

        {/*
        Second Block
        ------------------------------------------------------------
        */}
        <div styleName="second-block">
          <div className="container">

            <div className="row">
              <div className="col-md-10 col-md-offset-1">

                {/* TODO: turn back on */}

                <input
                  type="button"
                  styleName="large-button"
                  value="WATCH VIDEO &gt;"
                  onClick={this.toggleMarketingVideo}
                />

                <Modal
                  backdrop={true}
                  dialogClassName={styles['marketing-video-modal']}
                  onHide={this.toggleMarketingVideo}
                  show={this.state.showMarketingVideo}
                >
                  <Modal.Header closeButton />
                  <Modal.Body>
                    <video
                      autoPlay
                      controls
                      poster="https://s3.amazonaws.com/dentalhq-files/marketing/marketing-video-poster.png"
                      ref="video"
                      style={{width: '100%', height: '100%'}}
                    >
                      <source src="https://s3.amazonaws.com/dentalhq-files/marketing/marketing-video.mp4" type="video/mp4" />
                    </video>
                  </Modal.Body>
                </Modal>


                <h2 styleName="large-title">
                  No insurance? No problem.
                </h2>

                <p styleName="large-text">
                  Why deal with an expensive, restrictive private insurance plan when you can find the best dental practices near you offering affordable monthly membership plans?
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div styleName="process">
                  <img src={toothIcon} alt="Tooth Icon" />
                  <h3 styleName="large-title">
                    Browse
                  </h3>
                  <p styleName="large-text">
                    from our extensive
                    <br />
                    selection of quality
                    <br />
                    dentists near you.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div styleName="process">
                  <img src={checkboardIcon} alt="Checkboard Icon" />
                  <h3 styleName="large-title">
                    Select
                  </h3>
                  <p styleName="large-text">
                    the dentist with the
                    <br />
                    membership plan that
                    <br />
                    meets your needs.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div styleName="process">
                  <img src={calendarIcon} alt="Calendar Icon" />
                  <h3 styleName="large-title">
                    Call
                  </h3>
                  <p styleName="large-text">
                    the dentist directly
                    <br />
                    to schedule an
                    <br />
                    appointment.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/*
        Third Block
        ------------------------------------------------------------
        */}
        <div styleName="third-block">
          <div styleName="third-block__overlay">
            <div className="container">

              <h2 styleName="large-title">
                Membership Package Includes
              </h2>

              <div styleName="features">
                <div className="row">
                  <div className="col-md-offset-2 col-md-1" styleName="feature__check">
                    <FaCheck />
                  </div>
                  <div className="col-md-7" styleName="feature">
                    Basic Dental cleaning every 6 months
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-offset-2 col-md-1" styleName="feature__check">
                    <FaCheck />
                  </div>
                  <div className="col-md-7" styleName="feature">
                    Exams and Xrays as needed with cleanings
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-offset-2 col-md-1" styleName="feature__check">
                    <FaCheck />
                  </div>
                  <div className="col-md-7" styleName="feature">
                    Fluoride treatment for kids once per year
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-offset-2 col-md-1" styleName="feature__check">
                    <FaCheck />
                  </div>
                  <div className="col-md-7" styleName="feature">
                    1 emergency exam and Xrays per year
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-offset-2 col-md-1" styleName="feature__check">
                    <FaCheck />
                  </div>
                  <div className="col-md-7" styleName="feature">
                    Discount on any needed treatment
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-offset-2 col-md-1" styleName="feature__check">
                    <FaCheck />
                  </div>
                  <div className="col-md-7" styleName="feature">
                    Affordable membership plans starting as low as $20/month
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/*
        Fourth Block
        ------------------------------------------------------------
        */}
        <div styleName="fourth-block">
          <div styleName="fourth-block__overlay">
            <div className="container">

              <div className="row">
                <div className="col-md-offset-1 col-md-10">
                  <h2 styleName="large-title">
                    Interested in Partnering with DentalHQ?
                  </h2>

                  <p styleName="large-text">
                    We're on the lookout for the best dental practices in America. Click
                    below to learn how DentalHQ can help your practice maximize its
                    potential.
                  </p>

                  {/* TODO: turn back on */}

                  <input
                    type="button"
                    styleName="large-button__hollow"
                    onClick={this.goToLearnMore}
                    value="LEARN MORE &gt;"
                  />

                </div>
              </div>

            </div>
          </div>
        </div>

        {/*
        Footer
        ------------------------------------------------------------
        */}
        <Footer />

      </div>
    );
  }
}
