import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: String
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } else {
    next()
  }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetPasswordToken = async function () {
  const token = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return token
}

const UserModel = mongoose.model('User', userSchema)

export default UserModel
