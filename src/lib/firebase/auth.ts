import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
} from "firebase/auth"

import { auth } from "@/lib/firebase/clientApp"

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  if (!auth) throw new Error("Error auth")
  return _onAuthStateChanged(auth, cb)
}

export async function signInWithGoogle() {
  if (!auth) throw new Error("Error auth")

  const provider = new GoogleAuthProvider()

  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.error("Error signing in with Google", error)
  }
}

export async function signInWithEmailAndPassword(credential: any) {
  if (!auth) throw new Error("Error auth")

  return await _signInWithEmailAndPassword(auth, credential.email, credential.password)
}

export function signOut() {
  if (!auth) throw new Error("Error auth")

  try {
    return auth.signOut()
  } catch (error) {
    console.error("Error signing out with Google", error)
  }
}
