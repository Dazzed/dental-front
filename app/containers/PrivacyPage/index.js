import React from 'react';
import CSSModules from 'react-css-modules';

import PageHeader from 'components/PageHeader';
import styles from './index.css';

@CSSModules(styles)
export default class FaqPage extends React.Component {
  render () {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Privacy" />
        <div className="container">
          <div className="col-md-12">
						Welcome to the privacy page
          </div>
        </div>
      </div>
    );
  }
}
