import React, { useEffect } from "react";
import "./Layout.css";
import Myprofile from "../components/user/Myprofile";
import { Link } from "react-router-dom";
import EditProfile from "../components/user/EditProfile";
import Login from "../components/user/Login";
import Axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux"; //REDUX
import { useHistory } from "react-router-dom";
import Notifications from "./Notifications";
//ANT
import {
  HomeOutlined,
  MessageOutlined,
  FireOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
const Layout = (props) => {
  const getcookie = Number(Cookies.get("token"));
  const dispatch = useDispatch(); // REDUX
  const isLoged = useSelector((state) => state.AmiLogged); // REDUX
  const reTrigger = useSelector((state) => state.toggleTriggerFetchs); // REDUX
  const history = useHistory(); // ROUTER

  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/getcookie`,
    })
      .then((res) => {
        console.log(res, "dispardq");
        if (res.status === 200) {
          dispatch({ type: "CHECK_IF_LOGGED_IN", action: true });
        }
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, [reTrigger, dispatch]);
  ////

  ///Gives me my Profile Stats
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/users/getuser`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "FETCH_MY_PROFILE",
            action: res.data.profile,
          });
        }
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, [getcookie, reTrigger, dispatch]);
  //Gets my COnversations
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
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, [dispatch, getcookie, reTrigger]);
  //
  const logout = () => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "http://localhost:4000/users/logout",
    }).then((res) => {
      console.log(res, "ko praq");
      if (res.status === 200) {
        dispatch({
          type: "RESET_PROFILE",
        });
        dispatch({
          type: "CHECK_IF_LOGGED_IN",
          action: false,
        });
        dispatch({
          type: "RE_TRIGGER",
        });
        Cookies.remove("token");
        history.push("/");
      }
    });
  };
  return (
    <div className="LayoutBackgorund">
      <div className="transperantBackground">
        <div className="leftMenu">
          {isLoged ? (
            <div>
              <Myprofile />
              <Notifications />
            </div>
          ) : (
            <Login />
          )}

          <div className="Menu">
            <nav>
              <ul className="navigator">
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/"
                >
                  <HomeOutlined />
                  Home
                </Link>
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/allprofiles"
                >
                  <UsergroupAddOutlined />
                  Profiles
                </Link>
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/matchme"
                >
                  <FireOutlined />
                  Match
                </Link>
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/mymessages"
                >
                  <MessageOutlined />
                  Messages
                </Link>
              </ul>
            </nav>
          </div>
          {isLoged && (
            <div>
              <EditProfile />
              <p style={{ marginTop: "0" }} onClick={logout} className="logout">
                Sign Out
              </p>
            </div>
          )}
        </div>
        <div className="rightMenu">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
