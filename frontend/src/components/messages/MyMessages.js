import React, { useEffect, useCallback } from "react";
import Axios from "axios";
import GetInsideMessages from "./GetInsideMessages";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import "./MyMessages.css";
//ANT DESIGN
import { Tabs, Badge } from "antd";
import { Avatar } from "antd";

//
const MyMessages = () => {
  const { TabPane } = Tabs; //ANT

  // const [mymessages, setMyMessages] = useState([]);
  const dispatch = useDispatch(); //Redux
  const mymessages = useSelector((state) => state.myConversations); // Redux Selector
  const openID = useSelector((state) => state.conversationReducer);
  const msgNotifc = useSelector((state) => state.myNotifications);

  const handleOpen = useCallback(
    (id) => {
      dispatch({ type: "CHANGE_CONVERSATION_ID", action: Number(id) });
      Axios({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: { conversation_id: Number(id) },
        withCredentials: true,
        url: `https://dateappeldate.herokuapp.com/notifications/readmsgnotifications`,
      })
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `https://dateappeldate.herokuapp.com/chat/getmyconversations`,
    })
      .then((res) => {
        // setMyMessages(res.data);
        dispatch({ type: "FETCH_MY_CONVERSATIONS", action: res.data });
        // handleOpen(res.data[0].conversation_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [handleOpen, dispatch]);

  if (!mymessages.length) {
    return <h1> No conversations found yet..</h1>;
  }
  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        height: "100%",
      }}
    >
      <Tabs
        onChange={handleOpen}
        defaultActiveKey={
          openID === null ? mymessages[0].conversation_id : `${openID}`
        }
        tabPosition={window.innerWidth <= 768 ? "top" : "left"}
        style={{
          margin: "0 auto",
          width: "100%",
          height: window.innerWidth <= 768 ? "80%" : "800px",
        }}
      >
        {mymessages.map((el, index) => {
          return (
            <TabPane
              tab={
                <div
                  className="tabNames"
                  style={{
                    height: window.innerWidth <= 768 ? "100px" : "",
                    padding: "10px",
                  }}
                >
                  {msgNotifc.messages.filter(
                    (z) => z.conversation_id === el.conversation_id
                  ).length ? (
                    <Badge
                      count={
                        <div
                          style={{
                            color: "white",
                            backgroundColor: "red",
                            borderRadius: "100%",
                            width: "25px",
                            padding: "5px",
                            margin: 0,
                            zIndex: 3,
                          }}
                        >
                          {
                            msgNotifc.messages.filter(
                              (z) => z.conversation_id === el.conversation_id
                            ).length
                          }
                        </div>
                      }
                    ></Badge>
                  ) : (
                    ""
                  )}

                  <Avatar
                    size={window.innerWidth <= 768 ? 25 : 75}
                    style={{
                      margin: "5px",

                      borderRadius: "100%",
                      border:
                        openID === el.conversation_id
                          ? "5px solid #E99AF2"
                          : "none",
                    }}
                    icon={
                      <img
                        src={
                          el.images[0]
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
                mymessages={mymessages}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default MyMessages;
