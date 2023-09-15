import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const PotModal = (props) => {
  const navigate = useNavigate();

  const handleParticipating = () => {
    navigate("/Home/Chatting");
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>자, 함께 출발해볼까요?</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>✔️ 주의사항</h5>
        <p>방에 참여하신 후, 노쇼를 하게 되시면 벌금이 부과될 수 있습니다.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleParticipating}>
          지금 참여하기
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PotModal;
