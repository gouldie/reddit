// filters out documents that are not by the specified userId, or by users lorem/ipsum
const display = (document, userId) => ['lorem', 'ipsum'].includes(document.user.username) || (userId === document.user._id)

const loop = (arr, userId) => {
  return arr.reduce((acc, val) => {
    if (display(val, userId)) {
      acc.push({
        ...val,
        replies: loop(val.replies, userId)
      })
    }

    return acc
  }, [])
}

const multiple = (userId, documents) => {
  const clone = documents.map(e => e)

  return loop(clone, userId)
}

const single = (userId, document) => {
  const clone = JSON.parse(JSON.stringify(document))

  if (!display(clone, userId)) {
    return {}
  }

  if (clone.replies) {
    return {
      ...clone,
      replies: loop(clone.replies, userId)
    }
  }

  return clone
}

export default {
  multiple,
  single
}
