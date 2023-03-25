
import { makeAutoObservable, runInAction } from "mobx"
import { getSongUrlById } from "../axios/request"
import { formatIndex } from "../utils"
import { makePersistable } from "mobx-persist-store"
class MusicStore {
  // 
  currentSong = {
    au: "",
    src: "",
    name: "Apple Muisc",
    img: "",
    index: 0,
  }
  volume: number = 0.5
  userPlaylists: { name: string, id: string, playlist: Song[] }[] = []
  recents: Song[] = []
  likes: Song[] = []
  playWay = "loop"
  playQueue: Song[] = []


  currentPagePlayList: Song[] = []
  audioRef: HTMLAudioElement | null = null
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, {
      name: "musicStorageApplemusic",
      properties: ["currentSong", "playQueue", "volume", "playWay", "userPlaylists", "recents", "likes"]
      , storage: window.localStorage
    }).then((persistStroe) => {
      console.log('persistStroe', persistStroe)
    })

  }
  setAudioRef(ref: HTMLAudioElement) {
    this.audioRef = ref
  }
  setVolume(volume: number) {
    this.volume = Math.min(100, Math.max(0, volume))
  }
  addLikes(song: Song) {
    this.likes.push(song)
  }
  addUserPlaylists(name: string) {
    this.userPlaylists.push({
      name,
      id: Math.floor(Math.random() * 100000).toString(16),
      playlist: []
    })

  }
  addInUserPlaylist(name: string, song: Song) {
    this.userPlaylists.forEach((item) => {
      if (item.name === name) {
        item.playlist.push(song)
      }
    })
  }
  addRecents(song: Song) {
    this.recents.push(song)
    if (this.recents.length > 15) {
      this.recents.shift()
    }
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
      this.audioRef?.play()
    })

    this.addRecents(song)

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
  setCurrentPagePlayList(playlist: Song[]) {
    this.currentPagePlayList = playlist
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