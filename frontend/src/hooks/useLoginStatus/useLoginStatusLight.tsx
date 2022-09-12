import { useState, useEffect } from "react"
import { NavigateFunction } from "react-router-dom"
import axiosConf from "../../services/axios/axios.config"

type Props = {
  navigate: NavigateFunction
  isAuthPage?: boolean | undefined
}

/**
 * 
 * This functions checks only isLoggedIn cookie
 * if it does not exist, then all jwts are deleted.
 * @param param0 object: {
 *  navigate: useNavigate hook,
 *  isAuthPage: boolean
 * }
 * @returns 
 */
export const useLoginStatusLight = ({ navigate, isAuthPage }: Props) => {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // check if user has isLoggedIn cookie
    const hasCookieForLogin = document.cookie.toString()
      .indexOf("isLoggedIn=true") !== -1
    // if not, then delete all jwt httponly cookies
    !hasCookieForLogin && (
      async function () {
        await axiosConf.post("/api/logout")
      }
    )()

    if (hasCookieForLogin && isAuthPage) navigate("/")
    else if (!hasCookieForLogin && !isAuthPage) navigate("/login")
    setLoggedIn(hasCookieForLogin)
  }, [])

  return (loggedIn)
}