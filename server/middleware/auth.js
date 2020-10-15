import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  console.log('start of verifyToken')
  var token = req.cookies.token
  console.log('1')
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' })
  console.log('2')

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    console.log('3')

    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    console.log('4')

    // if everything good, save to request for use in other routes
    req.userId = decoded.id
    console.log('5')

    next()
  })
}

export const optionalToken = (req, res, next) => {
  var token = req.cookies.token
  if (!token) return next()

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return next()

    // if everything good, save to request for use in other routes
    req.userId = decoded.id
    next()
  })
}
