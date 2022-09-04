import { Link } from "react-router-dom"

type Props = {}

const TestNav = (props: Props) => {
  return (
    <ul className="absolute flex w-screen bg-neutral-900 text-neutral-200 px-5">
      <li className="p-2"><a href="/">Placeholder</a></li>
      <Link className="p-2" to={"/login"}>Login</Link>
      <Link className="p-2" to={"/register"}>Register</Link>
      <li className="p-2"><a href="/logout">Logout</a></li>
    </ul>
  )
}

export default TestNav