import axiosConf from "../../services/axios/axios.config"
import { NavigateFunction } from "react-router-dom"
import { useState } from "react"


/**
 * 
 * 
 * 
 * 
 * NOT USED YET!!!!!!!!!!!!!!!
 */
type Props = {
  navigate: NavigateFunction
}
/**
 * 1.: checks if user has is isLoggedIn cookie
 * 2. on server decodes jwt and finds user data
 */

export const useLoginStatusHeavy = ({ navigate }: Props) => {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)


  const hasCookie = document.cookie.toString().indexOf("isLoggedIn=true") !== -1
  if (!hasCookie) {
    axiosConf.post("/api/logout")
      .then(() => navigate("/login"))
  }
  return loggedIn
}