import React, { useState, useEffect } from "react";
import ReactRoundedImage from "react-rounded-image";
import * as StompJs from "@stomp/stompjs";
import { Button } from "react-bootstrap";
import profile1 from "../assets/profile1.png";
import axios from "axios";

const ChattingPage = () => {
  var moment = require('moment');
  let ridingTime = moment().format('yyyy-MM-DD') + " " + localStorage.getItem("@ridingTime") + ':00'
  let me = localStorage.getItem("@nickname")
  let wWidth = window.innerWidth;
  let wHeight = window.innerHeight;
  let participaitngPotId = localStorage.getItem("@potId");

  useEffect(() => {
    getChatsAxios();
    connect();
    return () => disConnect();
    console.log("here", participaitngPotId);
    // 그동안 채팅했던 내용 배열에 로드하기 axios로 메세지 불러오는 함수 호출 setChatList
  }, []);

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

  // 내가 보낸 메시지, 받은 메시지에 각각의 스타일을 지정해 주기 위함
  const msgBox = chatList.map((item, idx) => {
    if (item.type != "TALK") {
      // 들어가고 나가는 메세지
    } else {
      if (item.sender == me) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "3px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: wWidth / 3,
              }}
            >
              <div>{item.time}</div>
              <div style={{ padding: "10px" }}>
                <div
                  style={{
                    width: "max-content",
                    maxWidth: "380px",
                    wordBreak: "break-all",
                    backgroundColor: "#84BBFF",
                    fontSize: "20px",
                    marginTop: "10px",
                    borderTopLeftRadius: "18px",
                    borderBottomRightRadius: "18px",
                    borderBottomLeftRadius: "18px",
                    marginRight: "7px",
                    padding: "18px",
                  }}
                >
                  {item.content}
                </div>
              </div>
              <ReactRoundedImage
                image={profile1}
                roundedColor="#5E5E5E"
                roundedSize="5"
                imageWidth="60"
                imageHeight="60"
              />
            </div>
          </div>
        );
      } else {
        return (
          <div style={{display:"flex", justifyContent:"flex-start", padding:"10px"}}>
            <div style={{display:"flex", justifyContent:"flex-start", width:wWidth/3}}>
              <ReactRoundedImage
                image={profile1}
                roundedColor="#5E5E5E"
                roundedSize="5"
                imageWidth="60"
                imageHeight="60"
              />
              <div style={{ padding: "5px" }}>
                <div
                  style={{
                    width: "max-content",
                    maxWidth: "380px",
                    wordBreak: "break-all",
                    backgroundColor: "#E0E0E0",
                    fontSize: "20px",
                    marginTop: "10px",
                    borderTopRightRadius: "18px",
                    borderBottomRightRadius: "18px",
                    borderBottomLeftRadius: "18px",
                    marginLeft: "7px",
                    padding: "18px",
                  }}
                >
                  {item.content}
                </div>
              </div>
              <div>{item.time}</div>
            </div>
          </div>
        );
      }
    }
  });

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
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <div>
        <div className="container">
          <div
            style={{
              marginTop: wHeight / 25,
              marginBottom: wHeight / 25,
              fontSize: 35,
              fontWeight: "bold",
            }}
          >
            ChattingPage
          </div>
            { isBefore(ridingTime) ? (
              <Button variant="secondary" size="md" onClick={outAxios}>
                팟 나가기
              </Button>
            ) : (
              <Button variant="primary" size="md" onClick={finishAxios}>
                탑승 완료
              </Button>
            )}
          <div style={{width: wWidth/(2.5), marginBottom:"100px"}}>{msgBox}</div>
          <div style={{}}>
            <input
              style={{ marginBottom: "100px" }}
              type="text"
              id="msg"
              value={chat}
              placeholder="메시지 보내기"
              onChange={onChangeChat}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  sendChat();
                }
              }}
            />
            <Button variant="dark" size="md" onClick={sendChat}>
              전송
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
