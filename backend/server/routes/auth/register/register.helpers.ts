import rtModel from "../../../dbModels/refreshToken.model"
import { REGISTER_USER_SECRET, USER_TYPE } from "../../routes.helpers"

export const validateUser = (userData: any) => {
  const { employeeRegistration, ...rest } = userData
  return ({
    ...rest,
    status: `${employeeRegistration}` === REGISTER_USER_SECRET
      ? USER_TYPE.MATCHED
      : USER_TYPE.NOT_MATCHED
  })
}