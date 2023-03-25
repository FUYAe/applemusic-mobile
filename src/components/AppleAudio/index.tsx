import { useEffect, useState } from "react";
import "./index.scss";
import defaultImg from "../../assets/react.svg";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Audio } from "../Audio";
export default observer(function AppleAudio(props: any) {
  const [state, setState] = useState({
    isDark: false,
  });
  const { musicStore } = useStore();
  function setTheme(isDark: boolean) {
    setState({
      isDark,
    });
    if (isDark) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
    }
  }
  function themeIcon(isDark: boolean) {
    if (!isDark) {
      return (
        <svg
          onClick={() => setTheme(true)}
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2286"
          width="30"
          height="30"
        >
          <path
            d="M593.054 120.217C483.656 148.739 402.91 248.212 402.91 366.546c0 140.582 113.962 254.544 254.544 254.544 118.334 0 217.808-80.746 246.328-190.144C909.17 457.12 912 484.23 912 512c0 220.914-179.086 400-400 400S112 732.914 112 512s179.086-400 400-400c27.77 0 54.88 2.83 81.054 8.217z"
            fill="#000000"
            fillOpacity=".65"
            p-id="2287"
          ></path>
        </svg>
      );
    } else {
      return (
        <svg
          onClick={() => setTheme(false)}
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4142"
          width="30"
          height="30"
        >
          <path
            d="M512 256a42.666667 42.666667 0 0 0 42.666667-42.666667V128a42.666667 42.666667 0 0 0-85.333334 0v85.333333a42.666667 42.666667 0 0 0 42.666667 42.666667zM896 469.333333h-85.333333a42.666667 42.666667 0 0 0 0 85.333334h85.333333a42.666667 42.666667 0 0 0 0-85.333334zM256 512a42.666667 42.666667 0 0 0-42.666667-42.666667H128a42.666667 42.666667 0 0 0 0 85.333334h85.333333a42.666667 42.666667 0 0 0 42.666667-42.666667zM265.386667 213.333333a42.666667 42.666667 0 0 0-59.306667 62.72l61.44 59.306667a42.666667 42.666667 0 0 0 31.146667 11.946667 42.666667 42.666667 0 0 0 30.72-13.226667 42.666667 42.666667 0 0 0 0-60.16zM725.333333 347.306667a42.666667 42.666667 0 0 0 29.44-11.946667l61.44-59.306667A42.666667 42.666667 0 0 0 758.613333 213.333333l-61.44 60.586667a42.666667 42.666667 0 0 0 0 60.16 42.666667 42.666667 0 0 0 28.16 13.226667zM512 768a42.666667 42.666667 0 0 0-42.666667 42.666667v85.333333a42.666667 42.666667 0 0 0 85.333334 0v-85.333333a42.666667 42.666667 0 0 0-42.666667-42.666667zM756.48 688.64a42.666667 42.666667 0 0 0-59.306667 61.44L758.613333 810.666667a42.666667 42.666667 0 0 0 29.44 11.946666 42.666667 42.666667 0 0 0 30.72-12.8 42.666667 42.666667 0 0 0 0-60.586666zM267.52 688.64l-61.44 59.306667a42.666667 42.666667 0 0 0 0 60.586666 42.666667 42.666667 0 0 0 30.72 12.8 42.666667 42.666667 0 0 0 28.586667-10.666666l61.44-59.306667a42.666667 42.666667 0 0 0-59.306667-61.44zM512 341.333333a170.666667 170.666667 0 1 0 170.666667 170.666667 170.666667 170.666667 0 0 0-170.666667-170.666667z"
            p-id="4143"
            fill="#fff"
          ></path>
        </svg>
      );
    }
  }
  return (
    <div className="apple-audio">
      <img src={musicStore.currentSong.img || defaultImg} alt="" />
      <div className="info">
        <div className="name-au">
          {musicStore.currentSong.name} - {musicStore.currentSong.au}
        </div>
        <div className="control">
          <Audio src={musicStore.currentSong.src} />
        </div>
      </div>
    </div>
  );
});
