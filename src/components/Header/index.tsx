import { useState, useRef } from "react";
import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
export function Header(props: any) {
  const [state, setState] = useState({
    isDark: false,
  });
  const nav = useNavigate();
  const [hidden, setHidden] = useState(true);
  const menuRef = useRef(null);
  const menuOptions = [
    {
      title: "主题",
      icon: themeIcon(state.isDark),
      onClick: (isDark: boolean) => {
        setTheme(isDark);
        setTimeout(() => {
          setHidden(true);
          document.removeEventListener("mousedown", mousedownListener);
        }, 400);
      },
    },
    {
      title: "下一首播放",
      icon: "",
      onClick: () => {},
    },
  ];
  function isInner(
    node: Element,
    e: MouseEvent,
    outerMostLayer: Element = document.body
  ): boolean {
    if (node == e.target) {
      return true;
    }
    for (let n: any = e.target; n != outerMostLayer; n = n.parentElement) {
      if (n == node) {
        return true;
      }
    }
    return false;
  }
  function mousedownListener(e: MouseEvent) {
    if (!isInner(menuRef.current as any, e)) {
      setHidden(true);
      document.removeEventListener("mousedown", mousedownListener);
    }
  }
  function switchHidden() {
    setHidden(!hidden);
    document.addEventListener("mousedown", mousedownListener);
  }
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
          width="20"
          height="20"
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
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4142"
          width="20"
          height="20"
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
  function navigate(path: any) {
    nav("/");
  }
  return (
    <div className="header">
      <div className="back">
        <svg
          className={location.pathname == "/" ? "icon hidden" : "icon"}
          onClick={() => navigate("/")}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3822"
          width="200"
          height="200"
        >
          <path
            d="M800 480H268.8l233.6-233.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-284.8 288c-12.8 12.8-12.8 32 0 44.8h3.2l284.8 288c6.4 6.4 16 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6 12.8-12.8 12.8-32 0-44.8L272 544H800c19.2 0 32-12.8 32-32s-16-32-32-32z"
            fill="#ff213d"
            p-id="3823"
          ></path>
        </svg>
      </div>
      <div className="more">
        <svg
          onClick={() => switchHidden()}
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2763"
          width="24"
          height="24"
        >
          <path
            d="M415.93 223.79c0-52.98 43.004-95.984 95.984-95.984s95.984 43.004 95.984 95.984-43.004 95.984-95.984 95.984-95.984-43.003-95.984-95.984zM415.93 511.742c0-52.98 43.004-95.984 95.984-95.984s95.984 43.004 95.984 95.984-43.004 95.984-95.984 95.984-95.984-43.004-95.984-95.984zM415.93 799.866c0-52.98 43.004-95.984 95.984-95.984s95.984 43.003 95.984 95.984-43.004 95.983-95.984 95.983-95.984-43.175-95.984-95.983z"
            p-id="2764"
            fill="#ff213d"
          ></path>
        </svg>
        <div className={hidden ? "hidden menu-wapper" : "menu-wapper"}>
          <div className="menu" ref={menuRef}>
            {menuOptions.map((item) => {
              return (
                <button
                  key={item.title}
                  onClick={() => item.onClick(!state.isDark)}
                >
                  <span>{item.title}</span>
                  <span> {item.icon}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
