import SiderMain from "@/components/modules/layouts/SiderMain"
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp"
import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import { redirect } from "next/navigation"
import React from "react"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { currentUser } = await getAuthenticatedAppForUser()
  if (!currentUser) redirect("/login")
  console.log("currentUser", currentUser)

  return (
    <Layout hasSider>
      <SiderMain currentUser={undefined} />
      <Layout>
        <Content className="mx-4 ">
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}
