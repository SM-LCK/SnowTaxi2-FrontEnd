import React, { useState, useEffect } from "react";

const ChattingPage = () => {
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

  return (
    <div
      className="page"
      style={{ height: windowDimensions.height, width: "100%" }}
    >
      <div className="container">
        <div
          style={{
            marginTop: "40px",
            fontSize: "25px",
            fontWeight: "700",
            marginBottom: "40px",
          }}
        >
          ChattingPage
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
