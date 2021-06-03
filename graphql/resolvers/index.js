const postsResolvers = require('./posts');
const userResolvers = require('./users');

//anytime a query or subs or mutation occurs the Post modifier is invoked and updated
// to update the like and comment count we are doing the modifier
// and here we make use of parent that is tghe last mutation or query that is executed
module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
  //subscribe just listens for some event and as soon as some event occurs the subcription is invoked
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
