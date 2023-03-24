
import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from "./views/Home"
import { Toplist } from './views/Toplist'
import { AppleAudio } from './components/AppleAudio'
import { useState } from 'react'
import { getSongUrlById } from './axios/request'


function App() {

  const [state, setState] = useState({
    name: "apple",
    au: "apple",
    src: "",
    img: ""
  })
  function playmusic(id: any, info: Song) {

    getSongUrlById(+id).then(res => {
      // res.data

      let src = res.data.data[0].url
      setState({
        src,
        name: info.name,
        au: info.ar[0].name,
        img: info.al.picUrl
      })
    })
  }
  return (


    <div id='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toplist/:id" element={<Toplist onClick={(id: any, info: Song) => playmusic(id, info)} />} />
        </Routes>
      </Router>

      <AppleAudio value={state} ></AppleAudio>
    </div>

  )
}

export default App
