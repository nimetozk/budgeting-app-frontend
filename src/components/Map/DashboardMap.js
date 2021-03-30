import React, { useEffect, useState } from "react";

import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [list, setList] = useState([]);

    const handleInfoOpen = (item, index) => {
      const tempItem = { ...item };
      tempItem.open = item.open ? false : true;

      const tempList = [...list];
      tempList[index] = tempItem;
      setList(tempList);
    };

    useEffect(() => {
      if (props.list && props.list.length) {
        setList(props.list);
      }
    }, [props.list]);

    return (
      <GoogleMap
        google={props.google}
        defaultZoom={props.zoom}
        defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
      >
        {list &&
          list.length &&
          list.map((item, index) => (
            <div key={index}>
              {item.open && (
                <InfoWindow
                  onCloseClick={() => handleInfoOpen(item, index)}
                  position={{
                    lat: item.location.coordinates[1],
                    lng: item.location.coordinates[0],
                  }}
                >
                  <div>
                    <span style={{ padding: 0, margin: 0 }}>{item.label}</span>
                  </div>
                </InfoWindow>
              )}
              <MarkerWithLabel
                // onClick={() => {
                //   console.log("mouse over");
                //   handleInfoOpen(item, index);
                // }}
                google={props.google}
                labelAnchor={new google.maps.Point(-10, 0)}
                labelStyle={{
                  borderRadius: "10px",
                  backgroundColor: "white",
                  fontSize: "12px",
                  padding: "5px",
                }}
                name={item.label}
                position={{
                  lat: item.location.coordinates[1],
                  lng: item.location.coordinates[0],
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <span>
                      <strong>{item.label}</strong>
                      <div>
                        {item.currency}
                        {item.totalAmount}
                      </div>
                    </span>
                  </div>
                </div>
              </MarkerWithLabel>
            </div>
          ))}
      </GoogleMap>
    );
  })
);

export const DashboardMap = React.memo(
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
