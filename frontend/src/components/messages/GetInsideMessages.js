import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Pusher from "pusher-js";
import Chat from "./Chat";
import Cookies from "js-cookie";
import "antd/dist/antd.css";
import moment from "moment";
//ANT DESIGN
import { Avatar } from "antd";
//

const GetInsideMessages = ({
  conversationID,
  sendTo,
  open,
  handleOpen,
  mymessages,
}) => {
  const getcookie = Number(Cookies.get("token"));
  console.log("FUFU", conversationID);
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
      url: `http://localhost:4000/chat/getmessages/${
        conversationID === null ? mymessages[0].conversation_id : conversationID
      }`,
    })
      .then((res) => {
        console.log(res);
        setSendMessages(res.data);
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, [conversationID, open, mymessages]);

  if (!SendMessages.length) {
    return <h1> Loading...</h1>;
  } else if (!open) {
    return <button onClick={handleOpen}>Open Chat</button>;
  }
  return (
    <div>
      <div
        className="thisAbsolut"
        style={{
          height: "750px",
          maxHeight: "800px",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {SendMessages.map((el, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                width: "100%",
                alignSelf:
                  el.sender_id === getcookie ? "flex-start" : "flex-end",

                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                  margin: "0 auto",
                  color: "grey",
                  fontStyle: "italic",
                  alignSelf: "center",
                  justifySelf: "center",
                }}
              >
                {moment(el.created_at).startOf("mm").fromNow()}
              </div>
              <p
                style={{
                  margin: "0",
                  color: "grey",
                  fontStyle: "italic",
                  alignSelf:
                    el.sender_id === getcookie ? "flex-start" : "flex-end",
                }}
              >
                {el.fullname}
              </p>
              <p
                style={{
                  position: "relative",
                  width: "25%",
                  margin: "5px",
                  padding: "15px",
                  borderRadius: "10px",
                  alignSelf:
                    el.sender_id === getcookie ? "flex-start" : "flex-end",
                  backgroundColor:
                    el.sender_id === getcookie ? "#595959" : "#003a8c",

                  color: "white",
                }}
              >
                <Avatar
                  size={25}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: -3,
                    border: "1px solid white",
                  }}
                  icon={
                    <img
                      src={
                        el.images !== null
                          ? el.images
                          : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                      }
                      // src="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                      alt="avatar"
                      width="150px"
                    />
                  }
                />
                {el.message}
              </p>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>
      <div>
        <Chat sendTo={sendTo} />
      </div>
    </div>
  );
};

export default GetInsideMessages;
