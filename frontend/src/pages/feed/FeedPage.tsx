import TestNav from "../_partials/TestNav/TestNav"
import { useEffect } from "react"
import axiosConf from "../../services/axios/axios.config"

type Props = {
  hasNavBar?: boolean
}
const FeedPage = ({ hasNavBar }: Props) => {
  useEffect(() => {
    axiosConf.get("/api/posts")
      .then((res) => {
        console.log(res.data)
      })
  }, [])

  return (
    <>
      {hasNavBar && <TestNav />}
      <div className="flex items-center justify-center w-full h-screen bg-slate-800">
        <h1 className="text-neutral-200">
          FeedPage
        </h1>
      </div>
    </>
  )
}

export default FeedPage