"use client"

import React, { useState } from "react"
import type { FormProps } from "antd"
import { Button, Form, Input } from "antd"
import { signInWithEmailAndPassword } from "@/lib/firebase/auth"
import { useRouter } from "next/navigation"

type FieldType = {
  email?: string
  password?: string
  remember?: string
}

export default function LoginForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true)
    try {
      const credential = await signInWithEmailAndPassword(values)
      console.log("welcome", credential.user.email)
      // router.push("/")
      window.location.assign("/")
    } catch (error: any) {
      console.error(error.message)
    }
    setLoading(false)
  }

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      name="form_login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true, email: "test@test.com", password: "123456" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Usuario"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  )
}
