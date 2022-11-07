import TestNav from "../_partials/TestNav/TestNav"
import { useEffect, useState } from "react"
import axiosConf from "../../services/axios/axios.config"
import { useNavigate } from "react-router-dom"
import { useLoginStatusLight } from "../../hooks/useLoginStatus/useLoginStatusLight"
import { RenderWithLoginStatus } from "../../hooks/useLoginStatus/RenderWithLoginStatus"
import AccountPanel from "./AccountPanel"

type Props = {
  hasNavBar?: boolean
}

const AccountPage = ({ hasNavBar }: Props) => {
  const navigate = useNavigate()
  const loggedIn = useLoginStatusLight({ navigate })
  const [userData, setUserData] = useState<{ [key: string]: string } | undefined>(undefined)

  useEffect(() => {
    console.log("Login hook has worked succesfully")
    loggedIn && (async function () {
      console.log("isLoggedIn: ", loggedIn)

      await axiosConf.get("/get-account")
        .then(res => {
          console.log("Status: ", res.status)
          const resData = res.data
          console.log("UPDATES RECIEVED SUCCESSFULLY")
          console.log(resData)
          setUserData(resData)
        })
    })()
  }, [loggedIn])

  const UserPanel = () => {

    // <div className="flex flex-col text-neutral-200">
    //     <div>{userData.username}</div>
    //     <div>{userData._id?.toString()}</div>
    //     <div>{userData.password}</div>
    //     <div>{userData.__v}</div>
    //   </div>
    return (userData === undefined
      ? <div>Loading...</div>
      : <AccountPanel userData={userData} />)
  }
  
  return RenderWithLoginStatus({
    loggedIn,
    children:
      <>
        {hasNavBar && <TestNav />}
        {
          userData &&
          <div className="flex flex-col items-center justify-center w-full min-h-screen bg-neutral-800">
            <UserPanel />
          </div>
        }

      </>
  })
}

export default AccountPage