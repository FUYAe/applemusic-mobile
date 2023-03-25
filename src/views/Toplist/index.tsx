import React, { ComponentProps, useEffect, useState } from "react";
import { getPlayList } from "../../axios/request";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./index.scss";
import { useStore } from "../../store";
export function Toplist(props: any) {
  const { musicStore } = useStore();
  let [state, setState] = useState({
    songs: [] as Song[],
  });
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    state.songs.length != 0 ||
      getPlayList(Number(params.id), 0, 50).then((res) => {
        let songs = res.data.songs;
        setState({
          songs,
        });
      });
  }, []);

  function playmusic(id: any, info: Song, index: number) {
    // props.onClick(id, info);
    musicStore.setCurrentSong(info, index);
    musicStore.setPlayQueue(state.songs);
  }

  return (
    <div className="top-detail">
      <div className="description">
        <img src={location.state.coverImgUrl} alt="" />
        <div> {location.state.description}</div>
      </div>
      <div className="songs">
        {state.songs.map((song, index) => {
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
