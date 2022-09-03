import { useState } from "react"
import { strObj } from "../../features/auth/auth.intefrace"
import AuthLayout from "../../features/auth/auth.layout"
import axiosConf from "../../services/axios/axios.config"
import TestNav from "../_partials/TestNav/TestNav"
import jsonData from "./login.data.json"

type Props = {
  hasNavBar?: boolean
}

const RegisterPage = ({ hasNavBar }: Props) => {
  const [errorsFromBackend, setErrorsFromBackend] = useState<strObj>({})

  // backend call
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    formData.username = `${formData.username}`.toLowerCase() 
    console.log(formData)
    axiosConf.post("/api/login", formData)
  }

  return (
    <>
      {hasNavBar && <TestNav />}
      <AuthLayout
        jsonData={jsonData}
        handleSubmit={handleSubmit}
        PAGE_TYPE={"login"}
        errorsFromBackendState={[errorsFromBackend, setErrorsFromBackend]}
      />
    </>

  )
}

export default RegisterPage