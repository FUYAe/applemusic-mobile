import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Toplist } from "./views/Toplist";
import AppleAudio from "./components/AppleAudio";
import { useState } from "react";
import { getSongUrlById } from "./axios/request";
import Header from "./components/Header";
import { SearchResult } from "./views/SearchResult";
import { Tabbar } from "./components/TabBar";
import { useStore } from "./store";
import { observer } from "mobx-react-lite";
import { Me } from "../src/views/Me";
function App() {
  const [state, setState] = useState({
    name: "apple",
    au: "apple",
    src: "",
    img: "",
  });
  const [update, setUpdate] = useState(false);
  function playmusic(id: any, info: Song) {
    getSongUrlById(+id).then((res) => {
      let src = res.data.data[0].url;
      setState({
        src,
        name: info.name,
        au: info.ar[0].name,
        img: info.al.picUrl,
      });
    });
  }
  function onNavigate() {
    setUpdate(!update);
  }
  return (
    <Router>
      <div id="app">
        <Header dd={update} />
        <div className="app-placeholder"></div>
        <Routes>
          <Route path="/" element={<Home onNavigate={onNavigate} />} />
          <Route
            path="/toplist/:id"
            element={
              <Toplist onClick={(id: any, info: Song) => playmusic(id, info)} />
            }
          />
          <Route
            path="/searchresult"
            element={
              <SearchResult
                onClick={(id: any, info: Song) => playmusic(id, info)}
              />
            }
          />
          <Route path="/me" element={<Me />} />
        </Routes>
        <div className="app-placeholder"></div>
        <div className="app-placeholder"></div>
        <AppleAudio value={state}></AppleAudio>
        <Tabbar />
      </div>
    </Router>
  );
}

export default observer(App);
