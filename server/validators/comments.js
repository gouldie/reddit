import Joi from '@hapi/joi'

const validSorts = ['Best', 'Hot', 'Top', 'New']

const postId = Joi.string()
  .required()
  .max(300)

const commentId = Joi.string()
  .required()
  .max(300)

const text = Joi.string()
  .trim()
  .max(3000)
  .message('Text cannot be more than 3000 characters')
  .required()
  .label('Text')

const sort = Joi.string()
  .allow(...validSorts)
  .only()

export const GetComments = Joi.object().keys({
  postId,
  sort
})

export const CreateComment = Joi.object().keys({
  postId,
  text
})

export const Vote = Joi.object().keys({
  commentId
})

export const EditComment = Joi.object().keys({
  commentId,
  text
})

export const DeleteComment = Joi.object().keys({
  commentId
})

export const Reply = Joi.object().keys({
  commentId,
  rootId: commentId,
  text
})

export const ReplyVote = Joi.object().keys({
  commentId,
  rootId: commentId
})

export const ReplyEdit = Joi.object().keys({
  commentId,
  rootId: commentId,
  text
})

export const ReplyDelete = Joi.object().keys({
  commentId,
  rootId: commentId
})
