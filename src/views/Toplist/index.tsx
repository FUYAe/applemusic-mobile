import React, { ComponentProps, useEffect, useState } from "react"
import { getPlayList } from "../../axios/request"
import { useLocation, useParams } from 'react-router-dom'
import "./index.scss"
export function Toplist(props: any) {
    let [state, setState] = useState({
        songs: [] as Song[]
    })
    let params = useParams()
    let location = useLocation()
    useEffect(() => {
        // location
        console.log(location);

        state.songs.length || getPlayList(Number(params.id), 0, 50).then(res => {
            let songs = res.data.songs

            console.log(res.data)
            setState({
                songs
            })
        })
    }, [])

    function playmusic(id: any, info: Song) {
        props.onClick(id, info)
    }


    return (
        <div className="top-detail">
            <div className="back">
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3822" width="200" height="200"><path d="M800 480H268.8l233.6-233.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-284.8 288c-12.8 12.8-12.8 32 0 44.8h3.2l284.8 288c6.4 6.4 16 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6 12.8-12.8 12.8-32 0-44.8L272 544H800c19.2 0 32-12.8 32-32s-16-32-32-32z" fill="#ff213d" p-id="3823"></path></svg>
            </div>
            <div className="description">
                <img src={location.state.coverImgUrl} alt="" />
                <div> {location.state.description
                }</div>
            </div>
            <div className="songs">
                {
                    state.songs.map(song => {
                        return (
                            <div onClick={() => playmusic(song.id, song)} key={song.id} className="song-item">
                                <img className="song-img" src={song.al.picUrl} alt="" />
                                <div className="song-info">
                                    <div className="song-des">
                                        <div className="name">{song.name}</div>
                                        <div className="au">{song.ar[0].name}</div>
                                    </div>
                                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2763" width="200" height="200"><path d="M415.93 223.79c0-52.98 43.004-95.984 95.984-95.984s95.984 43.004 95.984 95.984-43.004 95.984-95.984 95.984-95.984-43.003-95.984-95.984zM415.93 511.742c0-52.98 43.004-95.984 95.984-95.984s95.984 43.004 95.984 95.984-43.004 95.984-95.984 95.984-95.984-43.004-95.984-95.984zM415.93 799.866c0-52.98 43.004-95.984 95.984-95.984s95.984 43.003 95.984 95.984-43.004 95.983-95.984 95.983-95.984-43.175-95.984-95.983z" p-id="2764"></path></svg>
                                </div>
                            </div>

                        )
                    }
                    )
                }

            </div>

        </div>

    )

}