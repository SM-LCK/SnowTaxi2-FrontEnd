import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CheckModal = (props) => {
  const navigate = useNavigate();

  return (
    <Modal {...props} size="sm" centered style={{ padding: "10px" }}>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <br />
          <h4>{props.main}</h4>
          <p>{props.sub}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          // style={{ backgroundColor: "#757575", borderColor: "#757575" }}
          size="md"
          onClick={props.onHide}
        >
          취소
        </Button>
        <Button
          style={{ backgroundColor: "#FF8642", borderColor: "#FF8642" }}
          size="md"
          onClick={props.okAction}
        >
          {props.check}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckModal;
