import IsLoadingComponent from "../../features/auth/transitions/isLoadingComponent/IsLoadingComponent"

interface IRenderLoginStatus {
  loggedIn: boolean | undefined,
  children: any
}

export const RenderWithLoginStatus = ({ loggedIn, children }: IRenderLoginStatus): JSX.Element => (
  <>
    {loggedIn === undefined
      ? <IsLoadingComponent />
      : children
    }
  </>
)