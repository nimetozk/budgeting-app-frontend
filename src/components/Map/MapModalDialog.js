import { Button } from "react-bootstrap";
import React, { useState } from "react";
import LabelMapping from "./LabelMapping";

import Modal from "react-bootstrap/Modal";
import Draggable from "react-draggable";
import ModalDialog from "react-bootstrap/ModalDialog";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-title">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

export const MapModalDialog = ({
  open,
  title,
  placeLabel,
  onSubmit,
  onClose,
}) => {
  const [placeLabelIn, setPlaceLabelIn] = useState(
    placeLabel ?? {
      name: "",
      location: { type: "Point", coordinates: [52.04, -0.21] },
    }
  );

  const handlePlaceLabelChange = (newPlaceLabel) => {
    setPlaceLabelIn(newPlaceLabel);
  };

  return (
    <Modal show={open} size="lg" dialogAs={DraggableModalDialog}>
      <Modal.Header>
        <Modal.Title>{title || ""}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <LabelMapping
          placeLabel={placeLabelIn}
          onPlaceLabelChange={handlePlaceLabelChange}
        ></LabelMapping>
      </Modal.Body>

      <Modal.Footer>
        <Button color="secondry" onClick={onClose}>
          Cancel
        </Button>
        <Button className="ok-btn" onClick={() => onSubmit(placeLabelIn)}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
