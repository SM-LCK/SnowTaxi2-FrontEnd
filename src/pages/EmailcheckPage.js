import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { validEmail } from "../components/RegEx";

const EmailcheckPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNextBtn, setIsNextBtn] = useState(false);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsEmailValid(validEmail.test(inputEmail));
  };

  const handleToNext = () => {
    // 임시로 성공 메시지 출력 후 Signup으로 이동
    navigate("/Signup");
  };

  const handleCertification = () => {
    alert(`인증번호 확인`);
    setIsNextBtn(true);
  };

  return (
    <div className="page">
      <div
        style={{
          marginTop: "100px",
          fontSize: "30px",
          fontWeight: "700",
        }}
      >
        ❄️ 숙명 이메일 인증 ❄️
      </div>
      <p style={{ marginTop: "10px" }}>
        숙명여대 학생들만 이용 가능한 서비스입니다.
      </p>
      <div className="contentWrap">
        {/* <label htmlFor="email">이메일</label> */}
        <div className="inputTitle"> 이메일 </div>
        <div className="inputWrap" style={{ marginTop: "10px" }}>
          <input
            style={{
              width: "100%",
              outline: "none",
              border: "none",
              height: "25px",
              fontSize: "18px",
              fontWeight: "400",
            }}
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

        <div className="inputWrap" style={{ marginTop: "30px" }}>
          <input
            style={{
              width: "100%",
              outline: "none",
              border: "none",
              height: "25px",
              fontSize: "18px",
              fontWeight: "400",
            }}
            //type="number"
            //id="password"
            //value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="인증번호를 입력하세요"
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button variant="dark" onClick={handleCertification}>
            인증하기
          </Button>
        </div>

        <div className="d-grid gap-2" style={{ marginTop: "335px" }}>
          {!isNextBtn ? (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                alert(`인증번호를 확인해주세요.`);
              }}
            >
              다음
            </Button>
          ) : (
            <Button variant="dark" size="lg" onClick={handleToNext}>
              다음
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailcheckPage;
