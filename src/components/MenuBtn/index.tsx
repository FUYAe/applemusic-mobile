import { useRef, useState } from "react";
import "./index.scss";
interface MenuOption {
  title: string;
  onClick: () => any;
  icon: any | (() => any);
}
export const MenuBtn: React.FC<any> = ({
  menuOptions,
  children,
  style,
}: {
  children: any;
  style: {};
  menuOptions: MenuOption[];
}) => {
  const [hidden, setHidden] = useState(true);
  const menuRef = useRef(null);

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
  function switchHidden(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setHidden(!hidden);
    document.addEventListener("mousedown", mousedownListener);
  }
  function handleOnclick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fn: any
  ) {
    e.stopPropagation();
    fn();
    setTimeout(() => {
      setHidden(true);
      document.removeEventListener("mousedown", mousedownListener);
    }, 400);
  }
  return (
    <div className="menu-btn" style={style}>
      <button onClick={(e) => switchHidden(e)}>{children}</button>
      <div className={hidden ? "hidden menu-wapper" : "menu-wapper"}>
        <div className="menu" ref={menuRef}>
          {menuOptions.map((item) => {
            return (
              <button
                key={item.title}
                onClick={(e) => handleOnclick(e, item.onClick)}
              >
                <span>{item.title}</span>
                <span> {item.icon}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
