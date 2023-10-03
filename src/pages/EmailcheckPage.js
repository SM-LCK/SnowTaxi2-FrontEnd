import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import AlertModal from "../components/AlertModal";

const EmailcheckPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [isNextBtn, setIsNextBtn] = useState(false);
  const [alreadyModalShow, setAlreadyModalShow] = useState(false);
  const [alert, setAlert] = useState("");

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  const handleToNext = () => {
    const fullEmail = email + "@sookmyung.ac.kr";
    navigate("/Signup", { state: { email: fullEmail } });
  };

  const axiosCertificateEmail = async () => {
    const fullEmail = email + "@sookmyung.ac.kr";
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/email/auth`,
        params: { mail: fullEmail },
      }).then((response) => {
        console.log(response.data.data);
        console.log(response.data.code);
        setAlert(response.data.message);
        setAlreadyModalShow(true);

        if (response.data.code == 200) {
          setCertificateNumber(response.data.data);
        }
      });
    } catch (error) {
      console.log("fail get", error);
    }
  };

  const handleCertificateNumber = () => {
    if (certificateNumber == inputNumber) {
      setIsNextBtn(true);
      setAlert("인증 성공");
      setAlreadyModalShow(true);
    } else {
      setIsNextBtn(false);
      setAlert("인증 실패");
      setAlreadyModalShow(true);
    }
  };

  return (
    <>
      <BrowserView>
        <div className="page" style={{ padding: "0 500px" }}>
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
          <div className="contentWrap" style={{ marginTop: "80px" }}>
            <div className="inputTitle"> 이메일 </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="inputTitle"> 이메일 </div> */}
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  borderRadius: "20px",
                  padding: "16px",
                  border: "1px solid #e2e0e0",
                  backgroundColor: "#ffffff",
                  width: "70%",
                }}
              >
                <input
                  className="input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <div style={{ fontSize: "15px" }}>@sookmyung.ac.kr</div>
              </div>
              {/* </div> */}

              <Button variant="dark" onClick={axiosCertificateEmail}>
                보내기
              </Button>
            </div>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  borderRadius: "20px",
                  padding: "16px",
                  border: "1px solid #e2e0e0",
                  backgroundColor: "#ffffff",
                  width: "70%",
                }}
              >
                <input
                  style={{
                    width: "100%",
                    outline: "none",
                    border: "none",
                    height: "25px",
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                  //type="number"
                  id="inputNumber"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  placeholder="인증번호를 입력하세요"
                />
              </div>
              <Button
                style={{ backgroundColor: "#4274FF", borderColor: "#4274FF" }}
                size="md"
                onClick={handleCertificateNumber}
              >
                인증하기
              </Button>
            </div>

            <div
              className="d-grid gap-2"
              style={{ marginTop: "300px", marginBottom: "100px" }}
            >
              {!isNextBtn ? (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    setAlert("인증번호를 확인해주세요.");
                    setAlreadyModalShow(true);
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
      </BrowserView>
      <MobileView>
        <>
          <div className="page" style={{ padding: "0 30px" }}>
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
            <div className="contentWrap" style={{ marginTop: "80px" }}>
              <div className="inputTitle"> 이메일 </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="inputTitle"> 이메일 </div> */}
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    borderRadius: "20px",
                    padding: "16px",
                    border: "1px solid #e2e0e0",
                    backgroundColor: "#ffffff",
                    width: "70%",
                  }}
                >
                  <input
                    className="input"
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <div style={{ fontSize: "15px" }}>@sookmyung.ac.kr</div>
                </div>
                {/* </div> */}

                <Button variant="dark" onClick={axiosCertificateEmail}>
                  보내기
                </Button>
              </div>

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    borderRadius: "20px",
                    padding: "16px",
                    border: "1px solid #e2e0e0",
                    backgroundColor: "#ffffff",
                    width: "70%",
                  }}
                >
                  <input
                    style={{
                      width: "100%",
                      outline: "none",
                      border: "none",
                      height: "25px",
                      fontSize: "15px",
                      fontWeight: "400",
                    }}
                    //type="number"
                    id="inputNumber"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    placeholder="인증번호를 입력하세요"
                  />
                </div>
                <Button
                  style={{ backgroundColor: "#4274FF", borderColor: "#4274FF" }}
                  size="md"
                  onClick={handleCertificateNumber}
                >
                  인증하기
                </Button>
              </div>

              <div
                className="d-grid gap-2"
                style={{ marginTop: "300px", marginBottom: "100px" }}
              >
                {!isNextBtn ? (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      setAlert("인증번호를 확인해주세요.");
                      setAlreadyModalShow(true);
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
        </>
      </MobileView>
      <AlertModal
        show={alreadyModalShow}
        alertMessage={alert}
        onHide={() => setAlreadyModalShow(false)}
      />
    </>
  );
};

export default EmailcheckPage;
