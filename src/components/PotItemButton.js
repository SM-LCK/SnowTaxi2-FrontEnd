import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import PotModal from "./PotModal";

const PotItemButton = () => {
  const [modalShow, setModalShow] = useState(false);

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
            오전 10:40
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsPerson size="25" color="black" />
            <BsPersonFill size="25" color="black" />
            <BsPersonFill size="25" color="black" />
            <BsPersonFill size="25" color="black" />
          </div>
        </div>
        <div style={{ marginRight: "20px" }}>
          <Button
            variant="primary"
            size="md"
            onClick={() => setModalShow(true)}
          >
            참여하기
          </Button>
          <PotModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      </div>
    </button>
  );
};

export default PotItemButton;
