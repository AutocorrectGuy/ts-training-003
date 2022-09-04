import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { TailSpin } from "react-loader-spinner"
import axiosConf from "../../../../services/axios/axios.config"

const AuthSucessfull = () => {

  const navigate = useNavigate()
  useEffect(() => {
    axiosConf.post("/api/logout")
      .then(() => navigate("/login"))
  }, [])

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-neutral-900 overflow-y-hidden">

      <TailSpin
        height="30"
        width="30"
        color="#ffffff"
        ariaLabel="tail-spin-loading"
        radius="2"
        visible={true}
      />
      <h1 className="text-lg text-neutral-200 mt-4">
        Notiek izlogošanās...
      </h1>
    </div>
  )
}

export default AuthSucessfull