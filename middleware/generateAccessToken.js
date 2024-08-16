import axios from 'axios'

export const generateAccessToken = async (req, res, next) => {
  const consumer_key = 'g8GXF0kOiMo9dAxxX7at8MW84KVonbkEpNczEI7kICEjShPI'
  const consumer_secret =
    'MpFjSamwzCjCynZlqFR1F9L2Z2qxpr3pq1sqQFCAXpv7pGIQJgBw5x2cLVmuKAZj'
  const url =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
  const auth =
    'Basic ' +
    Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64')
  try {
    const config = {
      headers: {
        Authorization: auth
      }
    }
    const { data } = await axios.get(url, config)
    req.access_token = data.access_token
    next()
  } catch (err) {
    res.status(500).json({ msg: 'Failed to generate access_token' })
  }
}
