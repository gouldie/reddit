import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  var token = req.cookies.token
  if (!token) { return res.status(403).send({ auth: false, message: 'No token provided.' }) }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) { return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }) }

    // if everything good, save to request for use in other routes
    req.userId = decoded.id
    next()
  })
}
