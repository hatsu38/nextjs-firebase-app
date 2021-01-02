import firebase from 'firebase/app'
import { useEffect } from 'react'
import { User } from '../modules/User'
import { atom, useRecoilState } from 'recoil'

const userState = atom<User>({
  key: 'user',
  default: null,
})

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user !== null) {
      return
    }
    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        console.error(error)
      })

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        console.log(firebaseUser);
        setUser({
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
        })
      } else {
        setUser(null)
      }
    })
  }, [])

  return { user }
}
