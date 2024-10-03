import LoginForm from "@/components/modules/auth/LoginForm"
import { Card } from "antd"
import React from "react"

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <Card className="lg:w-[500px] shadow-md mt-6">
        <LoginForm />
      </Card>
    </div>
  )
}
