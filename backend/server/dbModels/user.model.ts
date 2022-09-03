import { model, Schema } from "mongoose"
import bcrypt from "bcrypt"

const requiredString = {
  required: true,
  type: String
}
const userSchema = new Schema({
  username: {
    ...requiredString,
    unique: true
  },
  password: requiredString,
  status: requiredString
})

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(<string>this.password, salt)
  next()
})

const userModel = model("user", userSchema)

export default userModel