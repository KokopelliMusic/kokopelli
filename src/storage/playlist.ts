import { database } from '../firebase'
import { getRef } from './user'

export type Playlist = {
  dateCreated: string
  name: string
  user: string
  songs?: {}
  users?: {}
}

type Song = {
  id: string
  type: string
  title: string
  artist: string
}

export type SpotifySong = Song & {
  type: 'spotify'
  length: number
  cover: string
}

export const addSong = async (uid: string, playlistId: string, song: SpotifySong) => {
  const userExits = await containsUser(uid, playlistId)
  const songExists = await containsSong(song, playlistId)
  
  if (!userExits) addUser(uid, playlistId)

  if (!songExists) {
    database
      .ref('/playlists/' + playlistId + '/songs')
      .push()
      .set(song)
  }
}

export const addUser = (uid: string, playlistId: string) => {
  database 
    .ref('/playlists/' + playlistId + '/users')
    .push()
    .set(uid)
}

export const containsSong = async (song: SpotifySong, playlistId: string) => {
  return await database
    .ref('/playlists/' + playlistId + '/songs')
    .get()
    .then(songs => songs.val())
    .then(songs => {
      if (!songs) return false

      for (const [, val] of Object.entries(songs)) {
        // @ts-expect-error
        if (song.id === val.id) {
          return true
        }
      }

      return false
    })
}

export const containsUser = async (uid: string, playlistId: string) => {
  return await database
    .ref('/playlists/' + playlistId + '/users')
    .get()
    .then(users => users.val())
    .then(users => {
      if (!users) return false

      for (const [, val] of Object.entries(users)) {
        if (uid === val) {
          return true
        }
      }
      return false
    })
}

export const getPlaylist = async (playlistId: string): Promise<Playlist> => {
  return await database.ref('/playlists/' + playlistId)
    .get()
    .then(p => p.val())
}

export const getPlaylists = async (uid: string): Promise<Playlist[]> => {
  return await getRef(uid, 'playlists')
    .get()
    .then(ps => ps.val())
    .then(async pids => {
      let ps = []
      for (const [, val] of Object.entries(pids)) {
        // @ts-expect-error
        let p = await getPlaylist(val)
        ps.push(Object.assign(p, { id: val }))
      }
      return ps
    })
}
