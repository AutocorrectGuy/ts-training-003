import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { TailSpin } from "react-loader-spinner"

const AuthSucessfull = () => {

  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 1000)
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
        Autorizēšanās sekmīga! Pārvietojam tevi us sākumlapu...
      </h1>
    </div>
  )
}

export default AuthSucessfull