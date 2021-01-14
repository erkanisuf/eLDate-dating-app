import React, { useState, useEffect } from "react";
import Axios from "axios";
import Pusher from "pusher-js";
import Chat from "./Chat";
const GetInsideMessages = ({ conversationID, sendTo, open, handleOpen }) => {
  const [SendMessages, setSendMessages] = useState([]);

  useEffect(() => {
    const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_APP_KEY}`, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      encrypted: true,
    });
    const channel = pusher.subscribe("watch_realtime_table");
    channel.bind("new_record", (data) => {
      console.log(data);
      setSendMessages([...SendMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [SendMessages]);

  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/chat/getmessages/${conversationID}`,
    })
      .then((res) => {
        console.log(res);
        setSendMessages(res.data);
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, [conversationID, open]);

  if (!SendMessages.length) {
    return <h1> Loading...</h1>;
  } else if (!open) {
    return <button onClick={handleOpen}>Open Chat</button>;
  }
  return (
    <div>
      <h1>messages of inside chat component</h1>
      <button onClick={() => handleOpen}>Close Chat</button>
      {SendMessages.map((el, index) => {
        return (
          <div key={index} style={{ backgroundColor: "green" }}>
            <p>
              {el.message}
              <span style={{ color: "white" }}>{el.sender_id}</span>
            </p>
          </div>
        );
      })}
      <Chat sendTo={sendTo} />
    </div>
  );
};

export default GetInsideMessages;
