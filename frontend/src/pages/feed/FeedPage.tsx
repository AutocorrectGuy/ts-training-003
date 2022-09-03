import TestNav from "../_partials/TestNav/TestNav"

type Props = {
  hasNavBar?: boolean
}
const FeedPage = ({ hasNavBar }: Props) => {
  return (
    <>
      {hasNavBar && <TestNav />}
      <div className="flex items-center justify-center w-full h-screen bg-slate-800">
        <h1 className="text-neutral-200">
          FeedPage
        </h1>
      </div>
    </>
  )
}

export default FeedPage