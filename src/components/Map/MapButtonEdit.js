import { Button } from "react-bootstrap";
import react, { useState } from "react";
import { MapModalDialog } from "./MapModalDialog";

const MapButtonEdit = (props) => {
  const [placeLabel, setPlaceLabel] = useState(props.placeLabel);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleSubmit = (newPlaceLabel) => {
    setPlaceLabel(newPlaceLabel);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input name="lng" value={props.placeLabel.location.coordinates[0]} />
      <input name="lat" value={props.placeLabel.location.coordinates[1]} />
      <Button onClick={handleOpenDialog}>...</Button>

      {open && (
        <MapModalDialog
          placeLabel={placeLabel}
          open
          onSubmit={handleSubmit}
          onClose={handleClose}
        ></MapModalDialog>
      )}
    </div>
  );
};

export default MapButtonEdit;
