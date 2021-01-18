import React, { useState } from "react";
import Axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//ANT DESING
import { Input, Button } from "antd";
//
//  COMPONENTS TO START CONVERSATION ALSO USE DIN THE CHAT !
const Chat = ({ sendTo }) => {
  const dispatch = useDispatch(); //REDUX
  const params = useLocation(); //Router
  const history = useHistory();
  const conversationIDREDUX = useSelector((state) => state.conversationReducer);
  const myprofileImage = useSelector((state) => state.myProfileReducer);
  const [form, setForm] = useState({
    text: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    setForm({ text: "" });
    event.preventDefault();
    Axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        text: form.text,
      },
      withCredentials: true,
      url: `http://localhost:4000/chat/startconversation/${sendTo}`,
    })
      .then((res) => {
        console.log(res);
        realTime(res.data.data[0]);

        if (params.pathname.includes("/allprofiles/")) {
          dispatch({
            type: "CHANGE_CONVERSATION_ID",
            action: Number(res.data.data[0].conversation_id),
          });
          history.push("/mymessages");
        }
      })
      .catch((error) => {
        // console.log(error.response.status); // 401
        // console.log(error.response.data);
        console.log(error);
      });
  };

  const realTime = (event) => {
    Axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        message: event.message,
        conversationID: params.pathname.includes("/allprofiles/")
          ? event.conversation_id
          : conversationIDREDUX,
        chatimage:
          myprofileImage.images !== null
            ? myprofileImage.images[0]
            : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
        fullname: myprofileImage.fullname,
      },

      withCredentials: true,
      url: `http://localhost:4000/chat/message/send`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          style={{ width: "80%" }}
          placeholder="Write a message"
          type="text"
          name="text"
          value={form.text}
          onChange={handleChange}
        />
        <Button
          disabled={form.text === "" ? true : false}
          type="primary"
          onClick={handleSubmit}
        >
          Send
        </Button>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    </div>
  );
};

export default Chat;
