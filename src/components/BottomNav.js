import Nav from "react-bootstrap/Nav";
import {
  BsHouse,
  BsPerson,
  BsChatSquareText,
  BsListStars,
} from "react-icons/bs";
import React, { useState } from "react";
import { Navbar } from "react-bootstrap";

function BottomNav() {
  const [tabActive, setTabActive] = useState("tab1");
  console.log(tabActive);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* <Navbar bg="light" sticky="bottom"> */}
      <Nav
        justify
        variant="tabs"
        // defaultActiveKey="/Home/TaxiRouteList"
        style={{
          position: "fixed",
          zIndex: "1",
          width: "70%",
          bottom: 0,
          backgroundColor: "#f7f7f7",
          height: "70px",
        }}
      >
        <Nav.Item onClick={() => setTabActive("tab1")}>
          <Nav.Link href="/Home/TaxiRouteList">
            <BsHouse size="30" color="black" />
            <div style={{ color: "black" }}>홈</div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setTabActive("tab2")}>
          <Nav.Link href="/Home/Chatting">
            <BsListStars size="30" color="black" />
            <div style={{ color: "black" }}>내 방</div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setTabActive("tab3")}>
          <Nav.Link href="/Home/MyPage">
            <BsPerson size="30" color="black" />
            <div style={{ color: "black" }}>마이</div>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* </Navbar> */}
    </div>
  );
}

export default BottomNav;
