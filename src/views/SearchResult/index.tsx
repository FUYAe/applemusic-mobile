import React, { ComponentProps, useEffect, useState } from "react";
import { getPlayList, getSearchR } from "../../axios/request";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import "./index.scss";
import { useStore } from "../../store";
type Order = "songs" | "albums" | "artists" | "playlists";
type Suggestion = {
  songs: Song[];
  albums: Album[];
  playlists: any[];
  artists: Ar[];
  order: (keyof Suggestion)[];
};
export function SearchResult(props: any) {
  let [state, setState] = useState({
    songs: [] as Song[],
  });
  const { musicStore } = useStore();
  let [searchSarams] = useSearchParams();
  let location: {
    state: Suggestion;
  } = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    console.log(location);
    state.songs.length ||
      getSearchR(searchSarams.get("kw") as any).then((res) => {
        let songs = res.data.result.songs;
        setState({
          songs,
        });
      });
  }, []);

  function playmusic(id: any, info: Song, index: number) {
    musicStore.setCurrentSong(info, index);
    musicStore.setPlayQueue(state.songs);
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
    <div className="search-result">
      {location.state.order.map((item: React.Key | null | undefined) => {
        if (item == "albums") {
          return (
            <div className="result-item" key={item}>
              <div className="title">{getTitle(item)}</div>
              <div className={"res-space " + item}>
                {location.state[item].map((i) => {
                  return (
                    <div key={i.id} className="s-item">
                      <img src={i.artist.picUrl} alt="" />
                      <div className="name">{i.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
        if (item == "artists") {
          return (
            <div className="result-item" key={item}>
              <div className="title">{getTitle(item)}</div>
              <div className={"res-space " + item}>
                <div className={"res-space " + item}>
                  {location.state[item].map((i) => {
                    return (
                      <div key={i.id} className="s-item">
                        <img src={(i as any).img1v1Url} alt="" />
                        <div className="name">{i.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }
        if (item == "playlists") {
          return (
            <div className="result-item" key={item}>
              <div className="title">{getTitle(item)}</div>
              <div className={"res-space " + item}>
                <div className={"res-space " + item}>
                  {location.state[item].map((i) => {
                    return (
                      <div key={i.id} className="s-item">
                        <img src={i.coverImgUrl} alt="" />
                        <div className="name">{i.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }
      })}
      <div className="result-item">
        <div className="title">歌曲</div>
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
    </div>
  );
}
