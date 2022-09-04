import { useState, useRef, } from "react"
import { IAuthLayout, IInput, IAuthJson, IFooter, strObj } from "./auth.intefrace"
import Input from "./partials/form/Input"
import SubmitButton from "./partials/form/SubmitButton"
import Footer from "./partials/Footer"
import BackendErrorLabels from "./partials/backendErrorLabel/BackendErrorLabels"

// assets
import logo_x256 from "../../assets/logo/logo_x256.png"

const AuthLayout = ({
  jsonData,
  handleSubmit,
  PAGE_TYPE,
  errorsFromBackendState
}: IAuthLayout) => {
  const _: IAuthJson = jsonData
  const [areValid, setAreValid] = useState<object>(_.form.inputs.reduce((acc, curr) =>
    ({ ...acc, [curr.fieldName]: false }), {}))
  const joinedValues = useRef<strObj>(_.form.inputs.reduce((acc, curr) =>
    ({ ...acc, [curr.fieldName]: "" }), {}))

  return (
    <div className="flex items-center min-h-screen p-4 bg-neutral-900 justify-center w-full">
      <div className="flex flex-col w-full sm:w-fit sm:flex-row overflow-hidden bg-neutral-900 rounded-md shadow-lg">
        <div className={`${PAGE_TYPE === "login" 
        ? "bg-gradient-to-r from-[#2a3018] to-neutral-800" 
        : "bg-gradient-to-r from-[#2e1828] to-neutral-800"
          } flex p-4 py-6 text-white items-center justify-center md:min-w-[300px]`}>
          <div className="my-3 tracking-wider text-center">
            <img src={logo_x256}/>
            <h1 className="text-[#A9C70B] text-3xl uppercase font-extrabold mt-2">
              {_.title}
            </h1>
          </div>
        </div>
        <div className="p-5 bg-neutral-800 w-full md:min-w-[400px]">
          <h3 className="my-4 text-2xl font-semibold text-white">
            {_.form.title}
          </h3>
          <BackendErrorLabels errorsFromBackend={errorsFromBackendState[0]} />
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
            {_.form.inputs.map((inputProps, i) =>
              <Input
                key={`auth-input-${i}`}
                {...{
                  ...inputProps,
                  areValidState: [areValid, setAreValid],
                  joinedValues,
                  PAGE_TYPE,
                  errorsFromBackendState
                } as IInput}
              />
            )}
            <SubmitButton
              label={_.form.button}
              pageType={PAGE_TYPE}
              isValid={Object.values(areValid).every(valid => valid)}
              joinedValues={joinedValues}
              errorsFromBackendState={errorsFromBackendState}
            />
            <Footer {...{ ..._.footer, pageType: PAGE_TYPE } as IFooter} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout