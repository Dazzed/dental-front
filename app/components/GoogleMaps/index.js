/*
Google Maps Component
================================================================================
*/

import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import GoogleMapReact from 'google-map-react';

import MapMarker from './MapMarker';

import styles from './styles.css';

function GoogleMaps(props) {
  const {
    markers,
    updateActiveId,
  } = props;

  function renderMarkers() {
    return markers.map((marker, i) => {
      return (
        <MapMarker
          key={i}
          id={marker.id}
          active={marker.active}
          lat={marker.lat}
          lng={marker.lng}
          updateActiveId={updateActiveId}
        />
      )
    });
  }

  function getMapPos() {
    // precondition: must have markers
    if (markers.length === 0) {
      return {
        lat: 34.1,
        lng: -118.5
      }
    }

    let latSum = 0;
    let lngSum = 0;

    for (let i = 0; i < markers.length; i++) {
      latSum += markers[i].lat;
      lngSum += markers[i].lng;
    }

    return {
      lat: latSum / markers.length,
      lng: lngSum / markers.length,
    };
  }

  return (
    <div styleName="map-wrapper">
      <GoogleMapReact
        center={getMapPos()}
        defaultZoom={10}
        bootstrapURLKeys={{
          key: 'AIzaSyDVwZs96MdlR8UdGKAxf9ndeb4GxpVF1Ho',
        }}
      >
        {renderMarkers()}
      </GoogleMapReact>
    </div>
  );
}

GoogleMaps.propTypes = {
  markers: PropTypes.array.isRequired,
  updateActiveId: PropTypes.func.isRequired,
};

export default CSSModules(styles)(GoogleMaps);
