import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const LoginPage = () => {
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
    // 여기에서 로그인 로직을 구현하면 됩니다.
    // 예를 들어, 서버로 요청을 보내고 인증을 확인하거나
    // 로컬 스토리지 등을 사용하여 인증을 처리할 수 있습니다.

    // 임시로 성공 메시지 출력 후 홈 페이지로 이동하는 예제
    alert(`Login 성공! 이메일: ${email}`);
    navigate("/");
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
        ❄️ 숙명 이메일과 <br /> 설정한 비밀번호를 입력하세요 ❄️
      </div>
      <div className="contentWrap">
        {/* <label htmlFor="email">이메일</label> */}
        <div className="inputTitle"> 이메일 </div>
        <div className="inputWrap">
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        {!isValid && (
          <p className="text-body-secondary" style={{ marginTop: "10px" }}>
            유효한 학교 이메일 주소를 입력하세요.
          </p>
        )}

        {/* <label htmlFor="password">비밀번호</label> */}
        <div style={{ marginTop: "30px" }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "15px",
          }}
        >
          <p style={{}}>비밀번호를 잊어버리셨나요?</p>
          <Link to="/">
            <p style={{ marginLeft: "10px" }}>비밀번호 찾기</p>
          </Link>
        </div>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={handleLogin}>
            로그인
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "15px",
          }}
        >
          <p style={{}}>아직 회원이 아니신가요?</p>
          <Link to="/Emailcheck">
            <p style={{ marginLeft: "10px" }}>회원가입</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
