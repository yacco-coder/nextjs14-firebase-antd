import { adminFirestore } from "@/lib/firebase/serverApp"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const snapshot = await adminFirestore.collection("users").get()
    const users = snapshot.docs.map((doc) => doc.data())

    return NextResponse.json({ users })
  } catch (error: any) {
    return NextResponse.json({ message: "Error al obtener datos", error: error.message }, { status: 500 })
  }
}
