import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import path from 'path'
import routes from './routes'

const PORT = process.env.PORT || 8080

// Use native promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to database')
}, err => {
  console.log('err', err)
})

// Set up Express
const app = express()
app.use(express.json({ limit: '3mb', type: 'application/json' }))
app.use(express.static('dist'))
app.use(express.static('public'))

// Routes
routes(app)

// Fallback
app.get('*', function (req, res) {
  console.log('server')
  res.sendFile(path.join(__dirname, '/../dist/index.html'))
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`)
})
