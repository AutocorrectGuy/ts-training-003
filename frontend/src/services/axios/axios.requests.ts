import { NavigateFunction, useNavigate } from "react-router-dom"
import { strObj } from "../../features/auth/auth.intefrace"
import axiosConf from "./axios.config"
import { Dispatch, SetStateAction, useState, useEffect } from "react"

interface IregisterPagePostRequest {
  dataToPost: object
  setErrorsFromBackend: React.Dispatch<React.SetStateAction<strObj>>,
  navigate: NavigateFunction
}
export const registerPagePostRequest = ({
  dataToPost,
  setErrorsFromBackend,
  navigate
}: IregisterPagePostRequest) => {
  axiosConf
    .post("/api/register", dataToPost)
    .then(res => {
      setErrorsFromBackend(typeof (res.data) === "object"
        ? res.data
        : {})
      typeof (res.data) === "string" && navigate("/auth-success")
    })
}




const navigateOut = (
  isAuthPage: boolean,
  isLoggedIn: boolean | undefined,
  navigateFunction: NavigateFunction
) => {
  // navigate to feed/home page, if user is logged in
  if (isAuthPage && isLoggedIn) {
    navigateFunction("/")
    return
  }
  // navigate to login page, if user is not logged in
  if (!isAuthPage && !isLoggedIn) {
    navigateFunction("/login")
    return
  }
}
export const useAuthCheck = (isAuthPage: boolean) => {
  const [authorized, setAuthorized] = useState<boolean | undefined>(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosConf.get("/api/isauthorized")
        // navigate if neccessarry before sending back boolean
        navigateOut(isAuthPage, res.data.isLoggedIn, navigate)
        // if not navigated, set boolean state which will be returned in the end
        setAuthorized(typeof (res.data.isLoggedIn) === "boolean"
          ? res.data.isLoggedIn
          : false
        )
      } catch (error) {
        navigateOut(isAuthPage, false, navigate)
      }
    })()
  }, [])
  return authorized
}
