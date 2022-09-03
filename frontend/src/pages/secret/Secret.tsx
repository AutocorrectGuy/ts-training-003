import { useEffect } from "react"
import axiosConf from "../../services/axios/axios.config"
import TestNav from "../_partials/TestNav/TestNav"


type Props = {
  hasNavBar?: boolean
}

const Secret = ({hasNavBar}: Props) => {
  useEffect(() => {
    axiosConf.get("/api/secret")
  }, [])

  return (
    <>
      {hasNavBar && <TestNav />}
      <div>Secret page</div>
    </>
  )
}

export default Secret