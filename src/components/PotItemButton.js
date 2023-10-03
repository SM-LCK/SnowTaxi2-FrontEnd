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

  const participate = async () => {
    try {
      setModalShow(false)
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
            localStorage.setItem("@potId", potId);
            localStorage.setItem("@ridingTime", ridingTime);
            navigate("/Home/Chatting");
          } else {
            setAlreadyModalShow(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleParticipate = async () => {
    if (localStorage.getItem("@token") == undefined) {
      setLoginNeedModalShow(true);
    } else {
      if (headCount == 4) {
        alert(`이미 모집이 완료된 팟입니다.`);
      }
      else if (localStorage.getItem("@potId") != 0) {
        setAlreadyModalShow(true);
      } else {
        setModalShow(true);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f7f7f7",
        borderRadius: "15px",
        border: "none",
        height: "80px",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "13px",
            marginLeft: "20px",
            // marginTop: "15px",
            // marginBottom: "15px",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "600" }}>
            {ridingTime}
          </div>
          <div style={{}}>
            {Array(headCount).fill(<BsPersonFill size="20" color="black" />)}
            {Array(4 - headCount).fill(<BsPerson size="20" color="black" />)}
          </div>
        </div>
        <div
          style={{
            marginRight: "20px",
            marginTop: "23px",
            // marginTop: "15px",
            // marginBottom: "15px",
          }}
        >
          {participating ? (
            <Button variant="secondary" size="sm" onClick={handleParticipating}>
              참여중
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "#4274FF", borderColor: "#4274FF" }}
              size="sm"
              onClick={handleParticipate}
            >
              참여하기
            </Button>
          )}
          <CheckModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            main={ridingTime + "택시 팟에 참여하시겠습니까?"}
            sub="탑승 시간 3분 전까지만 팟에서 나갈 수 있습니다."
            check="참여하기"
            okAction={participate}
          />
          <CheckModal
            show={loginNeedModalShow}
            onHide={() => setLoginNeedModalShow(false)}
            main="로그인이 필요한 기능입니다."
            sub="로그인 페이지로 이동하시겠습니까?"
            check="확인"
            okAction={toLoginPage}
          />
          <AlertModal
            show={alreadyModalShow}
            alertMessage="이미 참여하고 있는 팟이 있습니다."
            onHide={() => setAlreadyModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default PotItemButton;
