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
      <div>
        <div>
            참여 내역
        </div>
        <div>
            {historyList.length == 0 ? (
            <div className="centerNoMsg">
                아직 참여한 택시 팟이 없습니다.
                <br />
                택시 팟에 참여해 보세요!
            </div>
            ) : (
            <>
                {historyList.map((data) => {
                return <HistoryItem data={data} />;
                })}
            </>
            )}
        </div>
      </div>
    );
};

export default HistoryPage;
