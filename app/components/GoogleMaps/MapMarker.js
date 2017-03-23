/*
Map Marker Component
================================================================================
*/

import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

function MapMarker(props) {
  const { updateActiveId, id } = props;
  return (
    <div styleName="default-marker" onMouseEnter={() => updateActiveId(id)} />
  );
}

MapMarker.propTypes = {
  updateActiveId: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default CSSModules(styles)(MapMarker);
