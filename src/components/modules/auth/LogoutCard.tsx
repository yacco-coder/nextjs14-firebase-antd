"use client"

import { auth } from "@/lib/firebase/clientApp"
import { Button } from "antd"
import { User, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface Props {
  currentUser?: User
}

export default function LogoutCard({ currentUser }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const user = currentUser ? (currentUser as User) : undefined

  const handleSignOut = async () => {
    if (!auth) throw new Error("Error auth")

    setLoading(true)
    await signOut(auth)
    window.location.assign("/login")
    setLoading(false)
  }

  return (
    <div>
      <p className="text-white ">{user?.email}</p>
      <Button type="link" danger onClick={handleSignOut} loading={loading}>
        Cerrar sesión
      </Button>
    </div>
  )
}
