import React, {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  MouseEvent,
} from "react";
import "./index.scss";
import { useStore } from "../../store";
function transTime(value: number) {
  var time = "";
  var h = parseInt(`${value / 3600}`);
  value %= 3600;
  var m = parseInt(`${value / 60}`);
  var s = parseInt(`${value % 60}`);
  if (h > 0) {
    time = formatTime(h + ":" + m + ":" + s);
  } else {
    time = formatTime(m + ":" + s);
  }

  return time;
}

function formatTime(value: string) {
  var time = "";
  var s = value.split(":");
  var i = 0;
  for (; i < s.length - 1; i++) {
    time += s[i].length === 1 ? "0" + s[i] : s[i];
    time += ":";
  }
  time += s[i].length === 1 ? "0" + s[i] : s[i];

  return time;
}

export const Audio: React.FC<any> = (props) => {
  const { src, width = "100%", height = "30px" } = props;
  const { musicStore } = useStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const barBgRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const uidRef = useRef<string>(uniqueId());

  const [toggle, setToggle] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(() => musicStore.volume);
  const [isshowVolumeControl, setIsShowVolumeControl] =
    useState<boolean>(false);
  const [duration, setDuration] = useState<string>("00 : 00");
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  function uniqueId() {
    return (Math.random() * 100000).toString(16);
  }
  useLayoutEffect(() => {
    if (audioRef.current && src) {
      musicStore.setAudioRef(audioRef.current);
      audioRef.current.addEventListener("play", (e: Event) => {
        const pid = (e.target as HTMLAudioElement).getAttribute("pid");
        const audios = document.querySelectorAll("audio");

        audios.forEach((element, index) => {
          if (element.getAttribute("pid") === pid) return;
          element.pause();
        });
      });

      audioRef.current.addEventListener("loadedmetadata", (e) => {
        const duration = transTime(
          (e.target as HTMLAudioElement).duration as number
        );

        setDuration(duration);
      });
      audioRef.current.addEventListener("ended", (e) => {
        musicStore.playMusicByIndex(musicStore.currentSong.index + 1);
      });
      audioRef.current.addEventListener("play", (_res) => {
        setToggle(false);
      });
      audioRef.current.addEventListener("pause", () => {
        setToggle(true);
      });
      audioRef.current.addEventListener("timeupdate", (e) => {
        let value =
          (e.target as HTMLAudioElement).currentTime /
          (audioRef.current as HTMLAudioElement).duration;
        setProgress(value * 100);
        setCurrentTime(transTime((e.target as HTMLAudioElement).currentTime));
        // console.log('timeupdate res', res.target.currentTime);
      });
    }
    return () => {};
  }, [src]);
  useEffect(() => {
    if (dotRef.current && src) {
      const position = {
        oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
        oriX: 0, // 移动开始时的x坐标
        maxLeft: 0, // 向左最大可拖动距离
        maxRight: 0, // 向右最大可拖动距离
      };
      let flag = false; // 标记是否拖动开始

      // 按下
      const down = (event: TouchEvent | MouseEvent) => {
        if (!audioRef.current?.paused || audioRef.current.currentTime !== 0) {
          flag = true;
          position.oriOffestLeft = dotRef.current?.offsetLeft ?? 0; // 初始位置
          position.oriX = position.oriX =
            event instanceof TouchEvent
              ? event.touches[0].clientX
              : event.clientX; // 要同时适配mousedown和touchstart事件
          position.maxLeft = position.oriOffestLeft; // 向左最大可拖动距离
          position.maxRight =
            barBgRef.current?.offsetWidth ?? 0 - position.oriOffestLeft; // 向右边最大可拖动距离

          if (event && event.preventDefault) {
            event.preventDefault();
          } else {
            (event as TouchEvent).returnValue = false;
          }

          // 禁止事件冒泡
          if (event && event.stopPropagation) {
            event.stopPropagation();
          }
        }
      };
      // 移动
      const move = (event: TouchEvent | MouseEvent) => {
        if (flag && barBgRef.current) {
          let clientX =
            event instanceof TouchEvent
              ? event.touches[0].clientX
              : event.clientX; // 要同时适配mousemove和touchmove事件

          let length = clientX - position.oriX;
          if (length > position.maxRight) {
            length = position.maxRight;
          } else if (length < -position.maxLeft) {
            length = -position.maxLeft;
          }
          // let pgsWidth = barBgRef.current?.offsetWidth;
          let pgsWidth = parseFloat(
            window.getComputedStyle(barBgRef.current).width.replace("px", "")
          );
          let rate = (position.oriOffestLeft + length) / pgsWidth;

          console.log("===", position.oriOffestLeft, length);

          console.log(
            "偏移总长比例",
            (audioRef.current as HTMLAudioElement).duration * rate,
            rate
          );
          (audioRef.current as HTMLAudioElement).currentTime =
            (audioRef.current as HTMLAudioElement).duration * rate;
        }
      };
      // 结束
      const end = () => {
        flag = false;
      };

      // 鼠标按下时
      dotRef.current.addEventListener("mousedown", down as any, false);
      dotRef.current.addEventListener("touchstart", down, false);

      // 开始拖动
      document.addEventListener("mousemove", move as any, false);
      document.addEventListener("touchmove", move, false);

      // 拖动结束
      document.addEventListener("mouseup", end, false);
      barBgRef.current?.addEventListener("touchend", end, false);
    }
  }, [src]);
  const handlePaly = () => {
    if (toggle && src) {
      audioRef.current?.play();
      return;
    }
    audioRef.current?.pause();
    return;
  };
  function playIcon(play: boolean) {
    if (play) {
      return (
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7166"
          width="30"
          height="30"
        >
          <path
            d="M768 506.026667v11.946666a32.426667 32.426667 0 0 1-15.786667 27.733334L370.346667 768c-23.04 13.653333-34.986667 13.653333-45.226667 7.68l-10.666667-5.973333a32.426667 32.426667 0 0 1-15.786666-26.88V281.173333a32.426667 32.426667 0 0 1 15.786666-27.733333l10.666667-5.973333c10.24-5.973333 22.186667-5.973333 52.053333 11.52l375.04 219.306666a32.426667 32.426667 0 0 1 15.786667 27.733334z"
            p-id="7167"
            fill="#5E6570"
          ></path>
        </svg>
      );
    } else {
      return (
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6202"
          width="30"
          height="30"
        >
          <path
            d="M426.666667 288v448a32.426667 32.426667 0 0 1-32 32h-64a32.426667 32.426667 0 0 1-32-32V288A32.426667 32.426667 0 0 1 330.666667 256h64a32.426667 32.426667 0 0 1 32 32zM693.333333 256h-64a32.426667 32.426667 0 0 0-32 32v448a32.426667 32.426667 0 0 0 32 32h64a32.426667 32.426667 0 0 0 32-32V288a32.426667 32.426667 0 0 0-32-32z"
            p-id="6203"
            fill="#5E6570"
          ></path>
        </svg>
      );
    }
  }
  function playWayIcon(way: string) {
    if (way == "loop") {
      return (
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="20479"
          width="20"
          height="20"
        >
          <path
            d="M474.517333 234.666667h-133.098666C152.938667 234.666667 0 387.52 0 576c0 188.544 152.789333 341.333333 341.269333 341.333333h341.461334C871.168 917.333333 1024 764.501333 1024 576c0-188.522667-152.832-341.333333-341.333333-341.333333v85.333333c141.376 0 256 114.602667 256 256 0 141.376-114.624 256-255.936 256H341.269333C199.914667 832 85.333333 717.418667 85.333333 576c0-141.333333 114.730667-256 256.085334-256h136.106666l-100.202666 100.224 60.330666 60.352 201.728-201.728-203.136-203.114667-60.330666 60.330667L474.517333 234.666667z"
            fill="#5E6570"
            p-id="20480"
          ></path>
        </svg>
      );
    } else if (way == "random") {
      return (
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="21109"
          width="20"
          height="20"
        >
          <path
            d="M68.253 349.325h162.675c8.156 0 32.477 8.156 40.633 16.311l56.944 56.944c16.311 24.467 48.788 24.467 73.109 0 24.467-16.311 24.467-48.788 0-73.109l-56.944-56.944c-24.321-24.321-73.109-48.788-113.887-48.788H68.254c-32.477 0-48.788 24.467-48.788 48.788 0 32.331 24.467 56.798 48.788 56.798z m609.923 0h89.42v65.099c0 16.311 8.156 24.467 24.467 16.311l186.996-121.897c16.311-8.156 16.311-24.467 0-32.477L792.063 154.464c-16.311-8.156-24.467 0-24.467 16.311v89.275h-89.42c-81.265 0-97.575 40.633-154.519 97.575L336.661 625.594c-32.477 32.477-130.052 65.099-178.841 65.099H68.4c-32.477 0-48.788 24.321-48.788 48.788 0 32.477 24.321 48.788 48.788 48.788h89.42c81.265 0 195.152-40.633 252.095-97.575l186.996-268.26c40.633-40.633 32.477-73.109 81.265-73.109z m300.883 373.992L792.063 593.265c-16.311-8.156-24.467 0-24.467 16.311v81.265h-89.42c-8.156 0-32.477-8.156-40.633-16.311l-56.944-56.944c-16.311-24.467-48.788-24.467-73.109 0-24.321 16.311-24.321 48.788 0 73.109l56.944 56.944c24.467 24.321 73.109 48.788 113.887 48.788h89.42v65.099c0 16.311 8.156 24.321 24.467 16.311L979.204 755.94c16.02-8.156 16.02-24.467-0.146-32.622z"
            fill="#5E6570"
            p-id="21110"
          ></path>
        </svg>
      );
    }
  }
  useEffect(() => {
    audioRef.current && (audioRef.current.volume = volume / 100);
  }, [volume]);
  function onvolumechange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(Number(e.target.value));
    musicStore.setVolume(Number(e.target.value));
  }
  function showVolumeControl() {
    return (
      <div className="volume">
        <input
          type="range"
          onChange={(e) => onvolumechange(e)}
          value={volume}
          min={0}
          max="100"
        />
      </div>
    );
  }
  return (
    <>
      <audio
        // @ts-ignore
        pid={uidRef.current}
        controls={false}
        src={src}
        preload="metadata"
        ref={audioRef}
      >
        您的浏览器不支持 audio 标签
      </audio>
      {isshowVolumeControl && showVolumeControl()}
      <div className="audio-container" style={{ width, height }}>
        <div className="audio-control">
          <button onClick={() => setIsShowVolumeControl(!isshowVolumeControl)}>
            <svg
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="22093"
              width="20"
              height="20"
            >
              <path
                d="M949.418667 502.369524v64.024381c-10.800762 120.539429-82.115048 223.646476-183.344762 278.723047L732.330667 780.190476A280.30781 280.30781 0 0 0 877.714286 534.381714a280.380952 280.380952 0 0 0-153.941334-250.319238l33.694477-64.926476c105.764571 53.808762 180.833524 159.305143 191.951238 283.233524z m-145.627429 24.576a218.819048 218.819048 0 0 1-105.618286 187.66019l-33.889523-65.097143a145.700571 145.700571 0 0 0 66.364952-122.563047 145.700571 145.700571 0 0 0-68.583619-124.001524l33.792-65.048381a218.819048 218.819048 0 0 1 107.934476 189.049905zM611.547429 205.04381V829.19619c0 49.859048-61.561905 74.044952-96.060953 37.741715l-160.353524-146.383238H159.305143a73.142857 73.142857 0 0 1-73.142857-73.142857V403.407238a73.142857 73.142857 0 0 1 68.827428-73.020952l4.924953-0.121905 197.680762 3.291429 157.915428-166.229334c34.474667-36.327619 96.060952-12.117333 96.060953 37.741714z"
                p-id="22094"
                fill="#5E6570"
              ></path>
            </svg>
          </button>
          <button
            onClick={() =>
              musicStore.playMusicByIndex(musicStore.currentSong.index + -1)
            }
          >
            <svg
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7411"
              width="20"
              height="20"
            >
              <path
                d="M31.4 466l398.4-238.4c2.4-1.4 5-2.8 7.6-4 2.6-1.2 5.4-2.2 8-3s5.6-1.4 8.4-1.8c2.8-0.4 5.6-0.6 8.6-0.6s5.8 0.2 8.6 0.4c2.8 0.4 5.6 0.8 8.4 1.6 2.8 0.8 5.4 1.6 8.2 2.8 2.6 1 5.2 2.4 7.8 3.8 2.8 1.6 5.2 3.4 7.8 5.2s4.8 4 7 6.2 4.2 4.6 6.2 7c1.8 2.4 3.6 5 5.2 7.8s3 5.6 4 8.4c1.2 2.8 2.2 5.8 3 8.8s1.4 6 1.8 9.2c0.4 3.2 0.6 6.2 0.6 9.4v166.8l381.2-228.2c2.4-1.4 5-2.8 7.6-4 2.6-1.2 5.4-2.2 8-3 2.8-0.8 5.6-1.4 8.4-1.8s5.6-0.6 8.6-0.6c2.8 0 5.8 0.2 8.6 0.4 2.8 0.4 5.6 0.8 8.4 1.6 2.8 0.8 5.4 1.6 8.2 2.8 2.6 1 5.2 2.4 7.8 3.8 2.8 1.6 5.2 3.4 7.8 5.2s4.8 4 7 6.2 4.2 4.6 6.2 7c1.8 2.4 3.6 5 5.2 7.8s3 5.6 4 8.4c1.2 2.8 2.2 5.8 3 8.8 0.8 3 1.4 6 1.8 9.2 0.4 3.2 0.6 6.2 0.6 9.4v466.2c0 3.2-0.2 6.2-0.6 9.4-0.4 3.2-1 6.2-1.8 9.2-0.8 3-1.8 6-3 8.8-1.2 2.8-2.6 5.8-4 8.4-1.6 2.8-3.2 5.4-5.2 7.8-1.8 2.4-4 4.8-6.2 7s-4.6 4.2-7 6.2c-2.4 2-5 3.6-7.8 5.2-2.4 1.4-5 2.6-7.8 3.8-2.6 1-5.4 2-8.2 2.8-2.8 0.8-5.6 1.2-8.4 1.6-2.8 0.4-5.8 0.6-8.6 0.4-2.8 0-5.8-0.2-8.6-0.6-2.8-0.4-5.6-1-8.4-1.8-2.8-0.8-5.4-1.8-8-3-2.6-1.2-5.2-2.4-7.6-4L530.6 588.2v166.8c0 3.2-0.2 6.2-0.6 9.4-0.4 3.2-1 6.2-1.8 9.2-0.8 3-1.8 6-3 9s-2.6 5.8-4 8.4c-1.6 2.8-3.2 5.4-5.2 7.8-1.8 2.4-4 4.8-6.2 7s-4.6 4.2-7 6.2c-2.4 2-5 3.6-7.8 5.2-2.4 1.4-5 2.6-7.8 3.8-2.6 1-5.4 2-8.2 2.8-2.8 0.8-5.6 1.2-8.4 1.6-2.8 0.4-5.8 0.6-8.6 0.4-2.8 0-5.8-0.2-8.6-0.6-2.8-0.4-5.6-1-8.4-1.8-2.8-0.8-5.4-1.8-8-3-2.6-1.2-5.2-2.4-7.6-4L31.4 578c-1.2-0.8-2.4-1.6-3.4-2.4-1.2-0.8-2.2-1.6-3.4-2.6-1-0.8-2.2-1.8-3.2-2.8L18.4 567.2c-1-1-1.8-2-2.8-3.2s-1.8-2.2-2.6-3.2c-0.8-1.2-1.6-2.2-2.4-3.4-0.8-1.2-1.4-2.4-2.2-3.6-0.6-1.2-1.4-2.4-2-3.8-0.6-1.2-1.2-2.6-1.6-3.8-0.6-1.2-1-2.6-1.4-4-0.4-1.4-0.8-2.6-1.2-4-0.4-1.4-0.6-2.8-1-4L0.6 530c-0.2-1.4-0.4-2.8-0.4-4.2 0-1.4-0.2-2.8-0.2-4.2s0-2.8 0.2-4.2c0-1.4 0.2-2.8 0.4-4.2l0.6-4.2c0.2-1.4 0.6-2.8 1-4 0.4-1.4 0.8-2.6 1.2-4 0.4-1.4 1-2.6 1.4-4 0.6-1.2 1-2.6 1.6-3.8 0.6-1.2 1.2-2.4 2-3.8 0.6-1.2 1.4-2.4 2.2-3.6 0.8-1.2 1.6-2.4 2.4-3.4 0.8-1.2 1.6-2.2 2.6-3.2 0.8-1 1.8-2.2 2.8-3.2l3-3c1-1 2-1.8 3.2-2.8 1-0.8 2.2-1.8 3.4-2.6 1.2-0.8 2.2-1.6 3.4-2.4v0.8z"
                p-id="7412"
                fill="#5E6570"
              ></path>
            </svg>
          </button>
          <button className="audio-toggle" onClick={handlePaly}>
            {playIcon(toggle && src)}
          </button>
          <button
            onClick={() =>
              musicStore.playMusicByIndex(musicStore.currentSong.index + 1)
            }
          >
            <svg
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="18707"
              width="20"
              height="20"
            >
              <path
                d="M987.2 456L588.8 217.6c-2.4-1.4-5-2.8-7.6-4-2.6-1.2-5.4-2.2-8-3-2.8-0.8-5.6-1.4-8.4-1.8s-5.6-0.6-8.6-0.6c-2.8 0-5.8 0.2-8.6 0.4-2.8 0.4-5.6 0.8-8.4 1.6-2.8 0.8-5.4 1.6-8.2 2.8-2.6 1-5.2 2.4-7.8 3.8-2.8 1.6-5.2 3.4-7.8 5.2s-4.8 4-7 6.2-4.2 4.6-6.2 7c-1.8 2.4-3.6 5-5.2 7.8s-3 5.6-4 8.4-2.2 5.8-3 8.8-1.4 6-1.8 9.2c-0.4 3.2-0.6 6.2-0.6 9.4v166.8l-380.8-228c-2.4-1.4-5-2.8-7.6-4-2.6-1.2-5.4-2.2-8-3-2.8-0.8-5.6-1.4-8.4-1.8-2.8-0.4-5.6-0.6-8.6-0.6-2.8 0-5.8 0.2-8.6 0.4-2.8 0.4-5.6 0.8-8.4 1.6-2.8 0.8-5.4 1.6-8.2 2.8-2.6 1-5.2 2.4-7.8 3.8-2.8 1.6-5.2 3.4-7.8 5.2s-4.8 4-7 6.2-4.2 4.6-6.2 7c-1.8 2.4-3.6 5-5.2 7.8s-3 5.6-4 8.4-2.2 5.8-3 8.8-1.4 6-1.8 9.2c-0.4 3.2-0.6 6.2-0.6 9.4v466.2c0 3.2 0.2 6.2 0.6 9.4 0.4 3.2 1 6.2 1.8 9.2 0.8 3 1.8 6 3 8.8 1.2 2.8 2.6 5.8 4 8.4 1.6 2.8 3.2 5.4 5.2 7.8 1.8 2.4 4 4.8 6.2 7s4.6 4.2 7 6.2c2.4 2 5 3.6 7.8 5.2 2.4 1.4 5 2.6 7.8 3.8 2.6 1 5.4 2 8.2 2.8 2.8 0.8 5.6 1.2 8.4 1.6 2.8 0.4 5.8 0.6 8.6 0.4 2.8 0 5.8-0.2 8.6-0.6 2.8-0.4 5.6-1 8.4-1.8 2.8-0.8 5.4-1.8 8-3 2.6-1.2 5.2-2.4 7.6-4l381.2-228v166.8c0 3.2 0.2 6.2 0.6 9.4 0.4 3.2 1 6.2 1.8 9.2 0.8 3 1.8 6 3 9s2.6 5.8 4 8.4c1.6 2.8 3.2 5.4 5.2 7.8 1.8 2.4 4 4.8 6.2 7s4.6 4.2 7 6.2c2.4 2 5 3.6 7.8 5.2 2.4 1.4 5 2.6 7.8 3.8 2.6 1 5.4 2 8.2 2.8 2.8 0.8 5.6 1.2 8.4 1.6 2.8 0.4 5.8 0.6 8.6 0.4 2.8 0 5.8-0.2 8.6-0.6 2.8-0.4 5.6-1 8.4-1.8 2.8-0.8 5.4-1.8 8-3 2.6-1.2 5.2-2.4 7.6-4l398-238.4c1.2-0.8 2.4-1.6 3.4-2.4 1.2-0.8 2.2-1.6 3.4-2.6 1-0.8 2.2-1.8 3.2-2.8l3-3c1-1 1.8-2 2.8-3.2 0.8-1 1.8-2.2 2.6-3.2 0.8-1.2 1.6-2.2 2.4-3.4 0.8-1.2 1.4-2.4 2.2-3.6 0.6-1.2 1.4-2.4 2-3.8 0.6-1.2 1.2-2.6 1.6-3.8 0.6-1.2 1-2.6 1.4-4 0.4-1.4 0.8-2.6 1.2-4 0.4-1.4 0.6-2.8 1-4l0.6-4.2c0.2-1.4 0.4-2.8 0.4-4.2 0-1.4 0.2-2.8 0.2-4.2 0-1.4 0-2.8-0.2-4.2 0-1.4-0.2-2.8-0.4-4.2l-0.6-4.2c-0.2-1.4-0.6-2.8-1-4-0.4-1.4-0.8-2.6-1.2-4-0.4-1.4-1-2.6-1.4-4-0.6-1.2-1-2.6-1.6-3.8-0.6-1.2-1.2-2.4-2-3.8-0.6-1.2-1.4-2.4-2.2-3.6-0.8-1.2-1.6-2.4-2.4-3.4-0.8-1.2-1.6-2.2-2.6-3.2-0.8-1-1.8-2.2-2.8-3.2l-3-3c-1-1-2-1.8-3.2-2.8-1-0.8-2.2-1.8-3.4-2.6-1.2-0.8-2.2-1.6-3.4-2.4v0.8z"
                p-id="18708"
                fill="#5E6570"
              ></path>
            </svg>
          </button>
          <button onClick={() => musicStore.switchPlayWay()}>
            {playWayIcon(musicStore.playWay)}
          </button>
        </div>

        <div className="progress-bar">
          <span className="audio-time">{currentTime}</span>
          <div className="audio-progress-bar-bg" ref={barBgRef}>
            <span
              ref={dotRef}
              className="progressDot"
              style={{ left: `${progress - 2}%` }}
            ></span>
            <div
              ref={barRef}
              className="audio-progress-bar"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
          <span className="audio-time">{duration}</span>
        </div>
      </div>
    </>
  );
};

export default Audio;
