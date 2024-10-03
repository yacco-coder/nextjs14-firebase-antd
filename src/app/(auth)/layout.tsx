import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp"
import { redirect } from "next/navigation"
import React from "react"

export const dynamic = "force-dynamic"

interface Props {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: Props) {
  const { currentUser } = await getAuthenticatedAppForUser()
  if (currentUser) redirect("/")

  return <>{children}</>
}
