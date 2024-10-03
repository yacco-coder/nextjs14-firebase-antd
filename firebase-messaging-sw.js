// // Importar las versiones de compatibilidad de Firebase
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js');

// // Inicializar Firebase en el Service Worker
// firebase.initializeApp({
//   apiKey: "fake-api-key",
//   authDomain: "localhost",
//   projectId: "your-project-id",
// });

// // Obtener Auth y Firestore
// const auth = firebase.auth();
// const db = firebase.firestore();

// // Conectar al emulador de Firebase Auth y Firestore
// auth.useEmulator('http://localhost:9099/');
// db.useEmulator('localhost', 8080);

import { initializeApp } from "firebase/app"
import { getAuth, getIdToken } from "firebase/auth"
import { getInstallations, getToken } from "firebase/installations"

// this is set during install
let firebaseConfig

self.addEventListener("install", (event) => {
  // extract firebase config from query string
  const serializedFirebaseConfig = new URL(location).searchParams.get("firebaseConfig")

  if (!serializedFirebaseConfig) {
    throw new Error("Firebase Config object not found in service worker query string.")
  }

  firebaseConfig = JSON.parse(serializedFirebaseConfig)
  console.log("Service worker installed with Firebase config", firebaseConfig)
})

// Escuchar eventos de autenticación o mensajes en segundo plano
self.addEventListener("fetch", (event) => {
  console.log("Interceptando petición:", event)
  // Aquí puedes manejar las operaciones en segundo plano, como reintentar autenticación
  const { origin } = new URL(event.request.url)
  if (origin !== self.location.origin) return
  event.respondWith(fetchWithFirebaseHeaders(event.request))
})

async function fetchWithFirebaseHeaders(request) {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  // auth.useEmulator("http://localhost:9099/")

  const installations = getInstallations(app)
  const headers = new Headers(request.headers)
  const [authIdToken, installationToken] = await Promise.all([getAuthIdToken(auth), getToken(installations)])
  headers.append("Firebase-Instance-ID-Token", installationToken)
  if (authIdToken) headers.append("Authorization", `Bearer ${authIdToken}`)
  const newRequest = new Request(request, { headers })
  return await fetch(newRequest)
}

async function getAuthIdToken(auth) {
  await auth.authStateReady()
  if (!auth.currentUser) return
  return await getIdToken(auth.currentUser)
}
