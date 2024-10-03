// import * as admin from "firebase-admin"

// if (!admin.apps.length) {
//   const projectId = "your-project-id" // Tu ID de proyecto en Firebase

//   admin.initializeApp({
//     projectId,
//     credential: admin.credential.applicationDefault(), // Usa credenciales locales
//   })
// }

// export const adminAuth = admin.auth()
// export const adminFirestore = admin.firestore()

// // Conectar al emulador en el servidor
// if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true") {
//   process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080"
//   process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099"
// }

// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only"

import { headers } from "next/headers"
import { initializeServerApp } from "firebase/app"

import { firebaseConfig } from "./config"
import { getAuth } from "firebase/auth"

export async function getAuthenticatedAppForUser() {
  const idToken = headers().get("Authorization")?.split("Bearer ")[1]

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken
      ? {
          authIdToken: idToken,
        }
      : {},
  )

  const auth = getAuth(firebaseServerApp)

  if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true") {
    process.env["FIRESTORE_EMULATOR_HOST"] = process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_PATH
    process.env["FIREBASE_AUTH_EMULATOR_HOST"] = process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH
  }

  await auth.authStateReady()
  return { firebaseServerApp, currentUser: auth.currentUser }
}
