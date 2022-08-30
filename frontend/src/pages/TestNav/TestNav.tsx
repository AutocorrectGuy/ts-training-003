type Props = {}

const TestNav = (props: Props) => {
  return (
    <ul className="flex bg-neutral-900 text-neutral-200 px-5">
      <li className="p-2"><a href="/">Placeholder</a></li>
      <li className="p-2"><a href="/login">Login</a></li>
      <li className="p-2"><a href="/register">register</a></li>
      <li className="p-2"><a href="/logout">Logout</a></li>
    </ul>
  )
}

export default TestNav