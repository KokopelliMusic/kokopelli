import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import { splitList } from '../../util'
import './Spotify.css'

type SpotifySong = {
  title: string,
  artist: string,
  cover: string,
  length: number,
  coverArt: string
}

export default class Spotify extends React.Component {

  state = {
    results: []
  }

  onInput(e: React.FormEvent<HTMLInputElement>) {
    let search: string = e.currentTarget.value

    if (!search) return

    fetch(`https://api.nierot.com/search/?query=${search}`)
      .then(data => data.json())
      .then(data => this.parseResults(data.body.tracks.items))
      .then(data => console.log(this.state))
  }

  parseResults(res: any) {
    res.map((item: any) => <SpotifyResult song={item}/>)
    this.setState({ results: res })
  }

  render() {
    return <IonPage>
      <IonContent>
        <div className="center">
          <h2>Add a Spotify song</h2>
        </div>

        <div>
          <input
            id="spotify-input"
            className="input"
            type="text"
            placeholder="Search Spotify"
            onInput={e => this.onInput(e)}
          />
        </div>

        <div className="songs">
          <SpotifyResult song={{
              title: 'title',
              artist: 'artist',
              coverArt: 'coverart',
              cover: 'cover',
              length: 100000
            }} />
        </div>
      </IonContent>
    </IonPage>
  }
}

type SpotifyResultProps = {
  song: SpotifySong
}

const SpotifyResult: React.FC<SpotifyResultProps> = (props: SpotifyResultProps) => {

  return (
    <div className="spotify-result">
      <div className="cover-art">

      </div>
      <div className="title">
        <b>{props.song.title}</b>
      </div>
      <div className="artists">
        {props.song.artist}
      </div>
    </div>
  )
}
