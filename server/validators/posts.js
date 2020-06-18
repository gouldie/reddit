import Joi from '@hapi/joi'

// In a production app this would be retrieved from the database / validated at the model
const validCommunityIds = ['1', '2', '3']

const communityId = Joi.string()
  .allow(...validCommunityIds)
  .only()
  .required()
  .label('Community')

const title = Joi.string()
  .alphanum()
  .min(1)
  .max(300)
  .trim()
  .required()
  .label('Title')

const text = Joi.string()
  .alphanum()
  .max(3000)
  .trim()
  .optional()
  .label('Text')

export const CreateTextPost = Joi.object().keys({
  communityId,
  title,
  text
})
