/**
 * To understand the implementation of the map displayed in the 'Dashboard' page,
 * I have used the documentation on: https://tomchentw.github.io/react-google-maps/
 */
import React, { useState } from "react";

import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

export const Map = withScriptjs(
  withGoogleMap((props) => {
    /**
     * When the marker is dragged you get the lat and long using the functions included in event object.
     * I have used geocode to get the lat and lng positions, then I have used a state to set those values.
     */
    const onMarkerDragEnd = (event) => {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();

      props.onLocationChange(newLat, newLng);
    };

    return (
      <GoogleMap
        google={props.google}
        defaultZoom={props.zoom}
        defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
      >
        <MarkerWithLabel
          google={props.google}
          labelAnchor={new google.maps.Point(-10, 80)}
          labelStyle={{
            borderRadius: "10px",
            backgroundColor: "white",
            fontSize: "15px",
            padding: "16px",
          }}
          name={"park"}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{
            lat: props.lat,
            lng: props.lng,
          }}
        >
          <div>{props.caption}</div>
        </MarkerWithLabel>
      </GoogleMap>
    );
  })
);

export const AsyncMap = React.memo(
  (props) => {
    return (
      <Map
        google={props.google}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA9jpySEhXNn3BGG0IvDcQFktEJjlquJjk&libraries=places`}
        loadingElement={<div style={{ height: `100%`, width: "auto" }} />}
        containerElement={<div style={{ height: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        {...props}
      />
    );
  },
  (prevProps, nextProps) => {
    return false;
  }
);
