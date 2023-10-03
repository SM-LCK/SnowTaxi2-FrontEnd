import Nav from "react-bootstrap/Nav";
import { BsHouse, BsPerson, BsListStars } from "react-icons/bs";
import React, { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

function BottomNav() {
  const [tabActive, setTabActive] = useState("tab1");
  return (
    <>
      <BrowserView>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Nav
            justify
            variant="tabs"
            style={{
              position: "fixed",
              zIndex: "1",
              width: "50%",
              bottom: 0,
              // backgroundColor: "#f7f7f7",
              height: "70px",
            }}
          >
            <Nav.Item onClick={() => setTabActive("tab1")}>
              <Nav.Link href="/">
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
        </div>
      </BrowserView>
      <MobileView>
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Nav
              justify
              variant="tabs"
              style={{
                position: "fixed",
                zIndex: "1",
                width: "100%",
                bottom: 0,
                backgroundColor: "#f7f7f7",
                height: "70px",
              }}
            >
              <Nav.Item onClick={() => setTabActive("tab1")}>
                <Nav.Link href="/">
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
          </div>
        </>
      </MobileView>
    </>
  );
}

export default BottomNav;
