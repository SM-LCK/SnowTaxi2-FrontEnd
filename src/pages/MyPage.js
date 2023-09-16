import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutModal from "../components/LogoutModal";
import { FiChevronRight } from "react-icons/fi";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import ReactRoundedImage from "react-rounded-image";

const MyPage = () => {
  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const images = [profile1, profile2, profile3, profile4];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    setAvatar(selectedImage);
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const accessToken = await localStorage.getItem("@accessToken");
      if (accessToken != null) {
        try {
          axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/test`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((response) => {
            console.log("res: ", response.data);

            //setNickname(response.data.data.id);
          });
        } catch (error) {
          console.log("test err", error);
        }
      }
    } catch (e) {
      console.log("getData", e);
    }
  };

  // useEffect(() => {
  //   getToken();
  // }, []);

  return (
    <div className="page">
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
            fontWeight: "700",
            marginBottom: "40px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          마이페이지
        </div>
        <div style={{ fontSize: "23px", fontWeight: "700" }}>나의정보</div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
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
          <div style={{ fontSize: "20px", marginLeft: "20px" }}>
            송이님, 안녕하세요!
          </div>
        </div>

        <hr height="30px" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "23px", fontWeight: "700" }}>참여내역</div>
          <FiChevronRight size="25" color="black" />
        </div>
        <hr height="30px" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "23px", fontWeight: "700" }}>로그아웃</div>
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
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "23px", fontWeight: "700" }}>회원탈퇴</div>
          <FiChevronRight size="25" color="black" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
