import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import style from '../modules/login.module.css'
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
    <div className={style['login-wrap']}>
      <div className={style['login-html']}>
        <input id="tab-1"type="radio" name="tab" className={style['sign-in']}></input><Link to="/Login"><label for="tab-1" className={style['tab']}>로그인</label></Link>
        <input id="tab-2"type="radio" name="tab" className={style['sign-up']} checked></input><label for="tab-1" className={style['tab']}>회원가입</label>
        <div className={style['login-form']}>
            <div className={style['group']}>
              <label for="user" className={style['label']}>숙명 이메일로 인증하기</label>
              <div className={style['input']}>
                <input id="user" type="email" className={style['email2']} value={email} onChange={handleEmailChange}></input>
                <label for="user" className={style['email']}>@sookmyung.ac.kr</label>
              </div>
            </div>
            <div align="right" className={style['group']}>
                <Button variant="dark" className={style['button2']} onClick={axiosCertificateEmail}>
                  보내기
                </Button>
            </div>
            <div className={style['group']}>
              <input id="pass" type="password" className={style['input']} value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  placeholder="인증번호를 입력하세요"></input>
            </div>
            <div align="right" className={style['group']}>
                <Button variant="success" className={style['button2']} onClick={handleCertificateNumber}>
                  인증하기
                </Button>
            </div>
            <div className={style['group']}>
              <label className={style['label']}></label>
              <input type="submit" className={style['button']} value="다음" onClick={handleToNext}></input>
            </div>
            <div className={style['hr']}></div>
            <div className={style['foot-lnk']}>
              <Link to="/Login">이미 회원이신가요?</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmailcheckPage;
