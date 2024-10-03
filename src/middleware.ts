import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { EFilterDate, ETypeProduct, ETypeVoucher } from "./enums"

export async function middleware(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname === "/" || (request.nextUrl.pathname === "/admin/vouchers" && !request.nextUrl.search)) {
    return NextResponse.redirect(new URL("/admin/vouchers?type=" + ETypeVoucher.order, request.url))
  }

  if (request.nextUrl.pathname === "/admin/products" && !request.nextUrl.search) {
    return NextResponse.redirect(new URL("/admin/products?type=" + ETypeProduct.product, request.url))
  }

  if (request.nextUrl.pathname === "/admin/cash-movements" && !request.nextUrl.search) {
    return NextResponse.redirect(new URL("/admin/cash-movements?filterDate=" + EFilterDate.all, request.url))
  }

  const token = request.headers.get("Authorization")?.split("Bearer ")[1]

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verificar el token con Firebase Admin SDK
    await adminAuth.verifyIdToken(token)
    return NextResponse.next() // Si el token es válido, permitir acceso
  } catch (error) {
    console.error("Error al verificar token", error)
    // Si el token es inválido, redirigir al login
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // const session = request.cookies.get("session")
  // console.log("session", session)
  // //Return to /login if don't have a session
  // if (!session) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }
  // //Call the authentication endpoint
  // const responseAPI = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/session`, {
  //   headers: {
  //     Cookie: `session=${session?.value}`,
  //   },
  // })
  // //Return to /login if token is not authorized
  // if (responseAPI.status !== 200) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }
  // return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
}
