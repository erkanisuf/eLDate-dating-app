import React, { useState, useEffect, useRef, useCallback } from "react";
import Axios from "axios";
import Pusher from "pusher-js";
import Chat from "./Chat";
import { useDispatch } from "react-redux";
const GetInsideMessages = ({ conversationID, sendTo, open, handleOpen }) => {
  const dispatch = useDispatch();
  //redux ---end

  const [SendMessages, setSendMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [SendMessages]);

  useEffect(() => {
    const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_APP_KEY}`, {
      authEndpoint: "http://localhost:4000/chat/pusher/auth",
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      encrypted: true,
    });

    const channel = pusher.subscribe("private-" + conversationID);
    channel.bind("messages", (newmessage) => {
      console.log(newmessage);
      setSendMessages([...SendMessages, newmessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [SendMessages, conversationID]);

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

  // const memoizedCallback = useCallback(() => {
  //   dispatch({ type: "CHANGE_CONVERSATION_ID", action: conversationID });
  // }, [conversationID, dispatch]);
  // useEffect(() => {
  //   memoizedCallback();
  //   // dispatch({ type: "CHANGE_CONVERSATION_ID", action: conversationID });
  // }, [open, conversationID, memoizedCallback]);
  if (!SendMessages.length) {
    return <h1> Loading...</h1>;
  } else if (!open) {
    return <button onClick={handleOpen}>Open Chat</button>;
  }
  return (
    <div
      className="thisAbsolut"
      style={{
        position: "absolute",
        backgroundColor: "grey",
        right: 0,
        top: 0,
        maxHeight: "500px",
        overflowY: "scroll",
      }}
    >
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
      <div ref={messagesEndRef} />
    </div>
  );
};

export default GetInsideMessages;
