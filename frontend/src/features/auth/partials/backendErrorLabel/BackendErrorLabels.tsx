import { Fragment } from "react"
import { strObj } from "../../auth.intefrace"

type Props = {
  errorsFromBackend: strObj
}
const BackendErrorLabels = ({ errorsFromBackend }: Props) => {
  interface IlabelValue { labelValue: string }
  const SingleErrorLabel = ({ labelValue }: IlabelValue) => (
    <div className="max-w-fit text-red-400 font-semibold rounded-md px-2 py-1 whitespace-pre-wrap last-of-type:mb-4">
      {`* ${labelValue}`}
    </div>
  )

  const ErrorLabels = () => (
    <div className="flex flex-col">
      {Object.keys(errorsFromBackend).map((err, i) => (
        <Fragment key={`auth-backend-err-${i}`}>{
          errorsFromBackend[err].length > 0 &&
          <SingleErrorLabel labelValue={errorsFromBackend[err]} />
        }
        </Fragment>
      ))}
    </div>
  )

  return (
    <>{
      Object.keys(errorsFromBackend).length > 0
        ? <ErrorLabels />
        : <></>
    }
    </>)
}

export default BackendErrorLabels