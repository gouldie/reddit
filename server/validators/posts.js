import Joi from '@hapi/joi'

// In a production app this would be retrieved from the database / validated at the model
const validCommunityIds = ['1', '2', '3']
const validSorts = ['Best', 'Hot', 'Top', 'New']

const postId = Joi.string()
  .required()
  .max(300)

const communityId = Joi.string()
  .allow(...validCommunityIds)
  .only()
  .label('Community')

const title = Joi.string()
  .min(1)
  .max(300)
  .message('Title must be between 1 and 300 characters')
  .trim()
  .required()
  .label('Title')

const text = Joi.string()
  .allow('')
  .optional()
  .trim()
  .max(3000)
  .message('Text cannot be more than 3000 characters')
  .label('Text')

const sort = Joi.string()
  .allow(...validSorts)
  .only()

const image = Joi.string()
  .dataUri()
  .optional()
  .trim()
  .label('Image')

const link = Joi.string()
  .max(3000)
  .trim()
  .label('Link')

export const CreateTextPost = Joi.object().keys({
  communityId: communityId.required(),
  title,
  text
})

export const CreateImagePost = Joi.object().keys({
  communityId: communityId.required(),
  title,
  image: image.required()
})

export const CreateLinkPost = Joi.object().keys({
  communityId: communityId.required(),
  title,
  link: link.required()
})

export const GetPost = Joi.object().keys({
  postId
})

export const GetPosts = Joi.object().keys({
  communityId: communityId.optional(),
  sort
})

export const Vote = Joi.object().keys({
  postId
})

export const EditPost = Joi.object().keys({
  postId,
  text,
  image,
  link
}).oxor('text', 'image', 'link')

export const DeletePost = Joi.object().keys({
  postId
})
