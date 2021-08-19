import { database } from '../firebase'
import { getRef } from './user'
import { backend } from '../config.json'

export type Playlist = {
  dateCreated: string
  name: string
  user: string
  songs?: {}
  users?: {}
}

type Song = {
  addedBy: string
  id: string
  type: string
  title: string
  artist: string
  uid: string
}

export type SpotifySong = Song & {
  type: 'spotify'
  length: number
  cover: string
}

export const addSong = async (uid: string, playlistId: string, song: SpotifySong) => {
  const userExits = await containsUser(uid, playlistId)

  // @ts-expect-error
  song.playlistId = playlistId
  // @ts-expect-error
  song.spotifyId = song.id

  const add = async () => {
    await fetch(`${backend}/playlist/add/spotify`, {
      method: 'POST',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => {
      console.log(resp)
    })
  }

  if (!userExits) {
    // If the user has not added any songs, then add the song after
    // this is because firebase is weird
    return await addUser(uid, playlistId).then(async () => await add())
  } else {
    // User has added before, thus we do not have to care about anything
    return await add()
  }

}

export const addUser = (uid: string, playlistId: string) => {
  return database 
    .ref('/playlists/' + playlistId + '/users')
    .push()
    .set(uid)
}

export const listenForCurrentSong = (sessionCode: string, callback: (title: string, artist: string, cover: string) => void) => {
  const path = '/currently-playing/' + sessionCode.toUpperCase()

  console.log(path)

  database
    .ref(path)
    .on('value', snap => {
      const song = snap.val()

      console.log(song)

      if (!song) return

      callback(song.title, song.artist, song.cover)
    })

  return database.ref(path)
}

// export const getSongsPerUser = (playlistId: string) => {
//   const users = database
//     .ref('/playlists/' + playlistId + '/users')
//     .get()
//     .then(val => val.val())
//     .then(users => {
//       let u = []
//       for (const [, user] of Object.entries(users)) {
//         u.push(user)
//       }
//       return u
//     })
    
// }

// export const containsSong = async (song: SpotifySong, playlistId: string) => {
//   return await database
//     .ref('/playlists/' + playlistId + '/songs')
//     .get()
//     .then(songs => songs.val())
//     .then(songs => {
//       if (!songs) return false

//       for (const [, val] of Object.entries(songs)) {
//         // @ts-expect-error
//         if (song.id === val.id) {
//           return true
//         }
//       }

//       return false
//     })
// }

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

export const checkSessionCode = async (code: string): Promise<boolean> => {
  return await database
    .ref('/sessions/' + code.toUpperCase())
    .get()
    .then(resp => resp.val())
    .then(resp => !!resp)
}

export const getPlaylistFromSession = async (code: string): Promise<string> => {
  return await database
    .ref('/sessions/' + code + '/playlistId')
    .get()
    .then(resp => resp.val())
}