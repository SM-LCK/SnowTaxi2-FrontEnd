import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { validEmail, validPassword } from "../components/RegEx";
import axios from "axios";

const LoginPage = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsEmailValid(validEmail.test(inputEmail));
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    setIsPasswordValid(validPassword.test(inputPassword));
  };

  const handleLogin = async () => {
    // 임시로 성공 메시지 출력 후 홈 페이지로 이동하는 예제
    // alert(`Login 성공! 이메일: ${email}`);
    navigate("/Home/TaxiRouteList");
  };

  const axioshandleLogin = async () => {
    const fullEmail = email + "@sookmyung.ac.kr";
    const data = {
      email: email,
      password: password,
    };

    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/auth/login`,
        data: {
          email: fullEmail,
          password: password,
        },
      }).then((response) => {
        console.log("res: ", response);

        if (response.data == "home") {
          /*
          const accessToken = response.data.token;
          console.log(response.data.token);
          localStorage.setItem("@accessToken", accessToken);
        */
          alert(`로그인 성공!`);
          navigate("/Home/TaxiRouteList");
        } else {
          alert(`로그인 실패`);
        }
      });
    } catch (error) {
      console.log("test err", error);
    }
  };

  return (
    <div
      className="page"
      style={{ height: windowDimensions.height, width: "100%" }}
    >
      <div
        style={{
          marginTop: "100px",
          fontSize: "30px",
          fontWeight: "600",
        }}
      >
        ❄️ 숙명 이메일 로그인 ❄️
      </div>
      <div className="contentWrap" style={{ marginTop: "50px" }}>
        <div className="inputTitle"> 이메일 </div>
        <div className="inputWrap" style={{ marginTop: "10px" }}>
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <div style={{ fontSize: "15px" }}>@sookmyung.ac.kr</div>
        </div>
        {!isEmailValid && (
          <p className="text-body-secondary" style={{ marginTop: "10px" }}>
            유효한 학교 이메일 주소를 입력하세요.
          </p>
        )}

        <div className="inputTitle" style={{ marginTop: "30px" }}>
          비밀번호
        </div>
        <div className="inputWrap" style={{ marginTop: "10px" }}>
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
          }}
        >
          <p> 비밀번호를 잊어버리셨나요?</p>
          <Link to="/RePassword">
            <p style={{ marginLeft: "10px" }}>비밀번호 재설정</p>
          </Link>
        </div>

        <div className="d-grid gap-2" style={{ marginTop: "300px" }}>
          <Button variant="primary" size="lg" onClick={axioshandleLogin}>
            로그인
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
            marginBottom: "100px",
          }}
        >
          <p>아직 회원이 아니신가요?</p>
          <Link to="/Emailcheck">
            <p style={{ marginLeft: "10px" }}>회원가입</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
