import Joi from '@hapi/joi'

// In a production app this would be retrieved from the database / validated at the model
const postId = Joi.string()
  .required()
  .max(300)

const text = Joi.string()
  .trim()
  .max(3000)
  .message('Text cannot be more than 3000 characters')
  .required()
  .label('Text')

export const GetComments = Joi.object().keys({
  postId
})

export const CreateComment = Joi.object().keys({
  postId,
  text
})
