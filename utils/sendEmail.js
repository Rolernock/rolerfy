import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const host = 'das102.truehost.cloud'
const port = 587
const user = 'rolernock@rolerfy.xyz'
const pass = process.env.SMTP_PASS

const sendEmail = async options => {
  const transporter = await nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  })
  const message = {
    from: `Rolerfy <rolernock@rolerfy.xyz>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  }
  await transporter.sendMail(message)
}

export default sendEmail
