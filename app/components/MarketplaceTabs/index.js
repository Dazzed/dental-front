import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
export default class MarketplaceTabs extends React.Component {

  static propTypes = {
    active: React.PropTypes.string.isRequired,
    onTabChange: React.PropTypes.func.isRequired,
  };

  render () {
    const { active, onTabChange } = this.props;

    return (
      <Tabs activeKey={active} onSelect={onTabChange} id="dentist-dashboard-tabs" styleName="tabs">
        <Tab eventKey={'profile'} title="Profile" />
        <Tab eventKey={'plans'} title="Membership Plans" />
        <Tab eventKey={'reviews'} title="Reviews" />
      </Tabs>
    );
  }
}
