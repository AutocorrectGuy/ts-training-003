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
          ? "text-[#be3399]"
          : "text-[#A9C70B]"
        } hover:brightness-150 underline font-semibold`}>
        {button}
      </a>
    </p>
  )
}

export default Footer