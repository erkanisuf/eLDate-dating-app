import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import GetInsideMessages from "./GetInsideMessages";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
//ANT DESIGN
import { Tabs } from "antd";

//
const MyMessages = () => {
  const { TabPane } = Tabs; //ANT

  const [mymessages, setMyMessages] = useState([]);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);
  const handleOpen = useCallback(
    (id) => {
      dispatch({ type: "CHANGE_CONVERSATION_ID", action: id });

      setOpen(Number(id));
    },
    [dispatch]
  );
  console.log(open, "openn");

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
        handleOpen(res.data[0].conversation_id);
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, [handleOpen]);

  if (!mymessages.length) {
    return <h1> Loading...</h1>;
  }
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <Tabs
        onChange={handleOpen}
        defaultActiveKey="1"
        tabPosition={"left"}
        style={{
          height: "100%",
          backgroundColor: "green",
        }}
      >
        {mymessages.map((el, index) => {
          return (
            <TabPane
              tab={
                <div
                  style={{
                    backgroundColor:
                      open === el.conversation_id ? "blue" : "red",
                    width: "160px",
                  }}
                >
                  <img
                    src="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                    alt="avatar"
                    width="150px"
                  />
                </div>
              }
              //   tab={`<p>${el.conversation_id}</p>
              // <p>${el.fullname}</p>`}
              key={el.conversation_id}
              disabled={index === 28}
              style={{ backgroundColor: "red", height: "800px" }}
            >
              <GetInsideMessages
                open={true}
                conversationID={el.conversation_id}
                sendTo={el.user_id}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default MyMessages;