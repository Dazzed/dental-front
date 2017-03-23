/*
Map Marker Component
================================================================================
*/

import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

function MapMarker(props) {
  const { updateActiveId, id, active } = props;
  return (
    <div
      styleName={`default-marker ${active ? 'active' : ''}`}
      onMouseEnter={() => updateActiveId(id)}
    />
  );
}

MapMarker.propTypes = {
  updateActiveId: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  active: PropTypes.bool,
};

export default CSSModules(styles, { allowMultiple: true })(MapMarker);
