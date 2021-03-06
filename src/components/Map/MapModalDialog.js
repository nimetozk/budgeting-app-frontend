/**
 * A dialog that displays the map and releted components for the users to choose a transaction location label.
 */

import { Button } from "react-bootstrap";
import React, { useState } from "react";
import LabelMapping from "./LabelMapping";

import Modal from "react-bootstrap/Modal";
import Draggable from "react-draggable";
import ModalDialog from "react-bootstrap/ModalDialog";
import { toast } from "react-toastify";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-title">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

export const MapModalDialog = ({ open, placeLabel, onSubmit, onClose }) => {
  const [placeLabelIn, setPlaceLabelIn] = useState(
    placeLabel ?? {
      name: "",
      location: {
        type: "Point",
        coordinates: [-0.12210937499999686, 51.509777971206304],
      },
    }
  );

  const handlePlaceLabelChange = (newPlaceLabel) => {
    setPlaceLabelIn(newPlaceLabel);
  };

  const handleOk = () => {
    if (!placeLabelIn || !placeLabelIn.name) {
      toast.error("Invalid place label !");
      return;
    }
    onSubmit(placeLabelIn);
  };

  return (
    <Modal show={open} size="xl" dialogAs={DraggableModalDialog}>
      <Modal.Header>
        <Modal.Title>{"Location Information"}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "20px 0px 0px " }}>
        <LabelMapping
          placeLabel={placeLabelIn}
          onPlaceLabelChange={handlePlaceLabelChange}
        ></LabelMapping>
      </Modal.Body>
      <Modal.Footer>
        <Button color="secondry" onClick={onClose}>
          Cancel
        </Button>
        <Button className="ok-btn" onClick={handleOk}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
