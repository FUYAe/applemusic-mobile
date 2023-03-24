import React, { ComponentProps, useEffect } from 'react';
import { useState, ReactPropTypes } from 'react'
import { getTopLists } from '../../axios/request'
import { useNavigate } from "react-router-dom"
import './index.scss'
type StateType = { toplist: any[] }
export function Home(props: ComponentProps<any>) {

  let [content, setContent] = useState([])
  let navigate = useNavigate()


  useEffect(() => {
    getTopLists().then((res) => {
      let data = res.data;
      setContent(data.list)
    })
  }, [])
  function navigatetToList(id: any, data: any) {
    navigate("/toplist/" + id, { state: data })
  }

  return (
    <div className='home'>
      <div className='search'>
        <div className="title">搜索</div>
        <input placeholder='艺人、歌曲、歌词及更多内容' type="text" />
      </div>
      <div className='toplist-title'>排行榜</div>
      <div className='toplist'>
        {
          content.map((list: any) => {
            return (
              <button onClick={() => navigatetToList(list.id, list)} key={list.id} className='top-item'>

                <img src={list.coverImgUrl} alt="" />
                <div>{list.name}</div>

              </button>
            )
          })
        }
      </div>

    </div>

  )


}