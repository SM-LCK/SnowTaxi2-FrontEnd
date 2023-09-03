import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const EmailcheckPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // 정규 표현식을 사용하여 입력된 이메일을 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@sookmyung\.ac\.kr$/i;
    const isValidEmail = emailRegex.test(inputEmail);

    // 유효성 검사 결과를 상태에 저장
    setIsValid(isValidEmail);
  };

  const handleLogin = () => {
    // 임시로 성공 메시지 출력 후 홈 페이지로 이동하는 예제
    alert(`Email 성공! 이메일: ${email}`);
    navigate("/Signup");
  };
  return (
    <div className="page">
      <div
        style={{
          marginTop: "100px",
          fontSize: "26px",
          fontWeight: "700",
          color: "#262626",
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
        <div className="inputWrap">
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
            onChange={handleChange}
            placeholder="@sookmyung.ac.kr"
          />
        </div>
        {!isValid && (
          <p className="text-body-secondary" style={{ marginTop: "10px" }}>
            유효한 학교 이메일 주소를 입력하세요.
          </p>
        )}

        <div className="inputWrap">
          <input
            style={{
              width: "100%",
              outline: "none",
              border: "none",
              height: "25px",
              fontSize: "18px",
              fontWeight: "400",
            }}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="인증번호를 입력하세요"
          />
        </div>
        <div style={{ marginTop: "15px" }}>
          <Button variant="secondary">인증하기</Button>
        </div>

        <div className="d-grid gap-2" style={{ marginTop: "15px" }}>
          <Button variant="dark" size="lg" onClick={handleLogin}>
            다음
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "15px",
          }}
        >
          <p style={{}}>이미 회원이신가요?</p>
          <Link to="/Login">
            <p style={{ marginLeft: "10px" }}>로그인</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailcheckPage;
