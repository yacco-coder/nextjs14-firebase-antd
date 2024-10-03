"use client"

import Sider from "antd/es/layout/Sider"
import React, { useEffect, useState } from "react"
import MenuNav from "./MenuNav"

interface Props {
  currentUser?: object
}

export default function SiderMain({ currentUser }: Props) {
  const [footerShow, setFooterShow] = useState(false)

  const handleCollapse = (isCollapse: boolean) => {
    setFooterShow(!isCollapse)
  }

  //   const user = useUserSession((currentUser as User) ?? null)

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      className="h-screen lg:sticky fixed left-0 top-0 bottom-0 z-10 lg:overflow-auto"
      onCollapse={handleCollapse}
    >
      <div className="p-4 text-center text-white">
        <span className="font-bold text-xl">
          Yacco<sup className="text-xs">App</sup>
        </span>
      </div>

      <MenuNav />
      <div className="py-5"></div>
    </Sider>
  )
}
