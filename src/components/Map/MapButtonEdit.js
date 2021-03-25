import { Button, FormControl, InputGroup } from "react-bootstrap";
import react, { useState } from "react";
import { MapModalDialog } from "./MapModalDialog";

const MapButtonEdit = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleSubmit = (newPlaceLabel) => {
    setOpen(false);
    if (props.onPlaceLabelChanged) props.onPlaceLabelChanged(newPlaceLabel);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/*
          <FormControl
            readOnly
            style={{ height: "50px" }}
            name="lng"
            value={
              props.placeLabel ? props.placeLabel.location.coordinates[0] : ""
            }
          />
          */}
          <FormControl
            readOnly
            style={{ height: "50px" }}
            name="lat"
            value={props.placeLabel?.name}
          />
        </div>

        <InputGroup.Append>
          <Button onClick={handleOpenDialog}>Add</Button>
          {open && (
            <MapModalDialog
              placeLabel={props.placeLabel}
              open
              onSubmit={handleSubmit}
              onClose={handleClose}
            ></MapModalDialog>
          )}
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default MapButtonEdit;
