import react, { useState } from "react";
import SelectionPlaceLabel from "../Controls/SelectPlaceLabel";
import { Button, Row, Col } from "react-bootstrap";
import service from "services/service";
import { toast } from "react-toastify";
import { errorToString } from "utility";
import { to } from "await-to-js";
import { AsyncMap } from "./map";

const LabelMapping = (props) => {
  const [state, setState] = useState({
    selectedOption: props.placeLabel
      ? {
          value: props.placeLabel._id,
          label: props.placeLabel.name,
          placeLabel: props.placeLabel,
        }
      : null,

    externalDataSource: [],
  });

  const handlePlaceLabelChange = (option) => {
    setState({
      ...state,
      selectedOption: { ...option },
    });

    props.onPlaceLabelChange(option.placeLabel);
  };

  const handleTextChange = (event) => {
    switch (event.target.name) {
      case "place":
        props.onPlaceLabelChange({
          ...state.selectedOption.placeLabel,
          name: event.target.value,
        });
        break;
      case "mapLng":
        props.onPlaceLabelChange({
          ...state.selectedOption.placeLabel,
          location: {
            type: "Point",
            coordinates: [event.target.value, state.location.coordinates[1]],
          },
        });

        break;
      case "mapLat":
        props.onPlaceLabelChange({
          ...state.selectedOption.placeLabel,
          location: {
            type: "Point",
            coordinates: [state.location.coordinates[0], event.target.value],
          },
        });
        break;

      default:
        break;
    }
  };

  const handlePlaceSave = async () => {
    const placeLabel = {
      name: props.placeLabel.name,
      location: props.placeLabel.location,
    };

    let [error, response] = await to(service.savePlaceLabel(placeLabel));
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    const placeId = response.data;

    [error, response] = await to(service.getPlaceLabels());
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    const selectedPlace = response.data.find((item) => item._id === placeId);

    setState({
      ...state,
      selectedOption: {
        value: placeId,
        label: props.placeLabel.name,
        location: selectedPlace.location,
      },
      externalDataSource: response.data,
    });
  };

  const handleLocationChange = (lat, lng) => {
    props.onPlaceLabelChange({
      ...state.selectedOption.placeLabel,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });
  };

  return (
    <div>
      <Row>
        <Col>
          <SelectionPlaceLabel
            externalDatasource={state.externalDataSource}
            value={state.selectedOption}
            onPlaceLabelChange={handlePlaceLabelChange}
          ></SelectionPlaceLabel>
          <input
            name="place"
            type="text"
            value={props.placeLabel.name}
            onChange={handleTextChange}
          ></input>
          <input
            name="mapLat"
            type="text"
            value={props.placeLabel.location.coordinates[1]}
            onChange={handleTextChange}
          ></input>
          <input
            name="mapLng"
            type="text"
            value={props.placeLabel.location.coordinates[0]}
            onChange={handleTextChange}
          ></input>
          <Button variant="primary" onClick={handlePlaceSave}>
            Add Place Label
          </Button>
        </Col>
      </Row>
      <div>
        <AsyncMap
          zoom={10}
          center={{ lng: -0.24, lat: 51.52 }}
          caption={props.placeLabel.name}
          lat={props.placeLabel.location.coordinates[1]}
          lng={props.placeLabel.location.coordinates[0]}
          onLocationChange={handleLocationChange}
        />
      </div>
    </div>
  );
};

export default LabelMapping;
