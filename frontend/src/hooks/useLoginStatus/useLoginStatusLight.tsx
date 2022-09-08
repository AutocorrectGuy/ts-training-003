import { useState, useEffect } from "react"
import { NavigateFunction } from "react-router-dom"
import axiosConf from "../../services/axios/axios.config"

type Props = {
  navigate: NavigateFunction
  isAuthPage: boolean | undefined
}
export const useLoginStatusLight = ({ navigate, isAuthPage }: Props) => {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    const loggedIn = document.cookie.toString().indexOf("isLoggedIn=true") !== -1
    
    /**
     * 
        TODO: if not, delete all cookies or send request to server to delte all cookies
     * 
     */
    axiosConf.post("/api/logout")
      .then((res) => {
        console.log(res.data)
      })

    if (loggedIn && isAuthPage) navigate("/")
    else if (!loggedIn && !isAuthPage) navigate("/login")
    setLoggedIn(loggedIn)
  }, [])

  return (loggedIn)
}