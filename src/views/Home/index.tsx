import React, { ComponentProps, KeyboardEvent, useEffect } from "react";
import ReactDom from "react-dom/client";
import { useState, ReactPropTypes } from "react";
import { getSearchSuggestions, getTopLists } from "../../axios/request";
import { useNavigate } from "react-router-dom";
import "./index.scss";
type StateType = { toplist: any[] };
export function Home(props: ComponentProps<any>) {
  let [content, setContent] = useState([]);
  let [kw, seKw] = useState("");
  let [suggestion, setSuggestion] = useState({
    songs: [],
    albums: [],
    playlists: [],
    artists: [],
    order: [],
  } as { songs: Song[]; albums: Album[]; playlists: any[]; artists: Ar[]; order: string[] });
  let navigate = useNavigate();

  useEffect(() => {
    getTopLists().then((res) => {
      let data = res.data;
      setContent(data.list);
    });
  }, []);
  function navigatetToList(id: any, data: any) {
    navigate("/toplist/" + id, { state: data });
    props.onNavigate();
  }
  function search(e: KeyboardEvent) {
    let value = (e.target as HTMLInputElement).value;
    if (e.code !== "Enter" || !value) return;
    navigate("/searchresult?kw=" + value, { state: suggestion });
    props.onNavigate();
  }
  function searchByClick(value: string) {
    if (!value) return;
    navigate("/searchresult?kw=" + value, { state: suggestion });
    props.onNavigate();
  }
  function getSuggestion(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    if (!value) {
      setSuggestion({
        songs: [],
        albums: [],
        playlists: [],
        artists: [],
        order: [],
      });
    }
    getSearchSuggestions(value).then((res) => {
      console.log(res.data.result);
      setSuggestion(res.data.result);
    });
  }
  function getTitle(str: string) {
    if (str == "songs") {
      return "歌曲";
    } else if (str == "albums") {
      return "专辑";
    } else if (str == "artists") {
      return "歌手";
    } else if (str == "playlists") {
      return "歌单";
    }
  }
  return (
    <div className="home">
      <div className="search">
        <div className="title">搜索</div>
        <input
          onChange={(e) => getSuggestion(e)}
          onKeyDown={(e) => search(e)}
          placeholder="艺人、歌曲、歌词及更多内容"
          type="text"
        />
        <div className="suggestion">
          {suggestion?.order.map((item) => {
            return (
              <div className="suggestion-class" key={item}>
                <span className="suggestion-title">{getTitle(item)}</span>
                {(suggestion[item as keyof typeof suggestion] as any[]).map(
                  (suggestion) => {
                    return (
                      <div
                        onClick={() => searchByClick(suggestion?.name)}
                        className="suggestion-item"
                        key={suggestion.id}
                      >
                        <span>{suggestion?.name}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span className="au">
                          {item === "songs" && suggestion?.artists[0].name}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="toplist-title">排行榜</div>
      <div className="toplist">
        {content.map((list: any) => {
          return (
            <button
              onClick={() => navigatetToList(list.id, list)}
              key={list.id}
              className="top-item"
            >
              <img src={list.coverImgUrl} alt="" />
              <div>{list.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
