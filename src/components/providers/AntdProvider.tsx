"use client"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App, ConfigProvider, theme } from "antd"
import React from "react"
import esES from "antd/locale/es_ES"
import themeConfig from "@/theme/themeConfig"

interface Props {
  children: React.ReactNode
}

export default function AntdProvider({ children }: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={esES}
        theme={{
          algorithm: [theme.compactAlgorithm],
          ...themeConfig,
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  )
}
