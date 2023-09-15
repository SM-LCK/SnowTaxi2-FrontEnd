import React from "react";
import { useNavigate } from "react-router-dom";
import sookmyung from "../assets/sookmyung.png";
import hyochang from "../assets/hyochang.png";
import seoul from "../assets/seoul.png";
import namyoung from "../assets/namyoung.png";

const TaxiRouteListPage = () => {
  const navigate = useNavigate();

  const handleRouteClick = (e, message) => {
    navigate("/Home/TaxiPotList", { state: { id: message } });
  };

  return (
    <div className="page">
      <div className="container">
        <div
          style={{
            marginTop: "50px",
            fontSize: "30px",
            fontWeight: "700",
            marginBottom: "40px",
          }}
        >
          출발지
        </div>
        <div style={{ fontSize: "18px", marginTop: "30px" }}>
          도착지는 숙대입구 후문입니다. <br /> 출발지를 선택해주세요.
        </div>
      </div>

      <div className="container" style={{ marginTop: "100px" }}>
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
            onClick={(e) => handleRouteClick(e, "효창공원앞역")}
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
