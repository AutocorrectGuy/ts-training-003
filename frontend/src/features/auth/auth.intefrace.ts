export type pageType = "register" | "login"

/**
 *  Custom inputfield props: contains mostly json data, except for useState hook
 */
export interface IInput {
  // json input 
  fieldName: string,
  type: string,
  label: string,
  placeholder: string,
  validation: {
    regPattern: string,
    errorValue: string
  }[],
  // dynamic input
  areValidState?: TUseState<object>,
  joinedValues?: React.MutableRefObject<strObj>,
  PAGE_TYPE?: pageType,
  errorsFromBackendState?: [strObj, React.Dispatch<React.SetStateAction<strObj>>]
}

/**
 * Content below form. Imported as json
 */
export interface IFooter {
  label: string,
  button: string,
  href: string,
  pageType?: string
}

/**
 * Interface shape is based on *.data.json shape
 */
export interface IAuthJson {
  title: string,
  form: {
    title: string,
    inputs: IInput[]
    button: string
  },
  footer: IFooter
}

/**
 * "regPattern", "errorValue" and "name" imported form json.
 * "index", "isValid", "value" used in states
 * "value" used in useRef hook (both in states and useRef)
 */
export interface IInputFieldData {
  regPattern: string,
  errorValue: string,
  fieldName: string,
  index: number,
  isValid: boolean,
  value: string
}

/**
 * Layout page interface
 */
export interface IAuthLayout {
  jsonData: IAuthJson,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  PAGE_TYPE: pageType,
  errorsFromBackendState: [strObj, React.Dispatch<React.SetStateAction<strObj>>]
}

/**
 * Form values useState hook
 */
export type TUseState<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>
]
export type strObj = { [key: string]: string }