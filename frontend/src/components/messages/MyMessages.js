import React, { useState, useEffect } from "react";
import Axios from "axios";
import GetInsideMessages from "./GetInsideMessages";
import { useDispatch } from "react-redux";
const MyMessages = ({ sendTo }) => {
  const [mymessages, setMyMessages] = useState([]);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);
  const handleOpen = (id) => {
    dispatch({ type: "CHANGE_CONVERSATION_ID", action: id });
    console.log(id, "this))))");
    setOpen(id);
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
    <div className="mymessages" style={{ position: "relative" }}>
      <h1>My MEssages</h1>

      {mymessages.map((el, index) => {
        return (
          <div key={index} className="childOFmymessages">
            <p>{el.conversation_id}</p>
            <p>{el.fullname}</p>

            <GetInsideMessages
              handleOpen={() => handleOpen(el.conversation_id)}
              open={open === el.conversation_id ? true : false}
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
