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
},
  {
    statics: {
      async login(username: string, password: string) {
        const user = await this.findOne({ username })
        if (!user) throw Error("Šāds lietotājvārds datubāzē neeksistē")
        const auth = await bcrypt.compare(password, user.password as string)
        if (!auth) throw Error("Nepareiza parole")
        return user
      }
    }
  })

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(<string>this.password, salt)
  next()
})

const userModel = model("user", userSchema)

export default userModel