import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import GetInsideMessages from "./GetInsideMessages";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
//ANT DESIGN
import { Tabs } from "antd";
import { Avatar } from "antd";

//
const MyMessages = () => {
  const { TabPane } = Tabs; //ANT

  // const [mymessages, setMyMessages] = useState([]);
  const dispatch = useDispatch(); //Redux
  const mymessages = useSelector((state) => state.myConversations); // Redux Selector
  const openID = useSelector((state) => state.conversationReducer);

  const [open, setOpen] = useState(Number(openID));
  const handleOpen = useCallback(
    (id) => {
      dispatch({ type: "CHANGE_CONVERSATION_ID", action: Number(id) });

      setOpen(Number(id));
    },
    [dispatch]
  );

  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/chat/getmyconversations`,
    })
      .then((res) => {
        console.log(res);
        // setMyMessages(res.data);
        dispatch({ type: "FETCH_MY_CONVERSATIONS", action: res.data });
        // handleOpen(res.data[0].conversation_id);
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, [handleOpen, dispatch]);

  if (!mymessages.length) {
    return <h1> Loading...</h1>;
  }
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <button
        onClick={() => dispatch({ type: "CHANGE_CONVERSATION_ID", action: 14 })}
      ></button>
      <Tabs
        onChange={handleOpen}
        defaultActiveKey={`${openID}`}
        tabPosition={"left"}
        style={{
          margin: "0 auto",
          width: "80%",
          height: "800px",
        }}
      >
        {mymessages.map((el, index) => {
          return (
            <TabPane
              tab={
                <div
                  style={{
                    width: "250px",
                  }}
                >
                  <Avatar
                    size={75}
                    style={{
                      margin: "5px",

                      borderRadius: "100%",
                      border:
                        openID === el.conversation_id
                          ? "5px solid #003a8c"
                          : "none",
                    }}
                    icon={
                      <img
                        src={
                          el.images !== null
                            ? el.images[0]
                            : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                        }
                        alt="avatar"
                        width="150px"
                      />
                    }
                  />
                  <p>{el.fullname}</p>
                </div>
              }
              key={el.conversation_id}
              disabled={index === 28}
              style={{ height: "800px" }}
            >
              <GetInsideMessages
                open={true}
                conversationID={openID}
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
