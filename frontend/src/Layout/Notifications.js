import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import Axios from "axios";
import {
  AlertOutlined,
  MessageOutlined,
  FireOutlined,
} from "@ant-design/icons"; // ANT
import { useDispatch, useSelector } from "react-redux"; //REDUX
const Notifications = () => {
  const dispatch = useDispatch(); // REDUX
  const msgNotifc = useSelector((state) => state.myNotifications); // REDUX
  const openID = useSelector((state) => state.conversationReducer);
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/notifications/getmsgnotifications`,
    })
      .then((res) => {
        console.log(res, "dispardq");
        if (res.status === 200) {
          dispatch({ type: "MESSAGE_NOTIFICATIONS", action: res.data });
        }
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, [dispatch, openID]);
  return (
    <div className="notifications">
      <Link to="/mymatches">
        <Badge
          count={
            <AlertOutlined
              style={{
                color: "white",
                backgroundColor: "red",
                borderRadius: "100%",
                padding: "5px",
              }}
            />
          }
        >
          <FireOutlined style={{ fontSize: "40px" }} />
        </Badge>
      </Link>
      <Link to="/mymessages">
        <Badge
          count={
            msgNotifc.messages.length ? (
              <div
                style={{
                  color: "white",
                  backgroundColor: "red",
                  borderRadius: "100%",
                  width: "25px",
                  padding: "5px",
                  margin: 0,
                }}
              >
                {msgNotifc.messages.length}
              </div>
            ) : (
              ""
            )
          }
        >
          <MessageOutlined style={{ fontSize: "40px" }} />
        </Badge>
      </Link>
    </div>
  );
};

export default Notifications;
