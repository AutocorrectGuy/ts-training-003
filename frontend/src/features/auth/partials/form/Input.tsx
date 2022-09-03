import React, { useState, useEffect, MutableRefObject, Dispatch, SetStateAction } from "react"
import { IInput, IInputFieldData, pageType, strObj, TUseState } from "../../auth.intefrace"
import { initInputFieldsState, onChange, setValidBools } from "./input.helpers"

const Input = ({
  fieldName,
  type,
  label,
  placeholder,
  validation,
  areValidState,
  joinedValues,
  PAGE_TYPE,
  errorsFromBackendState }: IInput) => {

  const [, setAreValid] = areValidState as TUseState<object>
  const [inputfields, setInputFIelds] = useState<IInputFieldData[]>(
    initInputFieldsState(validation, fieldName)
  )

  useEffect(() => {
    setValidBools({ setAreValid, fieldName, inputfields })
  }, [inputfields])

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
        name={fieldName}
        className={`mt-1 mb-4 px-4 py-2 text-white placeholder:text-neutral-300 bg-neutral-600 transition duration-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600`}
        onChange={e => onChange(joinedValues as React.MutableRefObject<strObj>,
          e,
          PAGE_TYPE as pageType,
          setInputFIelds,
          errorsFromBackendState as [strObj, Dispatch<SetStateAction<strObj>>])
        }
      />
      {inputfields.map((errLabel, i) =>
        <ErrorLabel
          key={`err-label-${errLabel.fieldName}-${i}`}
          {...errLabel}
        />
      )
      }
    </div>
  )
}

export default Input