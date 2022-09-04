import { Link } from "react-router-dom"
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
      <Link to={href}
        className={`${pageType === "login"
          ? "text-[#be3399]"
          : "text-[#A9C70B]"
          } hover:brightness-150 underline font-semibold`}>
        {button}
      </Link>
    </p>
  )
}

export default Footer