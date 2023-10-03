import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import style from '../modules/login.module.css'
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
    <div className={style['login-wrap']}>
      <div className={style['login-html']}>
        <input id="tab-1"type="radio" name="tab" className={style['sign-in']} checked></input><label for="tab-1" className={style['tab']}>비밀번호 재설정</label>
        <div className={style['login-form']}>
            <div className={style['group']}>
              <label for="user" className={style['label']}>비밀번호를 재설정할 계정을 입력하세요.</label>
              <div className={style['input']}>
                <input id="user" type="email" className={style['email2']} value={email} onChange={handleEmailChange}></input>
                <label for="user" className={style['email']}>@sookmyung.ac.kr</label>
              </div>
            </div>
            <div className={style['group']}>
              <label className={style['label']}></label>
              <input type="submit" className={style['button']} value="이메일 전송" onClick={axiosSendEmail}></input>
            </div>
            <div className={style['hr']}></div>
            <div className={style['foot-lnk']}>
              <Link to="/Login">로그인 하러 가기</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RePasswordPage;
