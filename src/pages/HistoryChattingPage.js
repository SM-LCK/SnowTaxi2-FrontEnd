import React, { useState, useEffect, userPa } from "react";
import axios from "axios";
import ChattingBubble from "../components/ChattingBubbles";
import { useParams } from "react-router-dom";

const HistoryChattingPage = () => {

  let { potId } = useParams();
  const [pot, setPot] = useState({});
  const [chatList, setChatList] = useState([]); // 채팅 기록
  let wHeight = window.innerHeight;

  useEffect(() => {
    getChatsAxios();
  }, []);

  const getChatsAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/history`,
        params: { roomId: potId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
            console.log(response.data)
            console.log("in")
          setChatList(response.data.data.chats);
          setPot(response.data.data.pot);
          console.log("innnnnn", pot, chatList);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <div className="fixTop" style={{}}>
            <div>
                {pot.ridingDate + "   " + pot.ridingTime}
            </div>
        </div>

        <div style={{paddingTop:wHeight/30, paddingBottom:wHeight/30}}>
            <ChattingBubble chatList={chatList} />
        </div>
    </div>
  );
};

export default HistoryChattingPage;
