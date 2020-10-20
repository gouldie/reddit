// loop through post/comment and all nested replies
// sets userVote, count and canEdit
export const addFields = (userId, document, recursive = true) => {
  const clone = Object.assign({}, document)

  const upvotes = clone.upvotes ? clone.upvotes.length : 0
  const downvotes = clone.downvotes ? clone.downvotes.length : 0
  const count = upvotes - downvotes
  const userVote = clone.upvotes && clone.upvotes.includes(userId) ? 1 : clone.downvotes && clone.downvotes.includes(userId) ? -1 : 0

  delete clone.upvotes
  delete clone.downvotes

  clone.count = count
  clone.userVote = userVote

  if (clone.user && (clone.user._id === userId)) {
    clone.canEdit = true
  }

  if (recursive && clone.replies) {
    clone.replies = clone.replies.map(e => addFields(userId, e))
  }

  return clone
}

// returns the number of comments and replies for a post
export const commentCount = (doc) => {
  return doc.reduce((acc, val) => {
    return acc + 1 + (val.replies ? commentCount(val.replies) : 0)
  }, 0)
}
