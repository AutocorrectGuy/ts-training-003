import { useState, useEffect } from "react"
import { IErrorLabel, IInput, TUseState } from "../../auth.intefrace"

const Input = ({
  name,
  type,
  label,
  placeholder,
  validation,
  valuesState,
  areValidState }: IInput) => {

  type obj = { [key: string]: string }

  const [values, setValues] = valuesState as TUseState<obj>
  const [, setAreValid] = areValidState as TUseState<object>
  const [errLabels, setErrLabels] = useState<IErrorLabel[]>(validation.map(
    (entry, index) => ({ ...entry, name, index, isValid: false })
  ))

  useEffect(() => {
    setAreValid((prev) => ({
      ...prev,
      [name]: errLabels.every(({ isValid }) => isValid)
    }))
  }, [errLabels])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrLabels(errLabels.map((entry, i) => ({
      ...entry,
      isValid: new RegExp(entry.regPattern !== "prev"
        ? entry.regPattern
        : values.password
      ).test(e.target.value)
    })
    ))
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const ErrorLabel = ({ errorValue, isValid }: IErrorLabel) => {
    return (
      <>{!isValid && Object.hasOwn(values, name) &&
        <div className="max-w-fit text-red-400 font-semibold rounded-md px-2 py-1 whitespace-pre-wrap">
          {`* ${errorValue}`}
        </div>
      }</>

    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-neutral-100">
          {label}
        </label>
      </div>
      <input
        autoComplete="off"
        placeholder={placeholder}
        type={type}
        name={name}
        className={`my-2 px-4 py-2 text-white placeholder:text-neutral-300 bg-neutral-600 transition duration-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600`}
        onChange={onChange}
      />
      {errLabels.map((errLabel, i) =>
        <ErrorLabel
          key={`err-label-${errLabel.name}-${i}`}
          {...errLabel}
        />
      )
      }
    </div>
  )
}

export default Input