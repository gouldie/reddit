const calculateVotes = (userId, document) => {
  const clone = Object.assign({}, document)

  const upvotes = clone.upvotes ? clone.upvotes.length : 0
  const downvotes = clone.downvotes ? clone.downvotes.length : 0
  const count = upvotes - downvotes
  const userVote = clone.upvotes && clone.upvotes.includes(userId) ? 1 : clone.downvotes && clone.downvotes.includes(userId) ? -1 : 0

  delete clone.upvotes
  delete clone.downvotes

  clone.count = count
  clone.userVote = userVote

  if (clone.replies) {
    clone.replies = clone.replies.map(e => calculateVotes(userId, e))
  }

  return clone
}

export default calculateVotes
