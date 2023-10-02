import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import PotModal from "./PotModal";
import AlertModal from "./AlertModal";
import CheckModal from "./CheckModal";

const HistoryItem = (data) => {
    const navigate = useNavigate();
    const gettedData = data.data;
    // const [ridingDate, setRidingDate] = useState(gettedData.ridingDate);
    // const [ridingTime, setRidingTime] = useState(gettedData.ridingTime);
    // const [headCount, setHeadCount] = useState(0);
    // const [potId, setPotId] = useState(0);
    // const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
    }, []);

    const goToChatting = () => {
        // navigate("/");
    };

  return (
    <button
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        border: "none",
        height: "120px",
        width: "700px",
        margin: "15px",
      }}
      onClick={goToChatting}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
          }}
        >
          <div
            style={{ marginBottom: "5px", fontSize: "25px", fontWeight: "bolder" }}
          >
            {gettedData.ridingDate + "  " + gettedData.ridingTime}
          </div>
          <div
            style={{
              display: "flex",
            //   justifyContent: "center",
              alignItems: "center",
              flexDirection:"row"
            }}
          >
            {Array(gettedData.headCount).fill(<BsPersonFill size="25" color="black" />)}
          </div>
        </div>
      </div>
    </button>
  );
};

export default HistoryItem;
