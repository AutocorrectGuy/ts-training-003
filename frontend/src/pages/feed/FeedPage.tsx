import TestNav from "../_partials/TestNav/TestNav"
import { useEffect } from "react"
import axiosConf from "../../services/axios/axios.config"
import { useLoginStatusLight } from "../../hooks/useLoginStatus/useLoginStatusLight"
import { useNavigate } from "react-router-dom"
import { RenderWithLoginStatus } from "../../hooks/useLoginStatus/RenderWithLoginStatus"

type Props = {
  hasNavBar?: boolean
}
const FeedPage = ({ hasNavBar }: Props) => {

  const navigate = useNavigate()
  const loggedIn = useLoginStatusLight({ navigate })

  useEffect(() => {
    axiosConf.get("/api/posts")
      .then((res) => {
        console.log("data: ")
        console.log(JSON.stringify(res.data))
      })
  }, [])

  return RenderWithLoginStatus({
    loggedIn,
    children:
      <>
        {hasNavBar && <TestNav />}
        <div className="flex items-center justify-center w-full h-screen bg-slate-800">
          <h1 className="text-neutral-200">
            FeedPage
          </h1>
        </div>
      </>
  })
}

export default FeedPage