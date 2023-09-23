import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PotItemButton from "../components/PotItemButton";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MakepotModal from "../components/MakepotModal";
import sookmyung from "../assets/map_sookmyung.jpeg";
import hyochang from "../assets/map_hyochang.jpeg";
import seoul from "../assets/map_seoul.jpeg";
import namyoung from "../assets/map_namyoung.jpeg";
import axios from "axios";

const TaxiPotListPage = () => {
  const { state } = useLocation();
  const id = state.id;
  console.log(id);

  const axiosDeparture = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/pot`,
        params: { departure: id },
      }).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log("fail get", error);
    }
  };

  // useEffect(() => {
  //   axiosDeparture();
  // }, []);

  const [modalShow, setModalShow] = useState(false);

  const currentdate = new Date();
  const year = currentdate.getFullYear();
  const month = currentdate.getMonth() + 1;
  const date = currentdate.getDate();
  let day;
  let week = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  for (let i = 0; i <= 6; i++) {
    if (currentdate.getDay() == i) {
      day = week[i];
    }
  }
  const today = `${year}.${month}.${date} ${day}`;

  return (
    <div
      className="page"
      style={{
        postion: "absolute",
        width: "100%",
        height: "100%",
        padding: "0 450px",
        backgroundColor: "#f7f7f7",
        paddingBottom: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginTop: "25px",
            marginBottom: "25px",
            fontSize: "28px",
            fontWeight: "600",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          {id} 🔜 후문
        </div>

        {id == "숙대입구역" ? (
          <img src={sookmyung} alt="지도" />
        ) : id == "효창공원앞역" ? (
          <img src={hyochang} alt="지도" />
        ) : id == "서울역" ? (
          <img src={seoul} alt="지도" />
        ) : (
          <img src={namyoung} alt="지도" />
        )}

        <div style={{ fontSize: "23px", fontWeight: "600", marginTop: "15px" }}>
          {today}
        </div>
        <div style={{ marginTop: "5px", marginBottom: "15px" }}>
          오늘 탈 택시 팟에만 참여할 수 있어요.
          <br />
          모든 정산 금액은 기본 요금인 4800원입니다.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginBottom: "20px" }}>
            <DropdownButton
              variant="secondary"
              id="dropdown-basic-button"
              title="마감순"
            >
              <Dropdown.Item href="#/action-1">최신 생성순</Dropdown.Item>
            </DropdownButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "15px",
              alignItems: "center",
            }}
          >
            <Button variant="dark" size="md" onClick={() => setModalShow(true)}>
              + 팟 생성하기
            </Button>

            <MakepotModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          아직 모집 중인 팟이 없습니다.
          <br />
          팟을 만들어보세요!
        </div> */}
        <PotItemButton />
        <PotItemButton />
        <PotItemButton />
        <PotItemButton />
        <PotItemButton />
        <PotItemButton />
        <PotItemButton />
      </div>
    </div>
  );
};

export default TaxiPotListPage;
