import react, { useEffect, useState } from "react";
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
          ...props.placeLabel,
          name: event.target.value,
        });
        break;
      case "mapLng":
        props.onPlaceLabelChange({
          ...props.placeLabel,
          location: {
            type: "Point",
            coordinates: [event.target.value, state.location.coordinates[1]],
          },
        });

        break;
      case "mapLat":
        props.onPlaceLabelChange({
          ...props.placeLabel,
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

    toast.success("Location is saved!");
  };

  const handleLocationChange = (lat, lng) => {
    props.onPlaceLabelChange({
      name: props.placeLabel.name,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });
  };

  const handleDeleteLabel = async (placeLabel) => {
    let [error, response] = await to(service.deletePlaceLabel(placeLabel));
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    [error, response] = await to(service.getPlaceLabels());
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    setState({
      ...state,
      selectedOption: null,
      externalDataSource: response.data,
    });

    props.onPlaceLabelChange({
      ...props.placeLabel,
      name: "",
    });

    toast.success("Label is deleted!");
  };

  return (
    <div style={{ width: "1000px" }}>
      <Row>
        <Col>
          <Row style={{ padding: "0px 0px 20px" }}>
            <label style={{ fontSize: "20px" }}>
              Drag and drop the pin on the map to choose the location of the new
              place:
            </label>
          </Row>

          <Row>
            <label style={{ paddingRight: "96px", paddingBottom: "9px" }}>
              Name:
            </label>

            <Col>
              <Row>
                <input
                  style={{ width: "200px" }}
                  name="place"
                  type="text"
                  value={props.placeLabel.name}
                  onChange={handleTextChange}
                ></input>
              </Row>
            </Col>
          </Row>

          <Row>
            <label>Coordinates:</label>

            <Col>
              <Row>
                <label style={{ padding: "0px 20px" }}>x:</label>

                <input
                  style={{ width: "200px" }}
                  name="mapLat"
                  type="text"
                  value={props.placeLabel.location.coordinates[1]}
                  onChange={handleTextChange}
                ></input>
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                <label style={{ padding: "0px 20px" }}>y:</label>

                <input
                  style={{ width: "200px" }}
                  name="mapLng"
                  type="text"
                  value={props.placeLabel.location.coordinates[0]}
                  onChange={handleTextChange}
                ></input>
              </Row>
            </Col>
          </Row>

          <Row style={{ padding: "20px 0px 10px" }}>
            <label style={{ fontSize: "20px" }}>
              Or...You can select an existing place:
            </label>
          </Row>

          <Row style={{ width: "20em" }}>
            <Col style={{ padding: "0px" }}>
              <SelectionPlaceLabel
                externalDatasource={state.externalDataSource}
                value={state.selectedOption}
                onPlaceLabelChange={handlePlaceLabelChange}
              ></SelectionPlaceLabel>
            </Col>
          </Row>

          <Row
            style={{
              padding: "50px 0px 17px",
              width: "500px",
            }}
          >
            <Col style={{ padding: "0px" }}>
              <Button variant="primary" onClick={handlePlaceSave}>
                Save Place Label
              </Button>
            </Col>
            <Col style={{ padding: "0px 0px 0px 155px" }}>
              <Button
                variant="primary"
                onClick={() => handleDeleteLabel(props.placeLabel.name)}
              >
                Delete Place Label
              </Button>
            </Col>
          </Row>
          <Row>
            <label>
              Note: You can update the name or the location of an existing
              place!
            </label>
          </Row>
        </Col>
        <Col>
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
        </Col>
      </Row>
    </div>
  );
};

export default LabelMapping;
