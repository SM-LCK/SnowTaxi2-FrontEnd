import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import PotModal from "./PotModal";
import AlertModal from "./AlertModal";
import CheckModal from "./CheckModal";

const PotItemButton = (data) => {
  const gettedData = data.data;
  //console.log("gettedData: ", gettedData);
  const [ridingTime, setRidingTime] = useState("");
  const [headCount, setHeadCount] = useState(0);
  const [participating, setParticipating] = useState(false);
  // const [storagePotId, setStoragePotId] = useState(0);
  const [potId, setPotId] = useState(0);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const [participateModalshow, setParticipateModalshow] = useState(false);
  const [alreadyModalShow, setAlreadyModalShow] = useState(false);
  const [loginNeedModalShow, setLoginNeedModalShow] = useState(false);


  const makeTime = (ridingTime) => {
    const timeArr = ridingTime.split(":");
    var ampm = "오전";
    var hour = timeArr[0];
    var min = timeArr[1];
    //console.log(hour, min);

    if (timeArr[0] >= 12) {
      ampm = "오후";
      if (timeArr[0] > 12) {
        hour = timeArr[0] - 12;
      }
    }
    const string = ampm + "   " + hour + ":" + min;
    //console.log(string);
    return string;
  };

  useEffect(() => {
    // if (localStorage.getItem("@potId") != undefined) {
    //   setStoragePotId(localStorage.getItem("@potId"));
    // }
    setPotId(gettedData.id);
    setRidingTime(makeTime(gettedData.ridingTime));
    setHeadCount(gettedData.headCount);
    setParticipating(gettedData.participating);
  }, []);

  const handleParticipating = () => {
    navigate("/Home/Chatting");
  };

  const toLoginPage = () => {
    setLoginNeedModalShow(false);
    navigate("/Login");
  };

  const handleParticipate = async () => {
    console.log("storage id: ", localStorage.getItem("@potId"));
    if (localStorage.getItem("@token") == undefined) {
      setLoginNeedModalShow(true);
    } else {
      if (headCount == 4) alert(`이미 모집이 완료된 팟입니다.`);
      else {
        try {
          axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/participation`,
            params: { potId: potId },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("@token")}`,
            },
          })
            .then((response) => {
              console.log("data: ", response.data.data); //참여가능 true,아니면 false
              if (response.data.data) {
                setModalShow(true);
                localStorage.setItem("@potId", potId);
                localStorage.setItem("@ridingTime", ridingTime);
                // setStoragePotId(potId);
              } else {
                setAlreadyModalShow(true)
                // alert(`이미 참여하는 팟이 있습니다.`);
                // setAlreadyModalShow(true)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <button
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        border: "none",
        height: "100px",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
          }}
        >
          <div
            style={{ marginBottom: "5px", fontSize: "20px", fontWeight: "600" }}
          >
            {ridingTime}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Array(headCount).fill(<BsPersonFill size="25" color="black" />)}
            {Array(4 - headCount).fill(<BsPerson size="25" color="black" />)}
          </div>
        </div>
        <div style={{ marginRight: "20px" }}>
          {participating ? (
            <Button variant="secondary" size="md" onClick={handleParticipating}>
              참여중
            </Button>
          ) : (
            <Button variant="primary" size="md" onClick={handleParticipate}>
              참여하기
            </Button>
          )}
          <PotModal show={modalShow} onHide={() => setModalShow(false)} />
          <CheckModal 
            show={loginNeedModalShow} 
            onHide={() => setLoginNeedModalShow(false)} 
            main="로그인이 필요한 기능입니다."
            sub="로그인 페이지로 이동하시겠습니까?"
            check="확인"
            okAction={toLoginPage}
          />
          <AlertModal show={alreadyModalShow} alertMessage="이미 참여하고 있는 팟이 있습니다." onHide={() => setAlreadyModalShow(false)} />
        </div>
      </div>
    </button>
  );
};

export default PotItemButton;
