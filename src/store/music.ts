
import { makeAutoObservable, runInAction } from "mobx"
import { getSongUrlById } from "../axios/request"
function formatIndex(n: number, len: number) {
  if (n >= len) {
    return 0 + (n - len)
  }
  if (n < 0) {
    return len + n
  }
  return n
}
class MusicStore {
  currentSong = {
    au: "",
    src: "",
    name: "Apple Muisc",
    img: "",
    index: 0,


  }
  playWay = "loop"
  playQueue: Song[] = []
  constructor() {
    makeAutoObservable(this)
  }
  async setCurrentSong(song: Song, index: number) {
    const res = await getSongUrlById(song.id)
    runInAction(() => {
      this.currentSong = {
        au: song.ar[0].name,
        src: res.data.data[0].url,
        name: song.name,
        img: song.al.picUrl,
        index

      }
    })



  }
  switchPlayWay() {
    if (this.playWay === "loop") {
      this.playWay = "random"
    } else {
      this.playWay = "loop"
    }
  }
  playMusicByIndex(index: number) {
    let len = this.playQueue.length
    if (!len) return
    if (this.playWay === "loop") {
      index = formatIndex(index, len)
    } else if (this.playWay === "random") {
      index = Math.floor(Math.random() * len)
    }
    this.setCurrentSong(this.playQueue[index], index)
  }
  setPlayQueue(playlist: Song[]) {
    this.playQueue = playlist
  }
  addPlayQueue(song: Song, index?: number) {
    if (!index) {
      this.playQueue.push(song)
      return
    }
    this.playQueue.splice(index, 0, song)

  }
}
const musicStore = new MusicStore()
export { musicStore, MusicStore } 