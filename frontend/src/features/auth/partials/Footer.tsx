import { IFooter } from "../auth.intefrace"

const Footer = ({
  label,
  button,
  href,
  pageType
}: IFooter) => {
  return (
    <p className="flex flex-col items-center justify-center mt-10 text-center text-white">
      <span>
        {label}
      </span>
      <a href={href} className={`${pageType === "login"
          ? "text-blue-500 hover:text-blue-400"
          : "text-emerald-500 hover:text-emerald-400"
        } underline font-semibold`}>
        {button}
      </a>
    </p>
  )
}

export default Footer