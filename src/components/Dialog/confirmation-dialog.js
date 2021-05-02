/**
 * This is the pop-up window displayed to the users.
 * The information to be displayed is provided with 'dialog-provided.js'
 *
 */

import { Modal, Button } from "react-bootstrap";
import React from "react";
import "./confirmation-dialog.css";

export const ConfirmationDialog = ({
  open,
  title,
  description,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>{title || ""}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{description}</Modal.Body>

      <Modal.Footer>
        <Button color="secondry" onClick={onClose}>
          Cancel
        </Button>
        <Button className="ok-btn" onClick={onSubmit}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
