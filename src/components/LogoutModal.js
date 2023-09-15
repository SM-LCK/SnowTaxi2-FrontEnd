import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

const LogoutModal = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("@accessToken");
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
          <h4>로그아웃 하시겠습니까?</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ㄱㄱ</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleLogout}>
          로그아웃
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
