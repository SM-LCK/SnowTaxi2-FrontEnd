import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";

//Cannot read properties of undefined (reading 'getHours')
const MakepotModal = (props) => {
  const [isShow, setIsShow] = useState(props.show);
  const id = props.id;
  const navigate = useNavigate();
  const [timeValue, setTimeValue] = useState("");

  useEffect(() => {}, [timeValue]);

  // if (timeValue.length != 0) {
  //   const time = timeValue.$d; // 데이터에서 시간 정보를 가져옵니다
  //   const hours = time.getHours(); // 시간을 얻어옵니다
  //   const minutes = time.getMinutes(); // 분을 얻어옵니다
  //   const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
  //     .toString()
  //     .padStart(2, "0")}`;
  //   console.log("Formatted time:", formattedTime);
  //   setTimeValue(formattedTime);
  // }

  const handleTimeChange = (newTimeValue) => {
    setTimeValue(newTimeValue);
    // console.log(timeValue);
  };

  const handleParticipating = async () => {
    try {
      const time = timeValue.$d; // 데이터에서 시간 정보를 가져옵니다
      const hours = time.getHours(); // 시간을 얻어옵니다
      const minutes = time.getMinutes(); // 분을 얻어옵니다
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      console.log("Formatted time:", formattedTime);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/pot/new`,
        data: {
          departure: id,
          ridingTime: formattedTime,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          console.log(response.data.data);
          if (response.data.data) {
            console.log(response.data.message);
            setIsShow(props.onHide);
            //navigate("/Home/Chatting");
          } else {
            alert(`이미 참여하는 팟이 있습니다!`);
          }
        })
        .catch(function (error) {
          console.log("err1", error);
        });
    } catch (error) {
      console.log("err2", error);
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>새로운 팟을 만들어주세요!</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              //label="Controlled picker"
              value={timeValue}
              onChange={handleTimeChange}
            />
          </DemoContainer>
        </LocalizationProvider>
        <p style={{ marginTop: "10px" }}>
          방에 참여하신 후, 노쇼를 하게 되시면 벌금이 부과될 수 있습니다.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleParticipating}>
          팟 만들기
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MakepotModal;
