import mongoose from 'mongoose'

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CLOUD)
    console.log(`DB Connected on: ${conn.connection.host}`)
  } catch (err) {
    console.error('err.message')
    process.exit(1)
  }
}

export default ConnectDB
