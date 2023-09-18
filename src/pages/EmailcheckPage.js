import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { validEmail } from "../components/RegEx";
import axios from "axios";
import { AlternateEmail } from "@mui/icons-material";

const EmailcheckPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [isNextBtn, setIsNextBtn] = useState(false);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    // setIsEmailValid(validEmail.test(inputEmail));
  };

  const handleToNext = () => {
    const fullEmail = email + "@sookmyung.ac.kr";
    // 임시로 성공 메시지 출력 후 Signup으로 이동
    navigate("/Signup", { state: { email: fullEmail } });
  };

  const axiosCertificateEmail = async () => {
    const fullEmail = email + "@sookmyung.ac.kr";
    console.log(fullEmail);
    // const data = { mail: fullEmail };
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/email/auth`,
        params: { mail: fullEmail },
      }).then((response) => {
        // const response = await axios.post(
        //   `${process.env.REACT_APP_API_URL}/email/auth`,
        //   { params: { mail: fullEmail } }
        // );
        setCertificateNumber(response.data);

        if (response.status == 200) {
          alert(`인증메일 전송 성공`);
        } else {
          alert(`인증메일 전송 실패`);
        }
      });
    } catch (error) {
      console.log("fail get", error);
    }
  };

  const handleCertificateNumber = () => {
    if (certificateNumber == inputNumber) {
      setIsNextBtn(true);
      alert(`인증 성공`);
    } else {
      setIsNextBtn(false);
      alert(`인증 실패`);
    }
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
      <div className="contentWrap" style={{ marginTop: "50px" }}>
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
              //placeholder="@sookmyung.ac.kr"
            />
            <div style={{ fontSize: "18px" }}>@sookmyung.ac.kr</div>
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
                fontSize: "18px",
                fontWeight: "400",
              }}
              //type="number"
              id="inputNumber"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              placeholder="인증번호를 입력하세요"
            />
          </div>
          <Button variant="success" size="md" onClick={handleCertificateNumber}>
            인증하기
          </Button>
        </div>

        <div className="d-grid gap-2" style={{ marginTop: "400px" }}>
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
