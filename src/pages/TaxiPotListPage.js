import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import image from "../assets/taxipotlist.png";
import PotItemButton from "../components/PotItemButton";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MakepotModal from "../components/MakepotModal";

const TaxiPotListPage = () => {
  const { state } = useLocation();
  const id = state.id;

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

  const [modalShow, setModalShow] = useState(false);

  // const [timeValue, setTimeValue] = useState("");

  // const handleTimeChange = (newTimeValue) => {
  //   setTimeValue(newTimeValue);
  //   console.log(timeValue);
  // };

  // useEffect(() => {}, [timeValue]);

  return (
    <div
      className="page"
      // style={{
      //   postion: "absolute",
      //   width: "100%",
      //   maxWidth: "600px",
      //   padding: "0 50px",
      //   left: "50%",
      //   transform: "translate(-50%,0)",
      //   backgroundColor: "#f7f7f7",
      //   overflow: "scroll",
      //   bottom: "100vh",
      //   marginBottom: "100",
      // }}
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
            fontWeight: "700",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          {id} 🔜 후문
        </div>
        <img src={image} alt="지도" />
        <div style={{ fontSize: "23px", fontWeight: "700", marginTop: "20px" }}>
          {today}
        </div>
        <div style={{ marginTop: "5px", marginBottom: "15px" }}>
          오늘 탈 택시 팟에만 참여할 수 있어요. 🚖
          <br />
          모든 정산 금액은 기본 요금인 4800원입니다.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginBottom: "15px" }}>
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
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  //label="Controlled picker"
                  value={timeValue}
                  onChange={handleTimeChange}
                />
              </DemoContainer>
            </LocalizationProvider> */}
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
