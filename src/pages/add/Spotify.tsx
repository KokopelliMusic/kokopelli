import { IonButton, IonContent, IonIcon, IonInput, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React from 'react'
import { SongEnum, SpotifySongCreateType } from 'sipapu/src/services/song'
import './Spotify.css'

type SpotifySearchSong = {
  title: string
  artist: string
  cover: string
  length: number
  id: string
  album: string
  queryResult: any
  onClick: (song: SpotifySearchSong) => void
}

export default class Spotify extends React.Component {

  state = {
    results: [],
    playlist: 0,
    username: ''
  }

  onInput(e: React.FormEvent<HTMLIonInputElement>) {
    let search = e.currentTarget.value

    if (!search) return

    fetch(`https://api.nierot.com/search/?query=${search}`)
      .then(data => data.json())
      .then(data => this.parseResults(data.body.tracks.items))
  }

  componentDidMount() {
    window.sipapu.getUsername()
      .then(u => this.setState({ username: u }))

    window.sipapu.Session.get(window.sipapu.Session.sessionId!)
      .then(session => window.sipapu.Playlist.get(session!.playlistId))
      .then(playlist => this.setState({ playlist: playlist.id }))
      .catch(err => {
        console.error(err)
        alert('Something went wrong, try reloading')
      })

    // getSession(this.context.user.uid)
    //   .then(user => {
    //     this.setState({
    //       playlist: user.playlistId
    //     })
    //   })

    // getUser(this.context.user.uid)
    //   .then(user => user.username)
    //   .then(username => {
    //     this.setState({
    //       username
    //     })
    //   })
  }

  onResultClick = async (song: SpotifySearchSong) => {
    const create: SpotifySongCreateType = {
      title: song.title,
      platformId: song.id,
      addedBy: await window.sipapu.getUsername(),
      playlistId: this.state.playlist,
      queryResult: song.queryResult,
      artist: song.artist,
      cover: song.cover,
      length: song.length,
      album: song.album,
      songType: SongEnum.SPOTIFY
    }
    window.sipapu.Song.createSpotify(create)
      .then(() => window.location.reload())
      .catch(err => {
        console.error(err)
        alert('Something went wrong adding this song.')
      })
    // await addSong(this.context.user.uid, this.state.playlist, {
    //   addedBy: this.state.username,
    //   uid: this.context.user.uid,
    //   id,
    //   artist,
    //   title,
    //   cover,
    //   length,
    //   type: SongType.Spotify
    // }).then(() => {
    //   window.location.reload()
    // })
  }

  parseResults(res: any) {
    const reducer = (acc: string, cur: any, idx: number, arr: any[]) => {
      if (idx === arr.length - 1) {
        return acc.concat(cur.name)
      }

      return acc.concat(cur.name + ', ')
    }

    this.setState({ results: res.map((item: any) => <SpotifyResult {...{
      title: item.name,
      artist: item.album.artists.reduce(reducer, ''),
      cover: item.album.images[0].url,
      length: item.duration_ms,
      id: item.id,
      album: item.album.name,
      queryResult: item,
      onClick: this.onResultClick
    }}/>) })
  }

  render() {
    return <IonPage>
      <IonContent>
        <div id="sp" className="background">
          <div className="header width-90">
            <a href="/session" className="back">
              <IonIcon icon={arrowBack} className="back-icon"/>
              <span>Back</span>
            </a>
          </div>
          <div className="center">
            <h2>Add a song to this playlist</h2>
          </div>

          <div className="center">
            <IonInput
              id="sp-input"
              type="text"
              autofocus
              clearInput
              enterkeyhint="search"
              placeholder="Search on Spotify"
              onInput={e => this.onInput(e)}
            />
          </div>

          <div className="songs">
            {this.state.results}
          </div>
        </div>

      </IonContent>
    </IonPage>
  }
}


const SpotifyResult: React.FC<SpotifySearchSong> = (props: SpotifySearchSong) => {

  return <div className="sp-result" key={props.id}>
      <div className="sp-cover">
        <img src={props.cover} alt="Cover Art" />
      </div>
      <div className="sp-card">
        <div className="sp-title">
          {props.title}
        </div>
        <div className="sp-artist">
          {props.artist}
        </div>
      </div>

      <div className="sp-button">
        <IonButton onClick={() => props.onClick(props)}>
          +
        </IonButton>
      </div>

    </div>
}
