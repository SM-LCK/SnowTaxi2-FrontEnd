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
import { useLocation } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

const SignupPage = () => {
  const { state } = useLocation();
  const email = state.email;

  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isNicknameCheck, setIsNicknameCheck] = useState(false);
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

  const handleNicknameCheck = (e) => {
    //중복체크 메서드
    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/auth/nicknameCheck`,
        params: { nickname: nickname },
      })
        .then((response) => {
          console.log(response.data.data);
          console.log(response.data.code);
          alert(response.data.message);
          if (response.data.code == 200) {
            setIsNicknameCheck(true);
          }
        })
        .catch(function (error) {
          if (error.response) {
            alert("dd");
          }
        });
    } catch (error) {
      console.log("fail get", error);
    }
  };

  const axioshandleSignup = async () => {
    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/auth/signUp`,
        data: {
          nickname: nickname,
          email: email,
          password: password,
        },
      })
        .then(function (response) {
          alert(response.data.message);
          if (response.data.code == 200) {
            navigate("/Login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log("signup err", error);
    }
  };

  return (
    <>
      <BrowserView>
        <div className="page" style={{ padding: "0 500px" }}>
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
          </div>

          <div className="contentWrap" style={{ marginTop: "30px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="inputTitle"> 닉네임 </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  borderRadius: "20px",
                  padding: "16px",
                  border: "1px solid #e2e0e0",
                  backgroundColor: "#ffffff",
                  width: "100%",
                }}
              >
                <input
                  className="input"
                  // type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: "15px",
                alignItems: "center",
              }}
            >
              <Button
                variant="secondary"
                size="md"
                onClick={handleNicknameCheck}
              >
                중복체크
              </Button>
              {isNicknameCheck && (
                <p className="text-body-secondary">사용가능한 닉네임입니다.</p>
              )}
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
                placeholder="알파벳과 숫자를 포함한 8글자 이상"
                onChange={handlePasswordChange}
              />
            </div>
            {!isPasswordValid && (
              <p className="text-body-secondary" style={{ marginTop: "10px" }}>
                유효한 비밀번호를 입력하세요.
              </p>
            )}

            <div
              style={{ marginTop: "20px", marginBottom: "10px" }}
              className="inputTitle"
            >
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

            <div className="d-grid gap-2" style={{ marginTop: "150px" }}>
              <Button variant="dark" size="lg" onClick={axioshandleSignup}>
                회원가입
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
              <p>이미 회원이신가요?</p>
              <Link to="/">
                <p style={{ marginLeft: "10px" }}>로그인</p>
              </Link>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <>
          <div className="page" style={{ padding: "0 30px" }}>
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
            </div>

            <div className="contentWrap" style={{ marginTop: "30px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="inputTitle"> 닉네임 </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    borderRadius: "20px",
                    padding: "16px",
                    border: "1px solid #e2e0e0",
                    backgroundColor: "#ffffff",
                    width: "100%",
                  }}
                >
                  <input
                    className="input"
                    // type="text"
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: "15px",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleNicknameCheck}
                >
                  중복체크
                </Button>
                {isNicknameCheck && (
                  <p className="text-body-secondary">
                    사용가능한 닉네임입니다.
                  </p>
                )}
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
                  placeholder="알파벳과 숫자를 포함한 8글자 이상"
                  onChange={handlePasswordChange}
                />
              </div>
              {!isPasswordValid && (
                <p
                  className="text-body-secondary"
                  style={{ marginTop: "10px" }}
                >
                  유효한 비밀번호를 입력하세요.
                </p>
              )}

              <div
                style={{ marginTop: "20px", marginBottom: "10px" }}
                className="inputTitle"
              >
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
                <p
                  className="text-body-secondary"
                  style={{ marginTop: "10px" }}
                >
                  다시 확인해주세요.
                </p>
              )}

              <div className="d-grid gap-2" style={{ marginTop: "150px" }}>
                <Button variant="dark" size="lg" onClick={axioshandleSignup}>
                  회원가입
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
                <p>이미 회원이신가요?</p>
                <Link to="/">
                  <p style={{ marginLeft: "10px" }}>로그인</p>
                </Link>
              </div>
            </div>
          </div>
        </>
      </MobileView>
    </>
  );
};

export default SignupPage;
