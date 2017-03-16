/*
Avatar Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import isInteger from 'lodash/isInteger';
import React from 'react';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';

// local
import styles from './styles.css';


/*
Avatar
================================================================================
*/
@CSSModules(styles)
class Avatar extends React.Component {

  static propTypes = {
    size: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    url: React.PropTypes.string,
  }

  render () {
    let { size, url } = this.props;

    if (size === undefined) {
      size = "6rem";
    }

    const wrapperStyles = {
      width: size,
      height: size,
    };

    const avatar = url
                  ? (<img src={url} alt="Profile Photo" styleName="avatar--photo" />)
                  : (
                      <span styleName="avatar--default">
                        <FaUser />
                      </span>
                    );

    return (
      <div styleName="avatar__wrapper" style={wrapperStyles}>
        {avatar}
      </div>
    );
  }

}

export default Avatar;
