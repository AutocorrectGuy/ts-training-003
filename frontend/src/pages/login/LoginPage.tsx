import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { strObj } from "../../features/auth/auth.intefrace"
import AuthLayout from "../../features/auth/auth.layout"
import IsLoadingComponent from "../../features/auth/transitions/isLoadingComponent/IsLoadingComponent"
import axiosConf from "../../services/axios/axios.config"
import { useAuthCheck } from "../../services/axios/axios.requests"
import TestNav from "../_partials/TestNav/TestNav"
import jsonData from "./login.data.json"
import cookies from "react-cookie"

type Props = {
  hasNavBar?: boolean
}

const RegisterPage = ({ hasNavBar }: Props) => {

  const navigate = useNavigate()
  const [errorsFromBackend, setErrorsFromBackend] = useState<strObj>({})
  console.log(document.cookie)
  const isLoggedIn = false

  // backend call
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    formData.username = `${formData.username}`.toLowerCase()

    axiosConf.post("/api/login", formData)
      .then(res => {
        setErrorsFromBackend(typeof (res.data) === "object"
          ? res.data
          : {})
        typeof (res.data) === "string" && navigate("/auth-success")
      })
  }

  return (
    <> {
      isLoggedIn === undefined
        ? <IsLoadingComponent />
        :
        <>
          {hasNavBar && <TestNav />}
          <AuthLayout
            jsonData={jsonData}
            handleSubmit={handleSubmit}
            PAGE_TYPE={"login"}
            errorsFromBackendState={[errorsFromBackend, setErrorsFromBackend]}
          />
        </>
    }</>
  )

}

export default RegisterPage