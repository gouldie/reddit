export const calculateVote = (post, type) => {
  if (post.userVote === 1 && type === 'upvote') return
  if (post.userVote === -1 && type === 'downvote') return

  let newCount = post.count

  if (type === 'upvote') {
    newCount++
  } else {
    newCount--
  }

  if (post.userVote === 1) {
    newCount -= 1
  }
  if (post.userVote === -1) {
    newCount += 1
  }

  post.count = newCount
  post.userVote = type === 'upvote' ? 1 : -1
}

export const textToClipboard = (text) => {
  const dummy = document.createElement('textarea')
  document.body.appendChild(dummy)
  dummy.value = text
  dummy.select()
  document.execCommand('copy')
  document.body.removeChild(dummy)
}
