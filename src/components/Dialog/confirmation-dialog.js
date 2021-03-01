import { Modal, Button } from "react-bootstrap";
import React from "react";

export const ConfirmationDialog = ({
  open,
  title,
  description,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal show={open}>
      <Modal.Header closeButton>
        <Modal.Title>{title || ""}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={onSubmit}>
          Ok
        </Button>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
