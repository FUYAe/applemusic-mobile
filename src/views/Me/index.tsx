import React, { ComponentProps, KeyboardEvent, useEffect } from "react";
import ReactDom from "react-dom/client";
import { useState, ReactPropTypes } from "react";
import { getSearchSuggestions, getTopLists } from "../../axios/request";
import { useNavigate } from "react-router-dom";
import userPic from "@/assets/react.svg";
import { useStore } from "@/store";
import "./index.scss";
type StateType = { toplist: any[] };

export function Me(props: ComponentProps<any>) {
  const nav = useNavigate();
  const { musicStore } = useStore();
  const options = [
    {
      id: 1,
      title: "我喜欢",
      datail: "30",
      onClick: () => {
        {
          state: musicStore.likes;
        }
        nav("/playlist?id=likes", { state: "likes" });
      },
      icon: () => {
        return (
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2761"
            width="40"
            height="40"
          >
            <path
              d="M672 192a222.72 222.72 0 0 0-160 67.68A222.592 222.592 0 0 0 352 192c-123.52 0-224 101.184-224 225.6 0 52.256 18.144 103.2 52.928 145.536l285.952 293.984a62.528 62.528 0 0 0 90.208 0l287.808-296.032A227.136 227.136 0 0 0 896 417.6C896 293.184 795.52 192 672 192"
              fill="#f32a43"
              p-id="2762"
            ></path>
          </svg>
        );
      },
    },
    {
      id: 2,
      title: "最近播放",
      datail: "10",
      onClick: () => {
        nav("/playlist?id=recents", { state: "recents" });
      },
      icon: () => {
        return (
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4449"
            width="40"
            height="40"
          >
            <path
              d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667z m0 170.666666c-17.066667 0-32 14.933333-32 32V518.4c2.133333 10.666667 8.533333 21.333333 19.2 25.6l170.666667 81.066667 2.133333 2.133333c14.933333 6.4 32-2.133333 40.533333-17.066667l2.133334-2.133333c6.4-14.933333-2.133333-32-17.066667-40.533333l-151.466667-70.4V275.2c-4.266667-17.066667-17.066667-29.866667-34.133333-29.866667z"
              fill="#f32a43"
              p-id="4450"
            ></path>
          </svg>
        );
      },
    },
    {
      id: 3,
      title: "歌单",
      datail: "9",
      onClick: () => {},
      icon: () => {
        return (
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4449"
            width="40"
            height="40"
          >
            <path
              d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667z m0 170.666666c-17.066667 0-32 14.933333-32 32V518.4c2.133333 10.666667 8.533333 21.333333 19.2 25.6l170.666667 81.066667 2.133333 2.133333c14.933333 6.4 32-2.133333 40.533333-17.066667l2.133334-2.133333c6.4-14.933333-2.133333-32-17.066667-40.533333l-151.466667-70.4V275.2c-4.266667-17.066667-17.066667-29.866667-34.133333-29.866667z"
              fill="#f32a43"
              p-id="4450"
            ></path>
          </svg>
        );
      },
    },
    {
      id: 4,
      title: "播放列表",
      datail: "100",
      onClick: () => {
        nav("/playlist?id=playqueue", {
          state: "playQueue",
        });
      },
      icon: () => {
        return (
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4449"
            width="40"
            height="40"
          >
            <path
              d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667z m0 170.666666c-17.066667 0-32 14.933333-32 32V518.4c2.133333 10.666667 8.533333 21.333333 19.2 25.6l170.666667 81.066667 2.133333 2.133333c14.933333 6.4 32-2.133333 40.533333-17.066667l2.133334-2.133333c6.4-14.933333-2.133333-32-17.066667-40.533333l-151.466667-70.4V275.2c-4.266667-17.066667-17.066667-29.866667-34.133333-29.866667z"
              fill="#f32a43"
              p-id="4450"
            ></path>
          </svg>
        );
      },
    },
  ];
  return (
    <div className="me">
      <div className="userinfo">
        <img src={userPic} alt="" />
        <div>雨荷</div>
      </div>
      <div className="my-list">
        {options.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => item.onClick()}
              className="my-list-item"
            >
              <div className=" me-icon">{item.icon()}</div>
              <div className="me-title">{item.title}</div>
              <div className="me-ditail">{item.datail}</div>
            </div>
          );
        })}
      </div>
      <div className="playlist-add">
        <div className="playlist-add-title">自建歌单</div>
        <div className="playlist-add-control">
          <button>
            <svg
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5427"
              width="30"
              height="30"
            >
              <path
                d="M874.666667 469.333333H554.666667V149.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v320H149.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667h320v320c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666V554.666667h320c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667z"
                fill="#f32a43"
                p-id="5428"
              ></path>
            </svg>
          </button>
          <span>新建歌单</span>
        </div>
      </div>
      <div className="plylist-hub">
        <div className="title">我的歌单</div>
        <div className="hub">
          <button className="hub-item">
            <img src={userPic} alt="" />
            <div className="hub-info">
              <div className="name">歌单名字</div>
              <div className="detail">共123首</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
