import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { validPassword } from "../components/RegEx";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import ReactRoundedImage from "react-rounded-image";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const images = [profile1, profile2, profile3, profile4];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    setAvatar(selectedImage);
  }, []);

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    setIsPasswordValid(validPassword.test(inputPassword));
  };

  const handleCheckPasswordChange = (e) => {
    const inputCheckPassword = e.target.value;
    setCheckPassword(inputCheckPassword);
  };

  useEffect(() => {
    setIsPasswordMatch(password === checkPassword);
  }, [password, checkPassword]);

  const handleSignup = () => {
    alert(`Signup 성공! ${nickname}`);
    navigate("/Home/TaxiRouteList");
  };

  const axioshandleSignup = async () => {
    const data = {
      nickname: nickname,
      password: password,
      avatar: avatar,
    };
    try {
      const response = await axios.post("http://localhost:9090/signup/", data);
      console.log("signup: ", response.data);
      if (response.status == 200) {
        alert(`Signup 성공!`);
        navigate("/TaxiRouteList");
      } else {
        alert(`Signup 실패`);
      }
    } catch (error) {
      console.log("fail", error);
    }
  };

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "60px",
        }}
      >
        <ReactRoundedImage
          image={avatar}
          roundedColor="#2196F3"
          imageWidth="180"
          imageHeight="180"
          roundedSize="10"
          borderRadius="100"
        />

        {/*<img src={profileImg} alt="랜덤 이미지" width={180} height={180} />*/}
      </div>
      <div className="contentWrap">
        <div className="inputTitle"> 닉네임 </div>
        <div className="inputWrap" style={{ marginTop: "10px" }}>
          <input
            className="input"
            // type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "50px" }} className="inputTitle">
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

        <div style={{ marginTop: "10px" }} className="inputTitle">
          비밀번호 확인
        </div>
        <div className="inputWrap" style={{ marginTop: "10px" }}>
          <input
            className="input"
            type="password"
            id="checkPassword"
            value={checkPassword}
            onChange={handleCheckPasswordChange}
          />
        </div>
        {!isPasswordMatch && (
          <p className="text-body-secondary" style={{ marginTop: "10px" }}>
            다시 확인해주세요.
          </p>
        )}

        <div className="d-grid gap-2" style={{ marginTop: "163px" }}>
          <Button variant="dark" size="lg" onClick={handleSignup}>
            회원가입
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
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

export default SignupPage;
