/*
Map Marker Component
================================================================================
*/

import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

function MapMarker() {
  return (
    <div styleName="default-marker" />
  );
}

export default CSSModules(styles)(MapMarker);
