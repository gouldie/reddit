import jwt from 'jsonwebtoken'
import cuid from 'cuid'
import User from '../models/User'

const user = async (req, res) => {
  // TODO: validation

  const token = req.cookies.token

  if (!token) return res.json({ success: true, user: null })

  jwt.verify(token, process.env.SECRET, async function (err, decoded) {
    if (err) return res.status(500).json({ success: false, message: 'Failed to authenticate token.' })

    const user = await User.findById(decoded.id, { password: 0 })

    if (!user) return res.json({ success: true, user: null })

    return res.json({ success: true, user })
  })
}

const register = async (req, res) => {
  // TODO: validation

  const user = await User.create({ _id: cuid(), ...req.body })

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 })

  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' })
  return res.status(200).send({ success: true, token: token })
}

const login = async (req, res) => {
  // TODO: validation

  const user = await User.findOne({ username: req.body.username })

  if (!user) return res.status(404).send({ success: false, message: 'No user found.' })
  if (!user.matchesPassword(req.body.password)) return res.status(401).json({ success: false, message: 'Incorrect password' })

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 })

  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' })
  return res.status(200).json({ success: true, token: token })
}

const logout = (req, res) => {
  res.clearCookie('token')
  return res.status(200).json({ success: true })
}

export default {
  user,
  register,
  login,
  logout
}
