import React, { PropTypes } from "react";
import CSSModules from "react-css-modules";
import FaUser from "react-icons/lib/fa/user";
import { connect } from "react-redux";
// app
import Avatar from "components/Avatar";
import LoadingSpinner from "components/LoadingSpinner";
import MarketplaceTabs from "components/MarketplaceTabs";
import PageHeader from "components/PageHeader";
import { changePageTitle } from "containers/App/actions";

// local
import styles from "./styles.css";

import { dentistProfileRequest, resetDentist } from "./actions";
import { dentistSavingsSelector } from './selectors';

import Profile from './components/profile';
import Plans from './components/plans';
import Reviews from './components/reviews';
import MarketplaceHeader from './components/MarketplaceHeader';

function mapStateToProps (state) {
  const { dentist, isLoading, errorLoading } = state.marketPlaceProfile;
  return {
    dentist,
    isLoading,
    errorLoading,
    savings: dentistSavingsSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changePageTitle: title => dispatch(changePageTitle(title)),
    dentistProfileRequest: officeId => dispatch(dentistProfileRequest(officeId)),
    resetDentist: () => dispatch(resetDentist())
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
    errorLoading: PropTypes.bool.isRequired,
    resetDentist: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.state = {
      activeTab: 'profile'
    };
    this.props.changePageTitle("Dental Marketplace");
    const { params } = this.props;
    const { dentistId } = params;
    this.props.dentistProfileRequest(dentistId);
  }

  onTabChange = key => {
    this.setState({ activeTab: key });
  }

  renderTabs = () => {
    const { activeTab } = this.state;
    const {
      dentist,
      savings,
    } = this.props;
    const { dentistInfo } = dentist;
    const { workingHours } = dentistInfo;
    if (activeTab === 'profile') {
      return (
        <Profile
          dentist={dentist}
          dentistInfo={dentistInfo}
          workingHours={workingHours}
          history={this.props.history}
          id={dentist.id}
        />
      );
    } else if (activeTab === 'plans') {
      return (
        <Plans
          dentist={dentist}
          history={this.props.history}
          id={dentist.id}
          savings={savings}
        />
      );
    } else {
      return (
        <Reviews
          reviews={dentist.dentistReviews}
        />
      );
    }
  }

  componentWillUnmount() {
    this.props.resetDentist();
  }

  render () {
    const {
      dentist,
      isLoading,
      errorLoading,
    } = this.props;

    const { activeTab } = this.state;

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

    const { dentistInfo, dentistSpecialty } = dentist;
    const { workingHours } = dentistInfo;

    return (
      <div styleName="container-wrapper">
        <MarketplaceHeader
          title={`${dentistInfo.officeName}`}
          specialty={dentistSpecialty.name}
          startingPrice={dentist.planStartingCost}
          history={this.props.history}
          id={dentist.id}
        />

        <div className="container">
          <div className="col-md-12">
            <div styleName="content-wrapper">
              <MarketplaceTabs
                active={activeTab}
                onTabChange={this.onTabChange}
              />

              {this.renderTabs()}
              
            </div>
          </div>
        </div>
        {/* End Wrapper Div */}
      </div>
    );
  }
}

export default MarketplaceProfilePage;
