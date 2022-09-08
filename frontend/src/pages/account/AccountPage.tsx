import TestNav from "../_partials/TestNav/TestNav"
import { useEffect } from "react"
import axiosConf from "../../services/axios/axios.config"

type Props = {
  hasNavBar?: boolean
}

const AccountPage = ({ hasNavBar }: Props) => {
  useEffect(() => {
    axiosConf.get("/get-account")
      .then(res => {
        console.log("Status: ", res.status)
        console.log("Data: ", res.data)
      })
  }, [])

  return (
    <>
      {hasNavBar && <TestNav />}
      <div className="flex items-center justify-center w-full min-h-screen bg-neutral-800">
        <h1 className="pt-10 text-neutral-200">Account page placeholder</h1>
      </div>
    </>
  )
}

export default AccountPage