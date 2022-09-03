import { NavigateFunction } from "react-router-dom"
import { strObj } from "../../features/auth/auth.intefrace"
import axiosConf from "./axios.config"

interface IregisterPagePostRequest {
  dataToPost: object
  setErrorsFromBackend: React.Dispatch<React.SetStateAction<strObj>>,
  navigate: NavigateFunction
}
export const registerPagePostRequest = ({
  dataToPost,
  setErrorsFromBackend,
  navigate
}: IregisterPagePostRequest) => {
  axiosConf
    .post("/api/register", dataToPost)
    .then(res => {
      setErrorsFromBackend(typeof (res.data) === "object"
        ? res.data
        : {})
      typeof (res.data) === "string" && navigate("/auth-success")
    })
}