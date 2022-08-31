import { useState, useEffect } from "react"
import { IInput, IInputFieldData, strObj, TUseState } from "../../auth.intefrace"

const Input = ({
  name,
  type,
  label,
  placeholder,
  validation,
  areValidState,
  joinedValues }: IInput) => {

  const [areValid, setAreValid] = areValidState as TUseState<object>
  const [inputfields, setInputFIelds] = useState<IInputFieldData[]>(
    validation.map(
      (entry, index) => ({
        ...entry,
        name,
        index,
        isValid: false,
        value: ""
      }) as IInputFieldData
    )
  )

  /**
   * Returns data outside this component
   */
  useEffect(() => {
    setAreValid((prev) => ({
      ...prev,
      [name]: inputfields.every(({ isValid }) => isValid)
    }))
  }, [inputfields])

  // only for comparing passwords field:
  const comparePasswords = () => {
    if (joinedValues === undefined) return
    const { confirmPassword, password } = joinedValues.current
    return confirmPassword === password
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (joinedValues)
      joinedValues.current = ({
        ...joinedValues.current, [e.target.name]: e.target.value
      })
    setInputFIelds((prev) => prev.map(entry => {
      return ({
        ...entry,
        value: e.target.name === entry.name
          ? e.target.value
          : entry.value,
        isValid: entry.regPattern !== "prev"
          ? new RegExp(entry.regPattern).test(e.target.value)
          : comparePasswords()
      }) as IInputFieldData
    }))
  }

  const ErrorLabel = ({ errorValue, isValid, value }: IInputFieldData) => (
    <>{!isValid && value.length > 0 &&
      <div className="max-w-fit text-red-400 font-semibold rounded-md px-2 py-1 whitespace-pre-wrap last-of-type:mb-4">
        {`* ${errorValue}`}
      </div>
    }</>
  )

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
        className={`my-4 px-4 py-2 text-white placeholder:text-neutral-300 bg-neutral-600 transition duration-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600`}
        onChange={onChange}
      />
      {inputfields.map((errLabel, i) =>
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