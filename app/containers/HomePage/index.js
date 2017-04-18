/*
Home Page
================================================================================
Route: `/`

This is the first thing users see of our App, at the '/' route.

NOTE: while this component should technically be a stateless functional
component (SFC), hot reloading does not currently support SFCs. If hot
reloading is not a neccessity for you then you can refactor it and remove
the linting exception.

TODO: To re-convert the home page back from a splash page, delete all the
uncommented html (except for the wrapper div).  Then uncomment the html in each
section.  Don't forget to convert the styles, too.
  - https://trello.com/c/pLNEtxw5/111-core-setup-staging-and-production-environments
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

// app
import logo from 'assets/images/logo.png';
import calendarIcon from 'assets/images/calendar-icon.png';
import checkboardIcon from 'assets/images/checkboard-icon.png';
import marketingVideoPoster from 'assets/images/marketing-video-poster.png';
import toothIcon from 'assets/images/tooth-icon.png';
import marketingVideo from 'assets/videos/marketing-video.mp4';
import Footer from 'components/Footer';
import SearchForm from 'containers/SearchForm';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapDispatchToProps (dispatch) {
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

  constructor (props) {
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

  render () {
    return (
      <div styleName="wrapper">

        {/*
        RHS Floating Menu
        ------------------------------------------------------------
        */}
        {/*
        <div styleName="floating-menu">
          <ul styleName="login-links">
            <li styleName="login-links__link--secondary">
              <Link to="/accounts/login">Login</Link>
            </li>

            <li styleName="login-links__link--primary">
              <Link to="/accounts/login">Dentist Portal</Link>
            </li>
          </ul>
        </div>
        */}


        {/*
        First Block
        ------------------------------------------------------------
        */}
        {/*
        <div styleName="first-block">
          <header>
            <h1>
              <img src={logo} alt="DentalHQ Logo" />
            </h1>
            <h2>Quality, Affordable Membership Plans</h2>
          </header>

          <SearchForm />

          <div styleName="next-section-cover">
            <h3>
              Find affordable monthly service plans for the best dentists in your area!
            </h3>
            <p>
              How DentalHQ Works
              <br />
              \/
            </p>
          </div>
        </div>
        */}

        <div styleName="first-block">
          <header>
            <h1>
              <img src={logo} alt="DentalHQ Logo" />
            </h1>
          </header>

          <div styleName="next-section-cover">
            <h3>
              Coming Soon!
            </h3>
            <p>
              We just have to finish building it first. ;)
              <br />
              <br />
            </p>
          </div>
        </div>

        {/*
        Second Block
        ------------------------------------------------------------
        -->
        */}
        {/*
        <div styleName="second-block">
          <div className="container">

            <div className="row">
              <div className="col-md-10 col-md-offset-1">
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
                      poster={marketingVideoPoster}
                      ref="video"
                    >
                      <source src={marketingVideo} type="video/mp4" />
                    </video>
                  </Modal.Body>
                </Modal>

                <h2 styleName="large-title">
                  No insurance? No problem.
                </h2>

                <p styleName="large-text">
                  Why deal with an expensive, restrictive private insurnace plan when you can find the best dental practices near you offering affordable monthly membership plans?
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
        */}


        {/*
        Third Block
        ------------------------------------------------------------
        */}
        {/*
        <div styleName="third-block">
          <div styleName="third-block__overlay">
            <div className="container">

              <h2 styleName="large-title">
                Membership plans starting as low as $20 a month!
              </h2>

            </div>
          </div>
        </div>
        */}

        {/*
        Fourth Block
        ------------------------------------------------------------
        */}
        {/*
        <div styleName="fourth-block">
          <div styleName="fourth-block__overlay">
            <div className="container">

              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <h2 styleName="large-title">
                    Add Your Dental Practice
                  </h2>

                  <p styleName="large-text">
                    We're on the lookout for the best dental practices in America. Click
                    below to learn how DentalHQ can help your practice maximize its
                    potential.
                  </p>

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
        */}

        {/*
        Footer
        ------------------------------------------------------------
        */}
        {/*
        <Footer />
        */}

        <Footer />

      </div>
    );
  }
}
