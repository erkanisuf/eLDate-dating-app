import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import GetInsideMessages from "./GetInsideMessages";
import Chat from "./Chat";

const MyMessages = ({ sendTo }) => {
  const [mymessages, setMyMessages] = useState([]);
  const inputEl = useRef(1);
  console.log(inputEl);

  const [open, setOpen] = useState(null);
  const handleOpen = (event) => {
    setOpen(event);
  };
  console.log(open);
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/chat/getmyconversations`,
    })
      .then((res) => {
        console.log(res);
        setMyMessages(res.data);
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, []);

  if (!mymessages.length) {
    return <h1> Loading...</h1>;
  }
  return (
    <div>
      <h1>My MEssages</h1>

      {mymessages.map((el, index) => {
        return (
          <div key={index}>
            <p>{el.conversation_id}</p>
            <p>{el.fullname}</p>

            <GetInsideMessages
              handleOpen={() => handleOpen(index)}
              open={open === index ? true : false}
              conversationID={el.conversation_id}
              sendTo={el.user_id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MyMessages;
