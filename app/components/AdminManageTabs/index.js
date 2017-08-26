/*
Admin Dashboard Tabs Component
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
Admin Dashboard Tabs
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class AdminManageTabs extends React.Component {

  static propTypes = {
    active: React.PropTypes.string.isRequired,
    changeRoute: React.PropTypes.func.isRequired,
  };

  selectTab = (key) => {
    switch (key) {
      case 'managers':
        this.props.changeRoute('/admin/manage');
        break;
      default:
        break;
    }
  }

  render() {
    const { active } = this.props;
    return (
      <Tabs activeKey={active} onSelect={this.selectTab} id="admin-manage-tabs" styleName="tabs">
        <Tab eventKey={'managers'} title="Account Managers"></Tab>
      </Tabs>
    );
  }

}
