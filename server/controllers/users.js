import jwt from 'jsonwebtoken'
import cuid from 'cuid'
import User from '../models/User'
import { Register, LogIn, ChangePassword } from '../validators/users'

export const user = async (req, res) => {
  const token = req.cookies.token

  if (!token) return res.json({ success: true, user: null })

  jwt.verify(token, process.env.SECRET, async function (err, decoded) {
    if (err) return res.json({ success: false, message: 'Failed to authenticate token' })

    const user = await User.findById(decoded.id, { password: 0 })

    if (!user) return res.json({ success: true, user: null })

    return res.json({ success: true, user })
  })
}

export const register = async (req, res) => {
  const { error } = Register.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const user = await User.create({ _id: cuid(), ...req.body })

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 })

  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' })
  return res.status(200).send({ success: true, token: token })
}

export const login = async (req, res) => {
  const { error } = LogIn.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const user = await User.findOne({ username: req.body.username.toLowerCase() })

  if (!user) return res.json({ success: false, message: 'No user found' })
  if (!user.matchesPassword(req.body.password)) return res.json({ success: false, message: 'Incorrect password' })

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 })

  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' })
  return res.status(200).json({ success: true, token: token })
}

export const logout = (req, res) => {
  res.clearCookie('token')
  return res.status(200).json({ success: true })
}

export const changePassword = async (req, res) => {
  const { error } = ChangePassword.validate(req.body, { abortEarly: true })

  if (error) {
    return res.json({ success: false, message: error.details[0].message })
  }

  const user = await User.findOne({ _id: req.userId })
  if (!user.matchesPassword(req.body.currentPassword)) return res.json({ success: false, message: 'Incorrect password' })

  user.password = req.body.newPassword
  await user.save()
  // await User.updateOne({ _id: req.userId }, { $set: { password: req.body.newPassword } })

  return res.json({
    success: true
  })
}
