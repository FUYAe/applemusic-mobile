

import { musicStore, MusicStore } from "./music"
import React from "react"
import { makeAutoObservable, runInAction } from "mobx"

class Store {
  msg = ""
  _type = ""
  constructor() {
    makeAutoObservable(this)
  }
  handleMsgType(type: string,) {
    if (type === "success") {
      this._type = "blue"
    } else if (type === "warning") {
      this._type = "red"
    }

  }
  setMsg(msg: string, type: string, delay: number = 800) {
    this.handleMsgType(type)
    this.msg = msg


    setTimeout(() => {
      runInAction(() => {
        this.msg = ""
      })
    }, delay)

  }
}
const store = new Store()
class RootStore {
  musicStore: MusicStore
  store: Store
  constructor() {
    this.store = store
    this.musicStore = musicStore
  }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)
export { useStore }