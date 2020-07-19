export default {
  Top: (a, b) => a.upvotes.length < b.upvotes.length ? 1 : -1,
  New: (a, b) => a.createdAt < b.createdAt ? 1 : -1,
  Best: (a, b) => (a.upvotes.length - a.downvotes.length) < (b.upvotes.length - b.downvotes.length) ? 1 : -1,
  Hot: (a, b) => (a.upvotes.length / a.downvotes.length) < (b.upvotes.length - b.downvotes.length) ? 1 : -1
}
