"use client"

import { firebaseConfig } from "@/lib/firebase/config"
import React, { useEffect } from "react"

interface Props {
  children: React.ReactNode
}

export default function ServiceWorkerProvider({ children }: Props) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig))
      const serviceWorkerUrl = `/firebase-messaging-sw.js?firebaseConfig=${serializedFirebaseConfig}`

      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then((registration) => console.log("scope is: ", registration.scope))
    }
  }, [])

  return <>{children}</>
}
