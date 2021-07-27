import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { musicalNotes, barcode, pricetag, people, logoYoutube } from 'ionicons/icons'
import React, { useState, useEffect } from 'react'
import { redirect } from '../../util'
import { getUser, initialUser, User } from '../../storage/user'
import './Session.css'

class Session extends React.Component {

  state = {
    user: initialUser
  }

  async componentDidMount() {
    this.setState({
      user: await getUser()
    })
  }

  render() {
    const { username, playlistName, isGuest, initialized, sessionId } = this.state.user
    // TODO dit opvragen van backend
    const songsLen = 157
    const userLen  = 5

    if (!initialized) {
      alert('kut ionic')
      // redirect('/init')
    }

    return (
      <IonPage>
        <IonContent>
          <div className="background" id="session">
            {/* Filler */}
            <div />

            {/* Title */}
            <div className="center">
              <h1 className="text-center width-90">
                Welcome {username}
              </h1>
            </div>

            {/* Simple information about playlist */}
            <div className="center">
              <div className="connection">
                <h4>
                  <IonIcon icon={pricetag} />
                  &nbsp;{playlistName}
                </h4>
                {/* Playlist code*/}
                <h4>
                  <IonIcon icon={barcode} />
                  &nbsp;{sessionId}
                </h4>
                <h4>
                  <IonIcon icon={musicalNotes} />
                  &nbsp;{songsLen} songs
                </h4>
                <h4>
                  <IonIcon icon={people} />
                  &nbsp;{userLen} users
                </h4>
              </div>
            </div>

            <div className="center">
              Add a song to this playlist
            </div>

            <div className="buttons">
              <div className="center">
                <button className="platform-button spotify white" onClick={() => redirect('/add/spotify')}>
                  <img id="spotify-icon" src="https://cdn.nierot.com/-/spotify.svg" alt="logo"/>
                  &nbsp;Spotify
                </button>
              </div>

              <div className="center">
                <button className="platform-button youtube white" onClick={() => redirect('/add/youtube')}>
                  <img id="youtube-icon" src="https://cdn.nierot.com/-/youtube.svg" alt="logo"/>
                  &nbsp;YouTube
                </button>
              </div>

              <div className="center">
                <button className="platform-button primary white" onClick={() => redirect('/add/mp3')}>
                  <img id="mp3-icon" src="https://cdn.nierot.com/-/mp3.svg" alt="logo"/>
                  &nbsp;MP3
                </button>
              </div>
            </div>

          </div>
        </IonContent>
      </IonPage>
    )
  }
}

// const Session: React.FC = () => {



 
// }

export default Session