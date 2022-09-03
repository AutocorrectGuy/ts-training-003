import { IInputFieldData, strObj } from "../../auth.intefrace"

const comparePasswords = (valuesRef: React.MutableRefObject<strObj>) => {
  if (valuesRef === undefined) return
  const { confirmPassword, password } = valuesRef.current
  return confirmPassword === password
}

interface IsetValidBools {
  setAreValid: React.Dispatch<React.SetStateAction<object>>,
  fieldName: string,
  inputfields: IInputFieldData[],
}
export const setValidBools = ({
  setAreValid,
  fieldName,
  inputfields
}: IsetValidBools) => {
  setAreValid((prev) => ({
    ...prev,
    [fieldName]: inputfields.every(({ isValid }) => isValid)
  }))
}

const registerJoinedValues = (
  joinedValues: React.MutableRefObject<strObj>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (joinedValues)
    joinedValues.current = ({
      ...joinedValues.current, [e.target.name]: e.target.value
    })
}


const setInputs = (
  PAGE_TYPE: string,
  setFields: React.Dispatch<React.SetStateAction<IInputFieldData[]>>,
  joinedValues: React.MutableRefObject<strObj>,
  e: React.ChangeEvent<HTMLInputElement>) => {

  setFields((prev) => prev.map(entry => ({
    ...entry,
    value: e.target.name === entry.fieldName
      ? e.target.value
      : entry.value,
    isValid: PAGE_TYPE === "register"
      ? entry.fieldName === "confirmPassword"
        ? comparePasswords(joinedValues as React.MutableRefObject<strObj>)
        : new RegExp(entry.regPattern).test(e.target.value)
      : new RegExp(entry.regPattern).test(e.target.value)
  }) as IInputFieldData
  ))
}

/**
 * 
 * @param joinedValues useRef [{name: value}, ...]
 * @param e onChange event
 * @param PAGE_TYPE user defined page type: "register" | "login"
 * @param setInputFIelds main inputField setter fn
 */
export const onChange = (
  joinedValues: React.MutableRefObject<strObj>,
  e: React.ChangeEvent<HTMLInputElement>,
  PAGE_TYPE: string,
  setInputFIelds: React.Dispatch<React.SetStateAction<IInputFieldData[]>>,
  errorsFromBackendState: [strObj, React.Dispatch<React.SetStateAction<strObj>>]
) => {
  // updates useref of field names and values
  const [errors, setErrors] = errorsFromBackendState
  if (typeof(errors) !== "string") {
    setErrors({})
  }
  registerJoinedValues(joinedValues as React.MutableRefObject<strObj>, e)
  setInputs(PAGE_TYPE, setInputFIelds, joinedValues as React.MutableRefObject<strObj>, e)
}

export const initInputFieldsState = (validation: any, fieldName: string) => {
  return (validation.map((entry: IInputFieldData, index: number) => ({
    ...entry,
    fieldName,
    index,
    isValid: false,
    value: ""
  })
  ))
}