const commentCount = (doc) => {
  return doc.reduce((acc, val) => {
    return acc + 1 + (val.replies ? commentCount(val.replies) : 0)
  }, 0)
}

export default commentCount
