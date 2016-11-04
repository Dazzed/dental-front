import React, { PropTypes } from 'react'

import FaSpinner from 'react-icons/lib/fa/spinner';
import styles from './styles.css';

export default class LoadingSpinner extends React.Component {

  static propTypes = {
    showOnlyIcon: PropTypes.bool,
    size: PropTypes.number,
  }

  static defaultProps = {
    showOnlyIcon: true
  }

  render () {
    const { showOnlyIcon, size } = this.props;

    if (showOnlyIcon) {
      return (
        <FaSpinner
          size={size || 30}
          className="text-info spinner-icon"
        />
      )
    }

    return (

      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 text-center">
            <p>
              <FaSpinner
                size={size || 30}
                className="text-info spinner-icon"
              />
            </p>
            <p className="text-info spinner-text">
              Loading
            </p>
          </div>
        </div>
      </div>
    )
  }
}
