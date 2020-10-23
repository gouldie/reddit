export const findReply = (arr, id) => {
  return arr.reduce((acc, e) => {
    if (e._id === id) return e
    const result = findReply(e.replies, id)
    if (result) return result
    return acc
  }, 0)
}

export const deleteReply = (replies, commentId, userId) => {
  let unauthorized = false

  const loop = (replies) => {
    replies.forEach((r, i) => {
      if (r._id === commentId) {
        if (userId !== r.user._id) {
          unauthorized = true
        }
        replies.splice(i, 1)
      }

      loop(r.replies)
    })
  }

  loop(replies)

  return unauthorized
}

export const updateReplies = (replies, commentId, reply) => {
  return replies.map(r => {
    if (r._id === commentId) {
      r.replies.push(reply)
    }

    return {
      ...r,
      replies: updateReplies(r.replies, commentId, reply)
    }
  })
}

export const sortReplies = (replies = [], sortBy) => {
  return replies.sort(sortBy).map(e => {
    if (e.replies.length > 1) {
      e.replies = sortReplies(e.replies, sortBy)
    }

    return e
  })
}
