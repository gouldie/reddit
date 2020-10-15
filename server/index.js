import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import routes from './routes'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

if (!process.env.SECRET) {
  console.log('SECRET is required')
  process.exit()
}

const PORT = process.env.PORT || 8080
const IN_PROD = process.env.NODE_ENV === 'production'
console.log('Running in', IN_PROD ? 'production' : 'development')

// Use native promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to database')
}, err => {
  console.log('err', err)
})

// Set up Express
const app = express()

if (IN_PROD) {
  app.use(helmet())
  // app.use(rateLimit({
  //   windowMs: 1 * 60 * 1000, // 1 minute
  //   max: 100 // limit each IP to 100 requests per windowMs
  // }))
}

app.use(express.json({ limit: '3mb', type: 'application/json' }))
app.use(express.static('dist'))
app.use(express.static('public'))
app.use(cookieParser())

// Routes
routes(app)

// Error handler
app.use(function (err, req, res, next) {
  // Mongoose validator error
  if (err.name === 'ValidationError') {
    const field = Object.keys(err.errors)[0]

    return res.json({
      success: false,
      message: err.errors[field].message
    })
  }

  console.log('err', err)

  res.json({
    success: false,
    message: typeof err === 'string' ? err : 'An internal error occurred.'
  })
})

// Fallback
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../dist/index.html'))
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`)
})
