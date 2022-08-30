/**
 *  Custom inputfield props: contains mostly json data, except for useState hook
 */
export interface IInput {
  name: string,
  type: string,
  label: string,
  placeholder: string,
  validation: {
    regPattern: string,
    errorValue: string
  }[]
  valuesState?: TUseState<object>,
  areValidState?: TUseState<object>
}

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
  pageType: string,
  title: string,
  form: {
    title: string,
    inputs: IInput[]
    button: string
  },
  footer: IFooter
}

/**
 * Layout page interface
 */
export interface IAuthLayout {
  jsonData: IAuthJson,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  valuesState: TUseState<object>
}
/**
 * Form values useState hook
 */
export type TUseState<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>
]

export interface IErrorLabel {
  regPattern: string,
  errorValue: string,
  name: string,
  index: number,
  isValid: boolean
}