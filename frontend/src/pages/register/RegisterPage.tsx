import { useState } from "react"
import { strObj } from "../../features/auth/auth.intefrace"
import AuthLayout from "../../features/auth/auth.layout"
import jsonData from "./register.data.json"
import { useNavigate } from "react-router-dom"
import TestNav from "../_partials/TestNav/TestNav"
import { registerPagePostRequest } from "../../services/axios/axios.requests"
import { filterDataToPost, formDataToObject } from "./registerPage.helpers"
import { useLoginStatusLight } from "../../hooks/useLoginStatus/useLoginStatusLight"
import { RenderWithLoginStatus } from "../../hooks/useLoginStatus/RenderWithLoginStatus"

type Props = {
  hasNavBar?: boolean
}
const RegisterPage = ({ hasNavBar }: Props) => {
  const navigate = useNavigate()
  const loggedIn = useLoginStatusLight({ navigate, isAuthPage: true })
  const [errorsFromBackend, setErrorsFromBackend] = useState<strObj>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = formDataToObject(e)
    const dataToPost = filterDataToPost(formData)
    registerPagePostRequest({ dataToPost, setErrorsFromBackend, navigate })
  }
  return RenderWithLoginStatus({
    loggedIn, children:
      <>
        {hasNavBar && <TestNav />}
        <AuthLayout
          jsonData={jsonData}
          handleSubmit={handleSubmit}
          PAGE_TYPE={"register"}
          errorsFromBackendState={[errorsFromBackend, setErrorsFromBackend]}
        />
      </>
  })
}

export default RegisterPage