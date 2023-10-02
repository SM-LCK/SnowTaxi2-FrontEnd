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
        if (response.data.code == 200) {
          localStorage.removeItem("@token");
          localStorage.clear();
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
      centered
      style={{padding:"10px"}}
    >
      <Modal.Body>
        <div style={{textAlign:"center"}}>
          <br/>
          <h3>로그아웃 하시겠습니까?</h3>
          <p>로그아웃 하시면 메인 화면으로 이동합니다.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:"#757575", borderColor:"#757575"}} size="lg" onClick={props.onHide}>
          취소
        </Button>
        <Button style={{backgroundColor:"#FF8642", borderColor:"#FF8642"}} size="lg" onClick={handleLogout}>
          로그아웃
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
