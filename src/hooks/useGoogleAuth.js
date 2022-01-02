import { useState, useEffect } from 'react'
import { projectAuth , projectStorage, projectFirestore, googleAuthProvider} from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useGoogleAuth = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async () => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.signInWithPopup(googleAuthProvider)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      let resImage = res.user.photoURL.split('/')
      resImage = resImage[resImage.length - 1]
      console.log(resImage)

      fetch(res.user.photoURL).then(res => {
        return res.blob();
      }).then(blob => {
          //uploading blob to firebase storage
          const uploadPath = `thumbnails/${res.user.uid}/${resImage}`
          projectStorage.ref(uploadPath).put(blob).then(function(snapshot) {
          return snapshot.ref.getDownloadURL()
       }).then(url => {
         console.log("Firebase storage image uploaded : ", url); 
        }) 
      }).catch(error => {
        console.error(error);
      });

      // console.log(res)
      // const uploadPath = `thumbnails/${res.user.uid}/${res.user.photoURL}`
      // const image = await projectStorage.ref(uploadPath).put()
      // const imageURL = await image.ref.getDownloadURL()

      //create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName : res.user.displayName.split(" ").join(""),
        photoURL: res.user.photoURL
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}