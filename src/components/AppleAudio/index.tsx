import { useEffect } from "react";
import "./index.scss"
export function AppleAudio(props: any) {
    return (
        <div className="apple-audio">
            <img src={props.value.img} alt="" />
            <div className="info">
                <div className="name-au"> {props.value.name} - {props.value.au}</div>
                <div>
                    <audio src={props.value.src} autoPlay controls></audio>
                </div>
            </div>
        </div>
    )
}