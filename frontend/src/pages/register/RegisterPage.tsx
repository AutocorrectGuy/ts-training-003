import AuthLayout from "../../features/auth/auth.layout"
import jsonData from "./register.data.json"
import { useState } from "react"

const RegisterPage = () => {

  const [values, setValues] = useState<object>({})

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    console.log(values)   
  }

  return (
    <AuthLayout
      jsonData={jsonData}
      handleSubmit={handleSubmit}
      valuesState={[values, setValues]}
    />
  )
}

export default RegisterPage