

import { musicStore, MusicStore } from "./music"
import React from "react"


class RootStore {
  musicStore: MusicStore
  constructor() {
    this.musicStore = musicStore
  }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)
export { useStore }