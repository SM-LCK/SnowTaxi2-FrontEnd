import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { validEmail, validPassword } from "../components/RegEx";
import axios from "axios";

const LoginPage = () => {
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
    // navigate("/Home/TaxiRouteList");
    // const { data } = await axios.get("/api/test");
    // console.log(data);
  };

  const axioshandleLogin = async () => {
    // axios
    //   .get("/test", { withCredentials: true })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log("실패");
    //   });

    // const data = {
    //   email: email,
    //   password: password,
    // };

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/test`);
      // const response = await axios.post("/api/test", data);
      console.log("login: ", response.data);
      // const accessToken = response.data.token;
      // localStorage.setItem("@accessToken", accessToken);

      if (response.status == 200) {
        alert(`로그인 성공`);
        navigate("/Home/TaxiRouteList");
      } else {
        alert(`Login 실패`);
      }
    } catch (error) {
      console.log("fail", error);
      alert(`로그인 실패`);
    }

    // axios({
    //   method: "post",
    //   url: "http://localhost:9090/login/",
    //   data: {
    //     email: email,
    //     password: password,
    //   },
    //   headers: {'Content-type': 'application/json'}
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
        ❄️ 숙명 이메일과 <br /> 설정한 비밀번호를 입력하세요 ❄️
      </div>
      <div className="contentWrap">
        <div className="inputTitle"> 이메일 </div>
        <div className="inputWrap" style={{ marginTop: "10px" }}>
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            //onchange는 input의 입력이 끝났을 때 발생
            onChange={handleEmailChange}
          />
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
        {!isPasswordValid && (
          <p className="text-body-secondary" style={{ marginTop: "10px" }}>
            유효한 비밀번호를 입력하세요.
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
          }}
        >
          <p style={{}}>비밀번호를 잊어버리셨나요?</p>
          <Link to="/RePassword">
            <p style={{ marginLeft: "10px" }}>비밀번호 재설정</p>
          </Link>
        </div>

        <div className="d-grid gap-2" style={{ marginTop: "290px" }}>
          <Button variant="primary" size="lg" onClick={axioshandleLogin}>
            로그인
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
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
