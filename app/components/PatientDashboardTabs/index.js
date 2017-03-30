/*
Patient Dashboard Tabs Component
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
Patient Dashboard Tabs
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class PatientDashboardTabs extends React.Component {

  static propTypes = {
    active: React.PropTypes.string.isRequired,
    changeRoute: React.PropTypes.func.isRequired,
  };

  selectTab = (key) => {
    switch (key) {
      case 'dentist':
        this.props.changeRoute('/patient/your-dentist');
        break;

      case 'family':
        this.props.changeRoute('/patient/your-family');
        break;

      case 'profile':
        this.props.changeRoute('/patient/profile');
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
      <Tabs activeKey={active} onSelect={this.selectTab} id="patient-dashboard-tabs" styleName="tabs">
        <Tab eventKey={'profile'} title="Profile"></Tab>
        <Tab eventKey={'family'} title="Your Family Members"></Tab>
        <Tab eventKey={'dentist'} title="Your Dentist"></Tab>
      </Tabs>
    );
  }

}
