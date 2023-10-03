import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CheckModal = (props) => {
  const navigate = useNavigate();

  return (
    <Modal
      {...props}
      size="md"
      centered
      style={{padding:"10px"}}
    >
      <Modal.Body>
        <div style={{textAlign:"center"}}>
          <br/>
          <h3>{props.main}</h3>
          <p>{props.sub}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:"#757575", borderColor:"#757575"}} size="lg" onClick={props.onHide}>
          취소
        </Button>
        <Button style={{backgroundColor:"#FF8642", borderColor:"#FF8642"}} size="lg" onClick={props.okAction}>
          {props.check}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckModal;
