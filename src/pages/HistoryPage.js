import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HistoryItem from "../components/HistoryItem";

const HistoryPage = () => {
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        getHistoryAxios()
    }, []);

    const getHistoryAxios = async () => {
        try {
          axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/pot/my`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("@token")}`,
            },
          })
          .then((response) => {
            console.log(response.data.data)
            setHistoryList(response.data.data)
          })
          .catch(function (error) {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
        }
      };

    const navigate = useNavigate();

    return (
        <div
        className="page"
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
            참여 내역
            </div>
        </div>
            {historyList.length == 0 ? (
            <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "100px",
                }}
            >
                아직 참여한 팟이 없습니다.
                <br />
                팟에 참여해 보세요!
            </div>
            ) : (
            <>
                {historyList.map((data) => {
                return <HistoryItem data={data} />;
                })}
            </>
            )}
        </div>
    );
};

export default HistoryPage;
