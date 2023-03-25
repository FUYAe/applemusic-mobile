import React, { ComponentProps, useEffect, useState } from "react";
import { getPlayList } from "../../axios/request";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./index.scss";
import { useStore } from "../../store";
import { MenuBtn } from "../../components/MenuBtn";
export function PlayList(props: any) {
  const { musicStore, store } = useStore();
  let [state, setState] = useState({
    songs: [] as Song[],
  });
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const menuOptions = [
    {
      title: "主题",
      icon: "",
      onClick: () => {
        console.log("11");
        store.setMsg("12345", "success");
      },
    },
  ];
  useEffect(() => {
    setState({
      songs: musicStore[location.state as keyof typeof musicStore] as Song[],
    });
    musicStore.setCurrentPagePlayList(state.songs);
  }, []);

  function playmusic(id: any, info: Song, index: number) {
    // props.onClick(id, info);
    musicStore.setCurrentSong(info, index);
    musicStore.setPlayQueue(state.songs);
  }

  return (
    <div className="top-detail">
      <div className="songs">
        {state?.songs.map((song: any, index: number) => {
          return (
            <div
              onClick={() => playmusic(song.id, song, index)}
              key={song.id}
              className="song-item"
            >
              <img className="song-img" src={song.al.picUrl} alt="" />
              <div className="song-info">
                <div className="song-des">
                  <div className="name">{song.name}</div>
                  <div className="au">{song.ar[0].name}</div>
                </div>

                <MenuBtn menuOptions={menuOptions}>
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2763"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M415.93 223.79c0-52.98 43.004-95.984 95.984-95.984s95.984 43.004 95.984 95.984-43.004 95.984-95.984 95.984-95.984-43.003-95.984-95.984zM415.93 511.742c0-52.98 43.004-95.984 95.984-95.984s95.984 43.004 95.984 95.984-43.004 95.984-95.984 95.984-95.984-43.004-95.984-95.984zM415.93 799.866c0-52.98 43.004-95.984 95.984-95.984s95.984 43.003 95.984 95.984-43.004 95.983-95.984 95.983-95.984-43.175-95.984-95.983z"
                      p-id="2764"
                    ></path>
                  </svg>
                </MenuBtn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
