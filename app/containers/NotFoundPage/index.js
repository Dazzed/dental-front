/*
Not Found Page
================================================================================
Route: Any Invalid Route
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

// app
import PageHeader from 'components/PageHeader';

// local
import styles from './styles.css';

/*
Not Found
================================================================================
*/
@CSSModules(styles)
export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Page Not Found" />

        <div className="container">
          <div className="col-md-12">
            <div styleName="content-wrapper">
              <p className="text-center">
                Sorry, the page you are looking for does not exist!
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
