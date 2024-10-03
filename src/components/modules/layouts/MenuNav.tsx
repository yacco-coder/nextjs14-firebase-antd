"use client"

import { ETypeProduct, ETypeVoucher } from "@/enums"
import {
  AimOutlined,
  AuditOutlined,
  BarChartOutlined,
  CarOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  GoldFilled,
  ProductOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem(<Link href="/admin/dashboard">Escritorio</Link>, "/admin/dashboard", <BarChartOutlined />),
  getItem(
    <Link href={`/admin/vouchers?type=${ETypeVoucher.order}`}>Pedidos</Link>,
    `/admin/vouchers?type=${ETypeVoucher.order}`,
    <FileDoneOutlined />,
  ),
  getItem(
    <Link href={`/admin/vouchers?type=${ETypeVoucher.sale}`}>Ventas</Link>,
    `/admin/vouchers?type=${ETypeVoucher.sale}`,
    <FileDoneOutlined />,
  ),
  getItem(<Link href="/admin/customers">Clientes</Link>, "/admin/customers", <ContactsOutlined />),

  getItem("Repartos", "grp1", null, [], "group"),
  { type: "divider" },
  getItem(<Link href="/admin/distributions">Lista de repartos</Link>, "/admin/distributions", <AimOutlined />),
  getItem(<Link href="/admin/zones">Zonas</Link>, "/admin/zones", <GlobalOutlined />),
  getItem(<Link href="/admin/vehicles">Vehículos</Link>, "/admin/vehicles", <CarOutlined />),

  getItem("Producto", "grp2", null, [], "group"),
  { type: "divider" },
  getItem(
    <Link href={`/admin/products?type=${ETypeProduct.product}`}>Lista de productos</Link>,
    `/admin/products?type=${ETypeProduct.product}`,
    <GoldFilled />,
  ),
  getItem(
    <Link href={`/admin/products?type=${ETypeProduct.envase}`}>Envases</Link>,
    `/admin/products?type=${ETypeProduct.envase}`,
    <GoldFilled />,
  ),
  getItem(<Link href="/admin/brands">Marcas</Link>, "/admin/brands", <TagsOutlined />),

  getItem("Gastos e ingresos", "grp3", null, [], "group"),
  { type: "divider" },
  getItem(<Link href="/admin/cash-movements">Gastos e Ingresos</Link>, "/admin/cash-movements", <AuditOutlined />),

  getItem("Configuración", "grp4", null, [], "group"),
  { type: "divider" },
  getItem(<Link href="/admin/users">Usuarios</Link>, "/admin/users", <TeamOutlined />),
]

export default function MenuNav() {
  const pathname = usePathname()
  const [selectedItem, setSelectedItem] = useState([pathname])

  const handleClick: MenuProps["onClick"] = (e) => {
    setSelectedItem([e.key])
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={["sub1", "sub2"]}
      items={items}
      selectedKeys={selectedItem}
      onClick={handleClick}
    />
  )
}
