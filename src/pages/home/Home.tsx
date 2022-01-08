import { IonContent, IonPage } from '@ionic/react'
import './Home.css'

const Home = () => {
  const username = 'help'

  // const [username, setUsername] = useState('Loading')

  // useEffect(() => {
    // const fun = async () => {
    //   await window.sipapu.getUsername()
    //     .then(u => setUsername(u))
    //     .catch(err => {
    //       console.error(err)
    //       alert('Something went wrong, try reloading')
    //     })
    // }

    // fun()
  // }, [])

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