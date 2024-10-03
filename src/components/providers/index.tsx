import AntdProvider from "./AntdProvider"
import ServiceWorkerProvider from "./ServiceWorkerProvider"

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <ServiceWorkerProvider>
      <AntdProvider>{children}</AntdProvider>
    </ServiceWorkerProvider>
  )
}
