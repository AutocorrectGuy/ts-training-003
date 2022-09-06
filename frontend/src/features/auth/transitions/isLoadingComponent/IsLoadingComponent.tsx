import { TailSpin } from "react-loader-spinner"

const IsLoadingComponent = () => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-neutral-800">
      <TailSpin
        height="30"
        width="30"
        color="#ffffff"
        ariaLabel="tail-spin-loading"
        radius="2"
        visible={true}
      />
    </div>
  )
}

export default IsLoadingComponent