import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LogoutModal = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/auth/logout`,
      }).then((response) => {
        console.log(response.data.data);
        console.log(response.data.code);
        alert(response.data.message);
        if (response.data.code == 200) {
          localStorage.removeItem("@token");
          navigate("/");
        }
      });
    } catch (error) {
      console.log("fail get", error);
    }
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
          <h4>로그아웃 하기</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>취소하려면 Close 버튼을 눌러주세요.</h5>
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
