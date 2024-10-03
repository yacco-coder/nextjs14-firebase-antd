import { initializeApp, getApps } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { firebaseConfig } from "./config"
import { connectStorageEmulator, getStorage } from "firebase/storage"
import { connectFunctionsEmulator, getFunctions } from "firebase/functions"

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)

// Conectar Firebase Auth y Firestore al emulador si está habilitado
if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true") {
  connectAuthEmulator(auth, "http://localhost:9099")
  connectFirestoreEmulator(db, "localhost", 8080)
  connectStorageEmulator(storage, "localhost", 9199)
  connectFunctionsEmulator(functions, "localhost", 5001)
}

export { auth, db }
