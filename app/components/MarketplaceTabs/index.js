/*
Marketplace Tabs Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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
Marketplace Tabs
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class MarketplaceTabs extends React.Component {

  static propTypes = {
    active: React.PropTypes.string.isRequired,
    changeRoute: React.PropTypes.func.isRequired,
    dentistId: React.PropTypes.string.isRequired,
  };

  selectTab = (key) => {
    switch (key) {
      case 'profile':
        this.props.changeRoute(`/marketplace/profile/${this.props.dentistId}`);
        break;

      case 'memberships':
//        this.props.changeRoute('/dentist/new-reviews');
        break;

      case 'reviews':
//        this.props.changeRoute('/dentist/members');
        break;

      default:
        // Don't do anything... we should never actually reach here.
        break;
    }
  }

  render() {
    const { active } = this.props;

    // NOTE: Leave the tab content blank- each page will specify it's own
    //       content.  The tabs are just there for navigation.
    return (
      <Tabs activeKey={active} onSelect={this.selectTab} id="dentist-dashboard-tabs" styleName="tabs">
        <Tab eventKey={'profile'} title="Profile"></Tab>
        <Tab eventKey={'memberships'} title="Membership Plans"></Tab>
        <Tab eventKey={'reviews'} title="Reviews"></Tab>
      </Tabs>
    );
  }

}
