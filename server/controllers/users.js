import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cuid from 'cuid'
import User from '../models/User'

const user = (req, res) => {
  var token = req.cookies.token

  if (!token) return res.json({ success: true, user: null })

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ success: false, message: 'Failed to authenticate token.' })

    User.findById(decoded.id, { password: 0 }, function (err, user) {
      if (err) return res.status(500).json({ success: false, message: 'There was a problem finding the user.' })
      if (!user) return res.json({ success: true, user: null })

      return res.json({ success: true, user })
    })
  })
}

const register = (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8)

  User.create({
    _id: cuid(),
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).json({ success: false, message: 'There was a problem registering the user.' })
    // create a token
    var token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 })

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' })
    return res.status(200).send({ success: true, token: token })
  })
}

const login = (req, res) => {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return res.status(500).json({ success: false, message: 'Error on the server.' })
    if (!user) return res.status(404).send({ success: false, message: 'No user found.' })

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(401).json({ success: false, token: null })

    var token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 })

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' })
    return res.status(200).json({ success: true, token: token })
  })
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
