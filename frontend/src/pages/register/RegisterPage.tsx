import AuthLayout from "../../features/auth/auth.layout"
import jsonData from "./register.data.json"
import { useState } from "react"

const RegisterPage = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.currentTarget)
    console.log(Object.fromEntries(new FormData(e.currentTarget)))
  }

  return (
    <AuthLayout
      jsonData={jsonData}
      handleSubmit={handleSubmit}
    />
  )
}

export default RegisterPage