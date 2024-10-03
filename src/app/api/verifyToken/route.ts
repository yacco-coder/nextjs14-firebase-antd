import { adminAuth } from "@/lib/firebase/serverApp"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1]

  if (!token) {
    return NextResponse.json({ message: "No se proporcionó token" }, { status: 401 })
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    return NextResponse.json({ message: "Usuario autenticado", uid: decodedToken.uid })
  } catch (error: any) {
    return NextResponse.json({ message: "Token inválido o no verificado", error: error.message }, { status: 401 })
  }
}
