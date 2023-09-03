import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import noonsong from "../assets/noonsong.png";
const SignupPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const randomImage = "../assets/noonsong.png";

  const handleLogin = () => {
    // 여기에서 로그인 로직을 구현하면 됩니다.
    // 예를 들어, 서버로 요청을 보내고 인증을 확인하거나
    // 로컬 스토리지 등을 사용하여 인증을 처리할 수 있습니다.

    // 임시로 성공 메시지 출력 후 홈 페이지로 이동하는 예제
    alert(`Signup 성공! ${nickname}`);
    navigate("/");
    // history.push("/home");
  };
  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <img src={noonsong} alt="랜덤 이미지" width={150} height={180} />
      </div>
      <div className="contentWrap">
        {/* <label htmlFor="email">이메일</label> */}
        <div className="inputTitle"> 닉네임 </div>
        <div className="inputWrap">
          <input
            className="input"
            // type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

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
            marginTop: "20px",
          }}
        >
          <p className="text-body-secondary" style={{}}>
            이미 회원이신가요?
          </p>
          <Link to="/Login">
            <p className="text-body-secondary" style={{ marginLeft: "10px" }}>
              로그인
            </p>
          </Link>
        </div>

        <div className="d-grid gap-2">
          <Button variant="dark" size="lg" onClick={handleLogin}>
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
