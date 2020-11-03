import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDxSMA4BsajoTT7YXrqqiE9ZH65-AupQI8",
    authDomain: "tennis-4f8cb.firebaseapp.com",
    databaseURL: "https://tennis-4f8cb.firebaseio.com",
    projectId: "tennis-4f8cb",
    storageBucket: "tennis-4f8cb.appspot.com",
    messagingSenderId: "725115563434",
    appId: "1:725115563434:web:8ddeff5b93bff6f22bcfd3",
    measurementId: "G-KM3ZJ28ESD"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
	auth.signInWithPopup(provider)
}

export const generateUserDocument = async (user, additionalData) => {
	if (!user) return
	
    const userRef = firestore.doc(`users/${user.uid}`)
    const snapshot = await userRef.get()
	
	if (!snapshot.exists) {
      	const { email, displayName, photoURL } = user
      	try {
        	await userRef.set({
			displayName,
			email,
			photoURL,
			...additionalData
        	})
      	} catch (error) {
        	console.error("Error creating user document", error)
      	}
    }
	
	return getUserDocument(user.uid)
}

const getUserDocument = async uid => {
	if (!uid) return null
	try {
		const userDocument = await firestore.doc(`users/${uid}`).get()
		return {
			uid,
			...userDocument.data()
		}
	} catch (error) {
		console.error("Error fetching user", error)
	}
}