import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sookmyung from "../assets/sookmyung.png";
import hyochang from "../assets/hyochang.png";
import seoul from "../assets/seoul.png";
import namyoung from "../assets/namyoung.png";

const TaxiRouteListPage = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const handleRouteClick = (e, message) => {
    navigate("/Home/TaxiPotList", { state: { id: message } });
  };

  return (
    <div
      className="page"
      // style={{
      //   //  height: windowDimensions.height,
      //   height: "100%",
      //   width: "100%",
      // }}
      style={{
        postion: "absolute",
        width: "100%",
        height: "100%",
        padding: "0 500px",
        backgroundColor: "#f7f7f7",
        paddingBottom: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "40px",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          출발지
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          <div>도착지는 숙대입구 후문입니다.</div>
          <div>출발지를 선택해주세요.</div>
        </div>
      </div>

      <div
        className="container"
        style={{ marginTop: "20px", marginBottom: "100px" }}
      >
        <div style={{ marginTop: "40px" }}>
          <img
            src={sookmyung}
            alt="숙명"
            onClick={(e) => handleRouteClick(e, "숙대입구역")}
          />
        </div>
        <div style={{ marginTop: "40px" }}>
          <img
            src={hyochang}
            alt="효창"
            onClick={(e) => handleRouteClick(e, "효창공원역")}
          />
        </div>
        <div style={{ marginTop: "40px" }}>
          <img
            src={seoul}
            alt="서울"
            onClick={(e) => handleRouteClick(e, "서울역")}
          />
        </div>
        <div style={{ marginTop: "40px" }}>
          <img
            src={namyoung}
            alt="남영"
            onClick={(e) => handleRouteClick(e, "남영역")}
          />
        </div>
      </div>
    </div>
  );
};

export default TaxiRouteListPage;
