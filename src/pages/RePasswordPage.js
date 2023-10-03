import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import AlertModal from "../components/AlertModal";

const RePasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [alreadyModalShow, setAlreadyModalShow] = useState(false);
  const [alert, setAlert] = useState("");

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  const handleToLogin = () => {
    navigate("/Login");
  };

  const axiosSendEmail = async () => {
    const fullEmail = email + "@sookmyung.ac.kr";
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/email/password`,
        params: { mail: fullEmail },
      }).then((response) => {
        setAlert(response.data.message);
        setAlreadyModalShow(true);
      });
    } catch (error) {
      console.log("fail get", error);
    }
  };

  return (
    <>
      <BrowserView>
        <div className="page" style={{ padding: "0 500px" }}>
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
            />
            <div style={{ fontSize: "15px" }}>@sookmyung.ac.kr</div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <div className="d-grid gap-2" style={{ marginRight: "20px" }}>
              <Button variant="dark" size="lg" onClick={axiosSendEmail}>
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
      </BrowserView>
      <MobileView>
        <>
          <div className="page" style={{ padding: "0 30px" }}>
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
              />
              <div style={{ fontSize: "15px" }}>@sookmyung.ac.kr</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <div className="d-grid gap-2" style={{ marginRight: "20px" }}>
                <Button variant="dark" size="lg" onClick={axiosSendEmail}>
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

export default RePasswordPage;
