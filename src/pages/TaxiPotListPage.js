import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PotItemButton from "../components/PotItemButton";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MakepotModal from "../components/MakepotModal";
import sookmyung from "../assets/map_sookmyung.png";
import hyochang from "../assets/map_hyochang.png";
import seoul from "../assets/map_seoul.png";
import namyoung from "../assets/map_namyoung.png";
import axios from "axios";
import CheckModal from "../components/CheckModal";
import { BrowserView, MobileView } from "react-device-detect";

const TaxiPotListPage = () => {
  const navigate = useNavigate();
  const [makePotModalShow, setMakePotModalShow] = useState(false);
  const [length, setLength] = useState(0);
  const [dataArray, setDataArray] = useState([]);
  const { state } = useLocation();
  const [loginNeedModalShow, setLoginNeedModalShow] = useState(false);

  const id = state.id;

  useEffect(() => {
    if (localStorage.getItem("@token") == undefined) {
      noMemberAxios();
    } else {
      memberAxios();
    }
  }, [makePotModalShow]);

  // 생성하기,참여하기 버튼은 로그인됐을때만 가능
  const handleCreatePot = () => {
    if (localStorage.getItem("@token") == undefined) {
      setLoginNeedModalShow(true);
    } else {
      setMakePotModalShow(true);
    }
  };

  const toLoginPage = () => {
    setLoginNeedModalShow(false);
    navigate("/Login");
  };

  const noMemberAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/pot/default`,
        params: { departure: id },
      })
        .then((response) => {
          setDataArray(response.data.data);
          setLength(response.data.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const memberAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/pot/valid`,
        params: { departure: id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          setDataArray(response.data.data);
          setLength(response.data.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handledropDown = (eventKey) => {
    console.log(eventKey);
    window.location.reload();
  };

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
    <>
      <BrowserView>
        <div
          className="page"
          style={{ padding: "0 400px", paddingBottom: "200px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                fontSize: "23px",
                fontWeight: "700",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {id} → 후문
            </div>

            {id == "숙대입구역" ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={sookmyung}
                  alt="지도"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
            ) : id == "효창공원역" ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={hyochang}
                  alt="지도"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
            ) : id == "서울역" ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={seoul}
                  alt="지도"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={namyoung}
                  alt="지도"
                  style={{ width: "100%", height: "300px" }}
                />
              </div>
            )}

            <div
              style={{
                fontSize: "23px",
                fontWeight: "700",
                marginTop: "10px",
                textDecoration: "underline",
                textDecorationColor: "#80A1FF",
                textDecorationThickness: "3px",
              }}
            >
              {today}
            </div>
            <div
              style={{
                fontSize: "13px",
                marginBottom: "10px",
              }}
            >
              오늘 탈 택시 팟에만 참여할 수 있어요.
              <br />
              모든 정산 금액은 기본 요금인 4800원입니다.
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginBottom: "20px" }}>
                <DropdownButton
                  variant="secondary"
                  id="dropdown-basic-button"
                  title="정렬"
                  onSelect={handledropDown}
                  size="sm"
                >
                  <Dropdown.Item eventKey="item1">마감순</Dropdown.Item>
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
                <Button variant="dark" size="sm" onClick={handleCreatePot}>
                  + 팟 생성하기
                </Button>

                <MakepotModal
                  show={makePotModalShow}
                  onHide={() => setMakePotModalShow(false)}
                  id={id}
                />
              </div>
            </div>
            {length == 0 ? (
              <div
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
              </div>
            ) : (
              dataArray.map((data) => {
                return (
                  ///unique key prop 해결안됨
                  <div key={data.id}>
                    <PotItemButton data={data} />
                  </div>
                );
              })
            )}
          </div>
          <CheckModal
            show={loginNeedModalShow}
            onHide={() => setLoginNeedModalShow(false)}
            main="로그인이 필요한 기능입니다."
            sub="로그인 페이지로 이동하시겠습니까?"
            check="확인"
            okAction={toLoginPage}
          />
        </div>
      </BrowserView>
      <MobileView>
        <>
          <div className="page" style={{ paddingBottom: "150px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  fontSize: "20px",
                  fontWeight: "700",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {id} → 후문
              </div>

              {id == "숙대입구역" ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={sookmyung}
                    alt="지도"
                    style={{ width: "100%", height: "200px" }}
                  />
                </div>
              ) : id == "효창공원역" ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={hyochang}
                    alt="지도"
                    style={{ width: "100%", height: "200px" }}
                  />
                </div>
              ) : id == "서울역" ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={seoul}
                    alt="지도"
                    style={{ width: "100%", height: "200px" }}
                  />
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={namyoung}
                    alt="지도"
                    style={{ width: "100%", height: "200px" }}
                  />
                </div>
              )}
              <div style={{ padding: "0 40px" }}>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginTop: "10px",
                    textDecoration: "underline",
                    textDecorationColor: "#80A1FF",
                    textDecorationThickness: "3px",
                  }}
                >
                  {today}
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                    fontSize: "13px",
                  }}
                >
                  오늘 탈 택시 팟에만 참여할 수 있어요.
                  <br />
                  모든 정산 금액은 기본 요금인 4800원입니다.
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <DropdownButton
                      variant="secondary"
                      id="dropdown-basic-button"
                      title="정렬"
                      size="sm"
                      onSelect={handledropDown}
                    >
                      <Dropdown.Item eventKey="item1">마감순</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div>
                    <Button variant="dark" size="sm" onClick={handleCreatePot}>
                      + 팟 생성하기
                    </Button>

                    <MakepotModal
                      show={makePotModalShow}
                      onHide={() => setMakePotModalShow(false)}
                      id={id}
                    />
                  </div>
                </div>
                {length == 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "70px",
                      fontSize: "13px",
                    }}
                  >
                    아직 모집 중인 팟이 없습니다.
                    <br />
                    팟을 만들어보세요!
                  </div>
                ) : (
                  dataArray.map((data) => {
                    return (
                      ///unique key prop 해결안됨
                      <div key={data.id}>
                        <PotItemButton data={data} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <CheckModal
              show={loginNeedModalShow}
              onHide={() => setLoginNeedModalShow(false)}
              main="로그인이 필요한 기능입니다."
              sub="로그인 페이지로 이동하시겠습니까?"
              check="확인"
              okAction={toLoginPage}
            />
          </div>
        </>
      </MobileView>
    </>
  );
};

export default TaxiPotListPage;
