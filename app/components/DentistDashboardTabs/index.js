/*
Dentist Dashboard Tabs Component
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
Dentist Dashboard Tabs
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class DentistDashboardTabs extends React.Component {

  static propTypes = {
    active: React.PropTypes.string.isRequired,
    changeRoute: React.PropTypes.func.isRequired,
  };

  selectTab = (key) => {
    switch (key) {
      case 'new-members':
        this.props.changeRoute('/dentist/new-members');
        break;

      case 'new-reviews':
        this.props.changeRoute('/dentist/new-reviews');
        break;

      case 'members':
        this.props.changeRoute('/dentist/members');
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
        <Tab eventKey={'new-members'} title="New Members"></Tab>
        <Tab eventKey={'new-reviews'} title="New Reviews"></Tab>
        <Tab eventKey={'members'} title="Members"></Tab>
      </Tabs>
    );
  }

}
