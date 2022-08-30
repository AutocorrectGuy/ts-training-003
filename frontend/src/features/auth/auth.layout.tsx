import { useState, useEffect } from "react"
import { IAuthLayout, IInput, IAuthJson, IFooter, TUseState } from "./auth.intefrace"
import Input from "./partials/form/Input"
import SubmitButton from "./partials/form/SubmitButton"
import Footer from "./partials/Footer"

const AuthLayout = ({ jsonData, handleSubmit, valuesState }: IAuthLayout) => {
  const _: IAuthJson = jsonData

  const [areValid, setAreValid] = useState<object>(_.form.inputs.reduce((acc, curr) =>
    ({ ...acc, [curr.name]: false }), {}))

  return (
    <div className="flex items-center min-h-screen p-4 bg-neutral-900 justify-center w-full">
      <div className="flex flex-col w-full sm:w-fit sm:flex-row overflow-hidden bg-neutral-900 rounded-md shadow-lg">
        <div className={`${_.pageType === "login" ? "bg-blue-700" : "bg-emerald-700"
          } flex p-4 py-6 text-white items-center justify-center md:min-w-[300px]`}>
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <h1>
              {_.title}
            </h1>
          </div>
        </div>
        <div className="p-5 bg-neutral-800 w-full md:min-w-[400px]">
          <h3 className="my-4 text-2xl font-semibold text-white">
            {_.form.title}
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {_.form.inputs.map((inputProps, i) =>
              <Input {...{
                ...inputProps,
                valuesState,
                areValidState: [areValid, setAreValid] as TUseState<object>
              } as IInput}
                key={`auth-input-${i}`} />
            )}
            <SubmitButton
              label={_.form.button}
              pageType={_.pageType}
              isValid={Object.values(areValid).every(valid => valid)}
            />
            <Footer {...{ ..._.footer, pageType: _.pageType } as IFooter} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout