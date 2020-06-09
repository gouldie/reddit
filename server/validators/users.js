import Joi from '@hapi/joi'

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .trim()
  .lowercase()
  .required()
  .label('Email')

const username = Joi.string()
  .alphanum()
  .min(3)
  .max(50)
  .trim()
  .required()
  .label('Username')

const password = Joi.string()
  .min(6)
  .max(100)
  .required()
  .label('Password')

export const Register = Joi.object().keys({
  email,
  username,
  password
})

export const LogIn = Joi.object().keys({
  username,
  password
})
