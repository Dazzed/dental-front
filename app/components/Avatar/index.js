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
    const { size, url } = this.props;

    let sizeInRem = "6rem"; // default value if size isn't set or invalid

    if (isInteger(size)) {
      sizeInRem = size + "rem";
    }
    else if (size === "lg" || size === "large") {
      sizeInRem = "12rem";
    }
    else if (size === "md" || size === "medium") {
      sizeInRem = "6rem";
    }
    else if (size === "sm" || size === "small") {
      sizeInRem = "3rem";
    }

    const wrapperStyleMap = {
      width: sizeInRem,
      height: sizeInRem,
    };

    const avatar = url
                  ? (<img src={url} alt="Profile Photo" styleName="avatar--photo" />)
                  : (
                      <span styleName="avatar--default">
                        <FaUser />
                      </span>
                    );

    return (
      <div styleName="avatar__wrapper" style={wrapperStyleMap}>
        {avatar}
      </div>
    );
  }

}

export default Avatar;
