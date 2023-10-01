import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChattingComponent from "../components/ChattingComponent";

const MyChattingPage = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (localStorage.getItem("@token") == undefined) {
      alert(`로그인이 필요한 기능입니다!`);
      navigate("/Login");
    } else {
    }
  }, []);

  return (
    <div
      className="page"
      style={{ height: windowDimensions.height, width: "100%" }}
    >
      <div
        style={{
          marginTop: "40px",
          fontSize: "30px",
          fontWeight: "600",
          marginBottom: "40px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        채팅페이지
      </div>
    </div>
  );
};

export default MyChattingPage;
