import { Link } from "react-router-dom"

type Props = {}

const TestNav = (props: Props) => {
  return (
    <ul className="absolute flex w-full bg-neutral-900 text-neutral-200 px-5 overflow-x-hidden">
      <li className="p-2"><a href="/">Placeholder</a></li>
      <Link className="p-2" to={"/account"}>Account</Link>
      <Link className="p-2" to={"/login"}>Login</Link>
      <Link className="p-2" to={"/register"}>Register</Link>
      <Link className="p-2" to={"/logout"}>Logout</Link>
    </ul>
  )
}

export default TestNav