import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

const AlertModal = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ textAlign: "center" }}>{props.alertMessage}</p>
          <Button
            size="md"
            style={{ backgroundColor: "#FF8642", borderColor: "#FF8642" }}
            onClick={props.onHide}
          >
            확인
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModal;
