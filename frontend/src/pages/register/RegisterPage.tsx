import { useState } from "react"
import { strObj } from "../../features/auth/auth.intefrace"
import AuthLayout from "../../features/auth/auth.layout"
import axiosConf from "../../services/axios/axios.config"
import jsonData from "./register.data.json"
import { useNavigate } from "react-router-dom"
import TestNav from "../_partials/TestNav/TestNav"
import { registerPagePostRequest } from "../../services/axios/axios.requests"
import { filterDataToPost, formDataToObject } from "./registerPage.helpers"

type Props = {
  hasNavBar?: boolean
}
const RegisterPage = ({ hasNavBar }: Props) => {
  const navigate = useNavigate()
  const [errorsFromBackend, setErrorsFromBackend] = useState<strObj>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = formDataToObject(e)
    const dataToPost = filterDataToPost(formData)
    registerPagePostRequest({dataToPost, setErrorsFromBackend, navigate})
  }
  return (
    <>
      {hasNavBar && <TestNav />}
      <AuthLayout
        jsonData={jsonData}
        handleSubmit={handleSubmit}
        PAGE_TYPE={"register"}
        errorsFromBackendState={[errorsFromBackend, setErrorsFromBackend]}
      />
    </>

  )
}

export default RegisterPage