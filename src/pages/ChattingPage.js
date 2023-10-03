import React, { useState, useEffect } from "react";
import ReactRoundedImage from "react-rounded-image";
import * as StompJs from "@stomp/stompjs";
import { Button } from "react-bootstrap";
import profile1 from "../assets/profile1.png";
import axios from "axios";
import { BsSend } from "react-icons/bs";
import ChattingBubble from "../components/ChattingBubbles";
import CheckModal from "../components/CheckModal";
import { useNavigate } from "react-router-dom";

const ChattingPage = () => {
  const navigate = useNavigate();
  var moment = require('moment');
  let ridingTime = moment().format('yyyy-MM-DD') + " " + localStorage.getItem("@ridingTime") + ':00'
  let me = localStorage.getItem("@nickname")
  let wWidth = window.innerWidth;
  let wHeight = window.innerHeight;
  let participaitngPotId = localStorage.getItem("@potId");
  const [loginNeedModalShow, setLoginNeedModalShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("@token") == undefined) {
      setLoginNeedModalShow(true);
      // alert(`로그인이 필요한 기능입니다!`);
      // navigate("/Login");
    } else {
      getChatsAxios();
      connect();
    }
    return () => disConnect();
  }, []);

  const toLoginPage = () => {
    setLoginNeedModalShow(false);
    navigate("/Login");
  };

  const toHome = () => {
    setLoginNeedModalShow(false);
    navigate("/");
  }

  let [client, changeClient] = useState(null);
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록

  const getChatsAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/chatroom`,
        params: { roomId: participaitngPotId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          setChatList(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: `${process.env.REACT_APP_STOMP_URL}/wschat`,
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe("/sub/chatroom/" + participaitngPotId, callback);
      };

      clientdata.activate(); // 클라이언트 활성화
      changeClient(clientdata); // 클라이언트 갱신
    } catch (err) {
      console.log(err);
    }
  };

  const callback = function (message) {
    if (message.body) {
      let msg = JSON.parse(message.body);
      setChatList((chats) => [...chats, msg]);
    }
  };

  const disConnect = () => {
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  const sendChat = () => {
    if (chat === "") {
      return;
    }
    client.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        sender: me,
        roomId: participaitngPotId,
        content: chat,
        type: "TALK",
      }),
    });

    setChat("");
  };

  function isBefore(ridingTime) {
    console.log(ridingTime)
    let rt = new Date(ridingTime);
    let now = Date.now();
    console.log("타는 시간", rt);
    console.log("오늘 시간", now)

    if (rt < now) {
      return false;
    } else {
      return true;
    }
  }

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const finishAxios = async () => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/pot/finish`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        localStorage.setItem("@potId", 0);
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const outAxios = async () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/participation`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      }
    })
    .then(response => {
      console.log(response.data);
      localStorage.setItem("@potId", 0);
      handleSendOutMsg();
    })
    .catch(error => {
      console.log(error);
    });
  };

  const handleSendOutMsg = async () => {
    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/chatroom/inout`,
        data: {
          roomId: localStorage.getItem("@potId"),
          sender: localStorage.getItem("@nickname"),
          type: "OUT"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.data)
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
      <CheckModal
        show={loginNeedModalShow}
        onHide={toHome}
        main="로그인이 필요한 기능입니다."
        sub="로그인 페이지로 이동하시겠습니까?"
        check="확인"
        okAction={toLoginPage}
      />
    { (participaitngPotId == 0 || participaitngPotId == undefined) ? (
      <div className="centerNoMsg">
        <div >
          아직 참여한 택시 팟이 없습니다.
          <br />
          팟에 참여해 보세요!
        </div>
      </div>
      ) : (
        <div>
          <div className="fixTop" style={{}}>
            <div className="chatTitle">  
              <div></div>      
              <div>
                ChattingPage
              </div>

              { isBefore(ridingTime) ? (
                
                <Button style={{backgroundColor:"#FF8A48", border:"none", fontSize:"13px"}} size="sm" onClick={outAxios}>
                  팟 나가기
                </Button>
              ) : (
                <Button style={{backgroundColor:"#FF8A48", border:"none", fontSize:"13px"}} size="sm" onClick={finishAxios}>
                  탑승 완료
                </Button>
              )}
            </div>
          </div>

          <ChattingBubble chatList={chatList} />

          <div className="bottomChat">
            <div style={{display:"flex", flexDirection:"row"}}>
              <input
                className="inputChat"
                style={{width: wWidth - 70}}
                type="text"
                value={chat}
                placeholder="채팅을 입력해주세요"
                onChange={onChangeChat}
              />

              <div className="sendBtnn" onClick={sendChat}>
                <BsSend size="20" />
              </div>

            </div>
          </div>
        </div>
      )
    }
    </div>
  );
};

export default ChattingPage;
