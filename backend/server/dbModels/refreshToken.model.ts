import {Schema, model} from "mongoose"

const requiredUniqueString = {
  required: true,
  type: String,
  unique: true
}
const refreshTokenSchema = new Schema({
  _userId: requiredUniqueString,
  tokenId: requiredUniqueString
})

const refTokenModel = model("refresh_token", refreshTokenSchema)

export default refTokenModel