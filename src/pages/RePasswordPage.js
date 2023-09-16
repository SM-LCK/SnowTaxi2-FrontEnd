import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validEmail } from "../components/RegEx";
import { Button } from "react-bootstrap";

const RePasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsEmailValid(validEmail.test(inputEmail));
  };

  const handleToLogin = () => {
    navigate("/");
  };

  const handleSendEmail = () => {
    alert(`이메일 전송`);
  };

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          style={{
            marginTop: "100px",
            fontSize: "30px",
            fontWeight: "700",
          }}
        >
          {" "}
          비밀번호 재설정
        </p>
        <p style={{ marginTop: "10px", fontSize: "18px" }}>
          비밀번호를 재설정 할 계정의 이메일 주소를 입력해주세요.
        </p>
      </div>

      <div className="inputWrap" style={{ marginTop: "30px" }}>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="@sookmyung.ac.kr"
        />
      </div>
      {!isEmailValid && (
        <p className="text-body-secondary" style={{ marginTop: "10px" }}>
          유효한 학교 이메일 주소를 입력하세요.
        </p>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div className="d-grid gap-2" style={{ marginRight: "20px" }}>
          <Button variant="dark" size="lg" onClick={handleSendEmail}>
            이메일 전송
          </Button>
        </div>

        <div className="d-grid gap-2" style={{}}>
          <Button variant="primary" size="lg" onClick={handleToLogin}>
            로그인 페이지
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RePasswordPage;
