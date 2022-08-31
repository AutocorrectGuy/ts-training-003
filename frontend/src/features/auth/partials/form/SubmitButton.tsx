import { TUseState } from "../../auth.intefrace"

type Props = {
  label: string,
  pageType: string,
  isValid: boolean
}

const SubmitButton = ({ label, pageType, isValid }: Props) => {
  return (
    <button
      type="submit"
      className={`${isValid
        ? pageType === "login"
          ? "bg-blue-700 hover:bg-blue-600 text-white"
          : "bg-emerald-700 hover:bg-emerald-600 text-white"
        : "bg-neutral-700 text-neutral-400 pointer-events-none select-none"
        } w-full px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md shadow focus:outline-none`}
      // className={`${pageType === "login"
      //   ? "bg-blue-700 hover:bg-blue-600 text-white"
      //   : "bg-emerald-700 hover:bg-emerald-600 text-white"
      //   } w-full px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md shadow focus:outline-none`}
    >
      {label}
    </button>
  )
}

export default SubmitButton