import { IonContent, IonIcon, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useEffect, useRef, useState } from 'react'
import { redirect } from '../../util'
import './StartSession.css'

const JoinSession = () => {

  const [otp1, setOtp1] = useState('')
  const [otp2, setOtp2] = useState('')
  const [otp3, setOtp3] = useState('')
  const [otp4, setOtp4] = useState('')
  const errorRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let code = (otp1 + otp2 + otp3 + otp4).toUpperCase()
    if (otp4 !== '' && code.length === 4) {
      window.sipapu.Session.get(code)
        .then(session => {
          if (!session) {
            if (errorRef.current) {
              errorRef.current.innerText = 'Code does not exist'
            }
          } else {
            window.sipapu.Session.setSessionId(code)
            redirect('/session')
          }
        })
        .catch(err => {
          if (errorRef.current) {
            errorRef.current.innerText = err.message
          }
        })

    }
  }, [otp1, otp2, otp3, otp4])

  const inputFocus = (e: any) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const next = e.target.tabIndex - 2

      if (next > -1) {
        e.target.form.elements[next].focus()
      }
    } else {
      const next = e.target.tabIndex
      if (next < 4) {
        e.target.form.elements[next].focus()
      }
    }
  }

  
  return <IonPage>
    <IonContent>
      <div className="fullscreen background">
        <div className="header">
          <a href={'/home'} className="back">
            <IonIcon icon={arrowBack} className="back-icon"/>
            <span>Back</span>
          </a>
        </div>
        <div id="connect" className="text-center">

          <h1>Connect</h1>
          <p>Fill in the code that is in the top left corner of the player</p>

          <p ref={errorRef} className="text-error"/>

          <div id="otp">
            <form>
              <OTPInputField name="1" value={otp1} setValue={setOtp1} inputFocus={inputFocus}/>
              <OTPInputField name="2" value={otp2} setValue={setOtp2} inputFocus={inputFocus}/>
              <OTPInputField name="3" value={otp3} setValue={setOtp3} inputFocus={inputFocus}/>
              <OTPInputField name="4" value={otp4} setValue={setOtp4} inputFocus={inputFocus}/>
            </form>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

const OTPInputField = ({ name, value, setValue, inputFocus }: any) =>
<input 
  name={name}
  type="text"
  autoComplete="off"
  className="otp-input"
  value={value}
  onChange={e => setValue(e.target.value)}
  tabIndex={name}
  maxLength={1}
  onKeyUp={e => inputFocus(e)}
/>

export default JoinSession