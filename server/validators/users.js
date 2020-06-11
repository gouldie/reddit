import Joi from '@hapi/joi'

const email = Joi.string()
  .email()
  .max(254)
  .trim()
  .lowercase()
  .required()
  .label('Email')

const username = Joi.string()
  .alphanum()
  .min(3)
  .max(15)
  .trim()
  .required()
  .label('Username')

const password = Joi.string()
  .min(6)
  .max(30)
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
