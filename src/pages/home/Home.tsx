import { IonAvatar, IonContent, IonItem, IonLabel, IonList, IonNav, IonPage } from '@ionic/react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/FirebaseAuthContext'
import { getUser } from '../../storage/user'
import './Home.css'

const Home = () => {

  const [username, setUsername] = useState('Loading')
  const user = useContext(AuthContext)

  useEffect(() => {
    const fun = async () => {
      await getUser(user.user?.uid!)
        .then(user => setUsername(user.username))
    }

    fun()
  }, [user])

  return <IonPage>
    <IonContent>
      <div className="background fullscreen-ns">
        <div>&nbsp;</div>
        <div id="home-title">
          <h1>
            Hello {username}
          </h1>
          <h4>
            Select an item below to get started
          </h4>
        </div>
        <div id="home-list">
          <Button text="My playlists" to="/playlists" />
          <Button text="Start a new session" to="/newsession" />
          <Button text="Join a session" to="/joinsession" />
        </div>
      </div>
    </IonContent>
  </IonPage>
}

type ButtonProps = {
  text: string,
  to: string
}

const Button = ({ text, to }: ButtonProps)  =>
<a className="home-button" href={ to }>
  <h3 className="text-center">
    { text }
  </h3>
</a>

export default Home