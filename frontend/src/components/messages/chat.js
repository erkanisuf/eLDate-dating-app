import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
//  COMPONENTS TO START CONVERSATION ALSO USE DIN THE CHAT !
const Chat = ({ sendTo }) => {
  const conversationIDREDUX = useSelector((state) => state.conversationReducer);
  const [form, setForm] = useState({
    text: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
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
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  };

  const realTime = (event) => {
    Axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        message: event.message,
        conversationID: conversationIDREDUX,
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
        <label>
          text
          <input
            type="text"
            name="text"
            value={form.fullname}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Chat;
