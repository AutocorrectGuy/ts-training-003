import { strObj } from "../../auth.intefrace"
import { useEffect, useState } from "react"
import { TailSpin } from 'react-loader-spinner'

type ISubmitButton = {
  label: string,
  pageType: string,
  isValid: boolean,
  joinedValues: React.MutableRefObject<strObj>
  errorsFromBackendState: [strObj, React.Dispatch<React.SetStateAction<strObj>>]
}

const SubmitButton = ({
  label,
  pageType,
  isValid,
  joinedValues,
  errorsFromBackendState
}: ISubmitButton) => {

  const [errorsFromBackend, setErrorsFromBackend] = errorsFromBackendState
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(false)
  }, [errorsFromBackend])


  const writtenInEachFIeld = pageType === "login"
    ? Object.values(joinedValues.current).every(val => val.length > 0)
    : true

  const LoadingSpinner = () => (
    <TailSpin
      height="30"
      width="30"
      color="#ffffff"
      ariaLabel="tail-spin-loading"
      radius="2"
      visible={true}
    />
  )
  return (
    <button
      type={(isValid && writtenInEachFIeld) ? "submit" : "button"}
      onClick={() => { setIsLoading(true) }}
      className={`${isValid && writtenInEachFIeld
        ? pageType === "login"
          ? "bg-blue-700 hover:bg-blue-600 text-white"
          : "bg-emerald-700 hover:bg-emerald-600 text-white"
        : "bg-neutral-700 text-neutral-400 pointer-events-none select-none"
        } flex items-center justify-center w-full px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md shadow focus:outline-none mt-10`}
    >
      {isLoading ? <LoadingSpinner /> : label}
    </button>
  )
}

export default SubmitButton