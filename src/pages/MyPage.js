import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutModal from "../components/LogoutModal";
import { FiChevronRight } from "react-icons/fi";

const MyPage = () => {
  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [modalShow, setModalShow] = useState(false);

  // const getToken = async () => {
  //   try {
  //     const accessToken = await localStorage.getItem("@accessToken");
  //     if (accessToken != null) {
  //       try {
  //         axios({
  //           method: "get",
  //           url: "https://reqres.in/api/users/2",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }).then((response) => {
  //           console.log("res1 >>", response.data.data);
  //           console.log("res2 >>", response.data);
  //           setAvatar(response.data.data.avatar);
  //           setNickname(response.data.data.id);
  //         });
  //       } catch (error) {
  //         console.log("test err", error);
  //       }
  //     }
  //   } catch (e) {
  //     console.log("getData", e);
  //   }
  // };
  const getToken = async () => {
    try {
      axios({
        method: "get",
        url: "http://3.37.21.187:8080/test",
      }).then((response) => {
        console.log("res1 >>", response.data);
      });
    } catch (error) {
      console.log("test err", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

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
            fontSize: "25px",
            fontWeight: "700",
            marginBottom: "40px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          마이페이지
        </div>
        <div style={{ fontSize: "20px" }}>나의정보</div>
        <div>닉네임:{nickname}</div>
        <div>사진:{avatar}</div>
        <hr height="30px" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "20px" }}>참여내역</div>
          <FiChevronRight size="25" color="black" />
        </div>
        <hr height="30px" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "20px" }}>로그아웃</div>
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
          }}
        >
          <div style={{ fontSize: "20px" }}>회원탈퇴</div>
          <FiChevronRight size="25" color="black" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
