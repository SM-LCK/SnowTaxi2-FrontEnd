import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";

const client = new StompJs.Client({
    brokerURL: '/api/ws',
    connectHeaders: {
      login: 'user',
      passcode: 'password',
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000, //자동 재 연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });