export default {
  Top: (a, b) => a.upvotes > b.upvotes ? 1 : -1,
  New: (a, b) => a.createdAt < b.createdAt ? 1 : -1,
  Best: (a, b) => (a.upvotes - a.downvotes) > (b.upvotes - b.downvotes) ? 1 : -1,
  Hot: (a, b) => (a.upvotes / a.downvotes) > (b.upvotes - b.downvotes) ? 1 : -1
}
