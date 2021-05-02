/**
 * A component rendered on the 'Transactions' table to enable
 * users to add or delete the location information.
 */

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

  const handleDelete = async () => {
    props.onPlaceLabelChanged(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <FormControl
          style={{ width: "200px" }}
          readOnly
          name="lat"
          value={props.placeLabel?.name ?? ""}
        />

        <Button
          size="sm"
          style={{ width: "100px", padding: "0px 10px" }}
          onClick={handleOpenDialog}
        >
          Add
        </Button>
        {open && (
          <MapModalDialog
            placeLabel={props.placeLabel}
            open
            onSubmit={handleSubmit}
            onClose={handleClose}
          ></MapModalDialog>
        )}
        <Button
          size="sm"
          style={{ width: "100px" }}
          onClick={() => {
            handleDelete(props.transactionId);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MapButtonEdit;
