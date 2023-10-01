import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutModal from "../components/LogoutModal";
import { FiChevronRight } from "react-icons/fi";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import ReactRoundedImage from "react-rounded-image";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
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

  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const images = [profile1, profile2, profile3, profile4];

  useEffect(() => {
    if (localStorage.getItem("@token") == undefined) {
      alert(`로그인이 필요한 기능입니다!`);
      navigate("/Login");
    } else {
      setNickname(localStorage.getItem("@nickname"));
      console.log("nickname", nickname);
      const randomIndex = Math.floor(Math.random() * images.length);
      const selectedImage = images[randomIndex];
      setAvatar(selectedImage);
    }
  }, []);

  const gotoChatting = () => {
    navigate("/Home/MyChatting");
  };

  return (
    <div
      className="page"
      style={{ height: windowDimensions.height, width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
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
          마이페이지
        </div>
        <div style={{ fontSize: "23px", fontWeight: "600" }}>나의정보</div>
        <div
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          <ReactRoundedImage
            image={avatar}
            // roundedColor="#2196F3"
            imageWidth="80"
            imageHeight="80"
            roundedSize="10"
            borderRadius="100"
          />
          <div style={{ fontSize: "18px", marginLeft: "20px" }}>
            {nickname} 님, 안녕하세요!
          </div>
        </div>

        <hr height="30px" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "600" }}>참여내역</div>
          <FiChevronRight size="25" color="black" onClick={gotoChatting} />
        </div>
        <hr height="30px" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "600" }}>로그아웃</div>
          <FiChevronRight
            size="25"
            color="black"
            onClick={() => setModalShow(true)}
          />
        </div>
        <LogoutModal show={modalShow} onHide={() => setModalShow(false)} />
        <hr height="30px" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "600" }}>회원탈퇴</div>
          <FiChevronRight size="25" color="black" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
