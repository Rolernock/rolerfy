export const notFound = (req, res, next) => {
  const errors = new Error(`Not Found - ${req.originalUrl}`)
  next(errors)
}

export const errorHandler = (err, req, res, next) => {
  let msg = err.message
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  if (err.kind === 'ObjectId') {
    msg = 'Resource not found'
    statusCode = 404
  }
  return res.status(statusCode).json({ errors: [{ msg }] })
}
